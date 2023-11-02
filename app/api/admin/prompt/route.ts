import Prompts from "@/models/Prompt";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";

/**
 * @method POST
 * @body Prompt
 * @returns NextResponse
 * @description Create new Prompt and return
 */
export const POST = async (
	request: NextRequest
): Promise<NextResponse | void> => {
	await connectDb();
	const body = await request.json();
	const { name, prompt, negativePrompt } = body;

	try {
		const newPrompt = new Prompts({
			name,
			prompt,
			negativePrompt
		});

		const result = await newPrompt.save();
		return NextResponse.json(result, {
			status: 200
		});
	} catch (err) {
		return NextResponse.json("Failed to save Prompt Template.", {
			status: 500
		});
	}
};
