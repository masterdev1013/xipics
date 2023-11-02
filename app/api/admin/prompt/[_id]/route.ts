import Prompts from "@/models/Prompt";
import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";
import Templates, { Template } from "@/models/Template";

/**
 * @POST
 * @body Prompt
 * @param _id
 * @returns NextResponse
 * @description Find prompt by _id and update name, prompt, negativePrompt
 */
export const POST = async (
	request: NextRequest,
	{ params }: { params: { _id: string } }
): Promise<NextResponse | void> => {
	await connectDb();
	const body = await request.json();
	const { name, prompt, negativePrompt } = body;

	try {
		const result = await Prompts.findByIdAndUpdate(
			params._id,
			{ name: name, prompt: prompt, negativePrompt: negativePrompt },
			{ new: true }
		);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		return NextResponse.json("Failed to update prompt Template.", {
			status: 500
		});
	}
};

/**
 * @method DELETE
 * @param _id
 * @returns NextResponse
 * @description Delete Prompt by prompt _id
 */
export const DELETE = async (
	request: NextRequest,
	{ params }: { params: { _id: string } }
): Promise<NextResponse | void> => {
	await connectDb();

	try {
		const promptId = params._id as string;

		// Find Templates that contains deleting prompt id and remove from the prompt id array
		const templates = await Templates.find({
			prompts: { $in: [promptId] }
		});
		const updatePromises = templates.map(async (template: Template) => {
			template.prompts = template.prompts.filter(
				prompt => prompt.toString() !== promptId
			);
			await template.save();
		});

		await Promise.all(updatePromises);

		// Delete Prompt by promptId
		const result = await Prompts.findByIdAndDelete(promptId);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{
				exception: true,
				message: "Failed to delete Prompt Template."
			},
			{ status: 500 }
		);
	}
};
