import Templates from "@/models/Template";
import { connectDb } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @method GET
 * @desc Finds the Templates
 */
export const GET = async (): Promise<NextResponse | void> => {
	await connectDb();

	try {
		const result = await Templates.find().populate("prompts");
		return NextResponse.json(result.reverse(), { status: 200 });
	} catch (err) {
		return NextResponse.json("Failed to get Templates.", {
			status: 500
		});
	}
};
