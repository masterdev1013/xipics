import { NextRequest, NextResponse } from "next/server";
import { verifyAuthByHeader } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
	const requestHeaders = new Headers(request.headers);
	const authToken = requestHeaders.get("X-Auth-Token");
	if (!authToken) {
		return NextResponse.json(
			{ msg: "No token, authrozation denied" },
			{ status: 401 }
		);
	}

	try {
		const decoded = await verifyAuthByHeader(authToken);
		const path = request.nextUrl.pathname;
		if (decoded) {
			if (path.includes("/admin")) {
				if (!decoded.isAdmin) {
					return NextResponse.json("You don't have permission as admin", {
						status: 403
					});
				}
			}
			return NextResponse.next();
		}
		return NextResponse.json("The token is unavailable", { status: 401 });
	} catch (err) {
		return NextResponse.json({ error: "Server Error" }, { status: 500 });
	}
};

export const config = {
	matcher: ["/api/auth", "/api/admin/:path*"]
};
