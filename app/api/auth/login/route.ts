import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/utils/mongodb";
import Users, { User } from "@/models/User";
import { generateJwtToken } from "@/lib/auth";

/**
 * @method POST
 * @returns NextResponse
 * @description Generate new token by user email and password
 */
export const POST = async (
	request: NextRequest
): Promise<NextResponse | void> => {
	await connectDb();

	const body = await request.json();
	const { email, password } = body;

	// Validate email and password
	if (!email || !password) {
		return NextResponse.json({
			status: 404,
			success: false,
			message: "Email and password are required"
		});
	}

	try {
		const user = await Users.findOne({ email });

		// validate if the user is exists
		if (!user) {
			return NextResponse.json(
				{
					message: "User not found"
				},
				{ status: 404 }
			);
		}

		// Here we assert that user is of IUser type.
		const isPasswordMatch = await (user as User).comparePassword(password);

		if (!isPasswordMatch) {
			return NextResponse.json(
				{
					message: "Invalid password"
				},
				{ status: 400 }
			);
		}

		if (!user.isActive) {
			return NextResponse.json(
				{
					message: "The account has been deactivated",
					success: false
				},
				{ status: 400 }
			);
		}

		const token = await generateJwtToken(user);
		return NextResponse.json(
			{
				user: {
					email: user.email,
					isAdmin: user.isAdmin,
					id: user._id,
					isActive: user.isActive
				},
				token
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({
			success: false,
			message: "Server Error",
			error
		});
	}
};
