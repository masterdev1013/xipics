import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";
import Models from "@/models/Model";
import { s3Delete } from "@/utils/s3-client";

/**
 * @method POST
 * @param request
 * @param param1
 * @desc update model thumbnail
 */
export const POST = async (
	request: NextRequest,
	{ params }: { params: { model_name: string } }
): Promise<NextResponse | void> => {
	await connectDb();
	const body = await request.json();
	const { updated, image } = body;
	if (!updated) {
		return NextResponse.json(
			{
				success: false,
				message: "parameter is invalid!"
			},
			{
				status: 400
			}
		);
	}
	let result;
	try {
		const oldModel = await Models.findOne({ modelName: params.model_name });
		if (oldModel) {
			if (image) {
				s3Delete(oldModel.thumbnail.name, "models");
			}

			result = await Models.findOneAndUpdate(
				{ modelName: params.model_name },
				{
					$set: updated
				},
				{
					new: true
				}
			);
		} else {
			updated.thumbnail = {
				name: "Default Model Thumbnail",
				link: "/default_model.png"
			};
			result = await new Models({ ...updated }).save();
		}

		return NextResponse.json(
			{
				success: true,
				result: result
			},
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json(
			{ success: false },
			{
				status: 500
			}
		);
	}
};
