import Users from "@/models/User";
import { connectDb } from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	await connectDb();
	const users = await Users.find();
	return NextResponse.json(
		{ users: users.filter(item => item.name !== "Administrator").reverse() },
		{ status: 200 }
	);
};

export const POST = async (request: NextRequest) => {
	const { name, email, password, isAdmin } = await request.json();

	try {
		await connectDb();

		const newUser = await new Users({
			name,
			email,
			password,
			isAdmin
		}).save();

		return NextResponse.json({
			success: true,
			user: newUser
		});
	} catch (err) {
		return NextResponse.json(err, { status: 500 });
	}
};
