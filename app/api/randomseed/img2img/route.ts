import { rsApiConfig, rsImage2ImageApi } from "@/configs/rsapi.config";
import { s3Delete } from "@/utils/s3-client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * @param request
 * @desc Do text to image in randomseed api and return the generated image url
 */
export async function POST(request: NextRequest) {
	const requestBody = await request.json();

	if (!requestBody) {
		return new Response("Data is undefined", { status: 400 });
	}

	try {
		const res = await axios.post(rsImage2ImageApi, requestBody, rsApiConfig);

		await s3Delete(requestBody.img2img.image_url, "img2img");

		return NextResponse.json(res.data);
	} catch (err: unknown) {
		return NextResponse.json(err, { status: 500 });
	}
}
