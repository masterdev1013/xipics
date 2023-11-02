import Prompts from "@/models/Prompt";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @returns NextResponse
 * @description Find All Prompts and return
 */
export const GET = async () => {
	await connectDb();

	try {
		const result = await Prompts.find();
		return NextResponse.json(result.reverse(), { status: 200 });
	} catch (err) {
		return NextResponse.json("Failed to get Prompt Template.", {
			status: 500
		});
	}
};
