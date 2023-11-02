import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";
import Users from "@/models/User";

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

	try {
		// Update Template $set
		const result = await Users.findByIdAndUpdate(
			params._id,
			{ $set: body.newUser },
			{ new: true }
		);

		return NextResponse.json(
			{
				success: true,
				user: result
			},
			{ status: 200 }
		);
	} catch (err) {
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
	_request: NextRequest,
	{ params }: { params: { _id: string } }
): Promise<NextResponse | void> => {
	await connectDb();

	try {
		const user = await Users.findByIdAndDelete(params._id);
		return NextResponse.json({ success: true, user: user }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{
				success: false,
				message: "Failed to delete user"
			},
			{
				status: 500
			}
		);
	}
};
