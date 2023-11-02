import Models from "@/models/Model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;
	const modelName = searchParams.get("modelName");
	// const body = await request.json();
	// const { message } = body;
	console.log(
		`======================== ${modelName} Trained ========================`
	);

	try {
		await Models.findOneAndUpdate(
			{ modelName: modelName },
			{ isTrained: true }
		);

		return NextResponse.json({ success: true }, { status: 400 });
	} catch (err: unknown) {
		return NextResponse.json(err, { status: 500 });
	}
};
