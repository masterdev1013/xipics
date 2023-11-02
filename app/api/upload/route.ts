import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";
import { s3Uploadv2 } from "@/utils/s3-client";

/**
 * @method POST
 * @param request
 * @returns
 */
export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	const body = Object.fromEntries(formData);
	const file = body.file.valueOf() as any;
	const path = body.path.valueOf() as string;

	try {
		const result = await s3Uploadv2({
			filename: `${path}/${uuidV4()}-${file.name}`,
			size: file.size,
			originalname: file.name,
			mimetype: file.type,
			buffer: await file.arrayBuffer()
		});

		return NextResponse.json(
			{
				link: result?.s3_link,
				fileName: result?.file_name,
				size: file.size,
				type: file.type
			},
			{ status: 200 }
		);
	} catch (err) {
		return new Response("Internal Server Error", { status: 500 });
	}
};
