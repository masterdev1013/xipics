import { NextRequest, NextResponse } from "next/server";
import fs, { writeFile } from "fs";
import { v4 as uuidV4 } from "uuid";
import { AWS_UPLOAD_DIR } from "@/configs/env.config";

/**
 * @method POST
 * @param request
 * @returns
 */
export const POST = async (request: NextRequest) => {
	const formData = await request.formData();
	if (!fs.existsSync("public/" + AWS_UPLOAD_DIR ?? "")) {
		fs.mkdirSync("public/" + AWS_UPLOAD_DIR ?? "");
	}

	const file: File | null = formData.get("file") as unknown as File;
	const path: string = formData.get("path") as string;

	if (!file) {
		return NextResponse.json("File is required", { status: 400 });
	}

	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);

	const fileName = `${uuidV4()}-${file.name}`;
	const filePath = `${AWS_UPLOAD_DIR}${path ? path : ""}/${fileName}`;
	const result = await writeFile(
		"public/" + filePath,
		buffer,
		(err: unknown) => {
			if (err as string) {
				return NextResponse.json(err, { status: 200 });
			}
		}
	);
	console.log(result);

	return NextResponse.json(
		{
			link: filePath,
			fileName: fileName,
			size: file.size,
			type: file.type
		},
		{ status: 200 }
	);
};
