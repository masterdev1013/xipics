import { NextRequest, NextResponse } from "next/server";
import isEmpty from "is-empty";
import Users from "@/models/User";
import { connectDb } from "@/utils/mongodb";

interface ErrorObject {
	name: string;
	email: string;
	password: string;
	password1: string;
}

export const POST = async (
	request: NextRequest
): Promise<NextResponse | void> => {
	try {
		await connectDb();
		const body = await request.json();

		const { name, email, password, password1 } = body;

		const errorObj: ErrorObject = {
			name: name,
			email: email,
			password: password,
			password1: password1
		};

		if (isEmpty(name)) {
			errorObj.name = "Name is required!";
			return NextResponse.json({ status: 400, message: errorObj.name });
		}

		if (isEmpty(email)) {
			errorObj.email = "Email is required!";
			return NextResponse.json({ status: 400, message: errorObj.email });
		}

		if (isEmpty(password)) {
			errorObj.password = "Password is required!";
			return NextResponse.json({ status: 400, message: errorObj.password });
		}

		if (isEmpty(password1)) {
			errorObj.password1 = "Confirm password is required!";
			return NextResponse.json({ status: 400, message: errorObj.password1 });
		}

		if (password !== password1) {
			errorObj.password = "Password is not confirmed!";
			return NextResponse.json({ status: 400, message: errorObj.password });
		}

		const alreadyUser = await Users.findOne({ email });

		if (alreadyUser) {
			return NextResponse.json({
				status: 404,
				success: false,
				message: "User Already Exists!"
			});
		}

		const user = new Users({
			name: name,
			email: email,
			password: password
		});

		await user.save();

		return NextResponse.json({ status: 200, message: "Successfully Sign Up" });
	} catch (error) {
		console.log(error);
	}
};
