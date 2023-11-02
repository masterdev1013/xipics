import type { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { SignJWT, jwtVerify } from "jose";
import { USER_TOKEN, getJwtSecretKey } from "./constants";
import { User } from "@/models/User";
import { JWT_EXPIRES_IN } from "../configs/env.config";

interface UserJwtPayload {
	email?: string;
	id?: string;
	isAdmin?: boolean;
	isActive?: boolean;
	jti: string;
	iat: number;
	exp: number;
}

export class AuthError extends Error {}

// ------------------ Generate new jwt token and return with NextResponse and verify by cookie ------------------
export async function verifyAuth(req: NextRequest) {
	const token = req.cookies.get(USER_TOKEN)?.value;

	if (!token) throw new AuthError("Missing user token");

	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getJwtSecretKey())
		);
		return verified.payload as UserJwtPayload;
	} catch (err) {
		throw new AuthError("Your token has expired.");
	}
}

export async function setUserCookie(res: NextResponse, user: User) {
	const token = await new SignJWT({
		email: user.email,
		id: user._id,
		isActive: user.isActive,
		isAdmin: user.isAdmin
	})
		.setProtectedHeader({ alg: "HS256" })
		.setJti(nanoid())
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRES_IN)
		.sign(new TextEncoder().encode(getJwtSecretKey()));

	res.cookies.set(USER_TOKEN, token, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 // 1 day
	});

	return res;
}

export function expireUserCookie(res: NextResponse) {
	res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
	return res;
}
// ------------------------------------------------------------------------------------------------------------

// ------------------ generate new JWT Token and verify token by request header -----------------------
export const generateJwtToken = async (user: User) => {
	const token = await new SignJWT({
		email: user.email,
		id: user._id,
		isAdmin: user.isAdmin,
		isActive: user.isActive
	})
		.setProtectedHeader({ alg: "HS256" })
		.setJti(nanoid())
		.setIssuedAt()
		.setExpirationTime(JWT_EXPIRES_IN)
		.sign(new TextEncoder().encode(getJwtSecretKey()));
	return token;
};

export const verifyAuthByHeader = async (token: string) => {
	if (!token) throw new AuthError("Missing user token");

	try {
		const verified = await jwtVerify(
			token,
			new TextEncoder().encode(getJwtSecretKey())
		);
		return verified.payload as UserJwtPayload;
	} catch (err) {
		throw new AuthError("Your token has expired.");
	}
};
// -----------------------------------------------------------------------------------------------------
