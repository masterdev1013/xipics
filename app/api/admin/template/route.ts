/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";
import Templates from "@/models/Template";

/**
 * @method POST
 * @param request
 * @desc Add new template
 */
export const POST = async (
	request: NextRequest
): Promise<NextResponse | void> => {
	await connectDb();
	const body = await request.json();

	// Destructure properties directly from body.
	const {
		name,
		model,
		prompts,
		thumbnail,
		imageNumber,
		stepNumber,
		guidanceScale,
		sampler,
		width,
		height,
		loras,
		loraScale
	} = body;

	try {
		const newTemplate = new Templates({
			name,
			model,
			prompts: prompts.map((prompt: Prompt) => prompt._id),
			thumbnail: thumbnail,
			imageNumber,
			stepNumber,
			guidanceScale,
			sampler,
			width,
			height,
			loras,
			loraScale
		});

		// Save updated document
		const result = await newTemplate.save();

		return NextResponse.json(
			{ ...result._doc, prompts: prompts },
			{ status: 200 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json("Failed to Add Model Template.", {
			status: 500
		});
	}
};
