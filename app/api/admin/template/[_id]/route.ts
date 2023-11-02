import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";
// import { s3Delete } from "@/utils/s3-client";
import Templates from "@/models/Template";
// import fs from "fs";
import { s3Delete } from "@/utils/s3-client";

/**
 * @POST
 * @body Template
 * @param _id
 * @returns NextResponse
 * @description Find Template by _id and update the Template $set
 */
export const POST = async (
	request: NextRequest,
	{ params }: { params: { _id: string } }
): Promise<NextResponse | void> => {
	await connectDb();
	const body = await request.json();
	const { updated } = body;
	if (!updated) {
		return NextResponse.json(
			{ success: false, msg: "updated variable is requied" },
			{ status: 400 }
		);
	}

	try {
		const oldOne = await Templates.findById(params._id);
		// if (body.image) {
		// 	await fs.unlink(`public/${oldOne.thumbnail.link}`, err => {
		// 		if (err) {
		// 			console.error("Error during thumbnail deleting");
		// 		}
		// 	});
		// }
		// Unlink old thumbnail link from s3bucket
		const s3Result = await s3Delete(oldOne.thumbnail.name, "templates");
		console.log(s3Result);

		// Update Template $set
		const result = await Templates.findByIdAndUpdate(
			params._id,
			{ $set: updated },
			{ new: true }
		).populate("prompts");

		return NextResponse.json({ result, success: true }, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json("Failed to update Template.", {
			status: 500
		});
	}
};

/**
 * @method DELETE
 * @param _id
 * @returns NextResponse
 * @description Delete Template by template _id
 */
export const DELETE = async (
	request: NextRequest,
	{ params }: { params: { _id: string } }
): Promise<NextResponse | void> => {
	await connectDb();

	try {
		const template = await Templates.findById(params._id);
		if (!template) {
			return NextResponse.json("Template is not exists.", {
				status: 500
			});
		}
		await s3Delete(template.thumbnail.name, "templates");
		// await fs.unlink(`public/${template.thumbnail.link}`, err => {
		// 	if (err) {
		// 		console.error("Error during thumbnail deleting");
		// 	}
		// });
		const result = await Templates.findByIdAndDelete(params._id);
		return NextResponse.json(result, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json("Failed to delete Template.", {
			status: 500
		});
	}
};
