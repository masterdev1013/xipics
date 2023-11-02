import { rsApiConfig, rsModelGetApi } from "@/configs/rsapi.config";
import Models from "@/models/Model";
import { connectDb } from "@/utils/mongodb";
import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @desc Return the stored randomseed models
 */
export async function GET() {
	await connectDb();
	try {
		const response = await axios.get(rsModelGetApi, rsApiConfig);

		// Separate public model and private model
		const models = [
			...response.data.public_models.map((item: object) => ({
				...item,
				isActive: true,
				isPrivate: false
			})),
			...response.data.private_models.map((item: object) => ({
				...item,
				isActive: true,
				isPrivate: true
			}))
		].reverse();

		const dbResult = await Models.find();

		const result = models.map(item => {
			const matched = dbResult.filter(v => v.modelName === item.model_name)[0];
			if (!matched) {
				return {
					modelName: item.model_name,
					modelType: item.model_type,
					thumbnail: {
						name: "Default Model",
						link: "/default_model.png"
					},
					supportInpainting: item.support_inpainting,
					isPrivate: item.isPrivate,
					isActive: true,
					isTrained: true
				};
			}

			return {
				modelName: item.model_name,
				modelType: item.model_type,
				thumbnail: matched.thumbnail,
				supportInpainting: item.support_inpainting,
				isActive: matched.isActive,
				isPrivate: matched.isPrivate,
				isTrained: matched.isTrained
			};
		});

		return NextResponse.json(result.filter(item => item.isTrained));
	} catch (err) {
		return NextResponse.json("The server has the problem now. Please retry", {
			status: 500
		});
	}
}
