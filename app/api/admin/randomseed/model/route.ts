import { WEBHOOK_URL } from "@/configs/env.config";
import {
	rsApiConfig,
	rsModelGetApi,
	rsModelTrainingApi
} from "@/configs/rsapi.config";
import Models from "@/models/Model";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * @method POST
 * @param request
 * @desc Train the model and save to database
 */
export const POST = async (request: NextRequest) => {
	const body = await request.json();
	const { url, modelName, modelType, supportInpainting, thumbnail } = body;
	const data = {
		url,
		modelName,
		modelType,
		supportInpainting,
		webhook_url: `${WEBHOOK_URL}?modelName=${modelName}`
	};

	if (data.url.indexOf("?type=") === -1) {
		data.url += "?type=Model&format=SafeTensor&size=full&fp=fp16";
	}

	if (data.modelType !== "Checkpoint" && data.modelType !== "Lora") {
		return NextResponse.json("The Model Type is invalid.", { status: 400 });
	}
	try {
		// Check if the model name is duplicated
		const models = (await axios.get(rsModelGetApi, rsApiConfig)).data as {
			public_models: RSModel[];
			private_models: RSModel[];
		};

		if (
			models.public_models.filter(item => item.model_name === data.modelName)
				.length !== 0 ||
			models.private_models.filter(item => item.model_name === data.modelName)
				.length !== 0
		) {
			return NextResponse.json(
				{
					success: false,
					message: "Model name is duplicated. Please try with another name"
				},
				{
					status: 400
				}
			);
		}

		// Send Model URL to train in randomseed and get the progress in receive
		const result = (
			await axios.post(
				rsModelTrainingApi,
				{
					load_model: {
						url: data.url,
						model_name: data.modelName,
						model_type: data.modelType === "Checkpoint" ? "checkpoint" : "lora",
						webhook_url: data.webhook_url,
						support_inpainting: data.supportInpainting
					}
				},
				rsApiConfig
			)
		).data;
		console.log(result);

		// Check if the model is training now.
		await new Models({
			modelName: data.modelName,
			modelType: data.modelType,
			url: data.url,
			thumbnail: {
				name: thumbnail.name,
				link: thumbnail.link
			},
			supportInpainting: data.supportInpainting
		}).save();
		return NextResponse.json(
			"Successfully submitted to train new model on randomseed. Please wait for a few seconds.",
			{ status: 200 }
		);
	} catch (err: unknown) {
		return NextResponse.json(
			{
				success: false,
				message: err
			},
			{ status: 500 }
		);
	}
};
