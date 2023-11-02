import { generateJwtToken, verifyAuthByHeader } from "@/lib/auth";
import Users from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const requestHeaders = new Headers(req.headers);

	const oldAuthToken = requestHeaders.get("X-Auth-Token");
	const decoded = await verifyAuthByHeader(oldAuthToken ?? "");
	const user = await Users.findById(decoded.id);

	const newToken = await generateJwtToken(user);
	if (user.isActive) {
		return NextResponse.json(
			{
				user: {
					email: user.email,
					id: user._id,
					isAdmin: user.isAdmin,
					isActive: user.isActive
				},
				token: newToken
			},
			{ status: 200 }
		);
	} else {
		return NextResponse.json({
			success: false,
			message: "The account is deactivated"
		});
	}
};
