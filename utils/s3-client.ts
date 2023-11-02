import {
	AWS_ACCESS_KEY_ID,
	AWS_S3BUCKET_NAME,
	AWS_REGION,
	AWS_SECRET_ACCESS_KEY,
	AWS_UPLOAD_DIR
} from "@/configs/env.config";
import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand
} from "@aws-sdk/client-s3";

// ---------- Init S3 Client ----------
const initS3Client = () => {
	if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
		throw new Error("AWS credentials are not set");
	}

	const s3 = new S3Client({
		region: AWS_REGION,
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID,
			secretAccessKey: AWS_SECRET_ACCESS_KEY
		}
	});

	return s3;
};
// ------------------------------------

// Store the file to S3 Bucket
export const s3Uploadv2 = async (
	file: IS3UploadFile
): Promise<IS3Upload | undefined> => {
	const s3 = initS3Client();

	// ---------- Init AWS S3 Command ----------
	const command = new PutObjectCommand({
		Bucket: AWS_S3BUCKET_NAME,
		Key: `${AWS_UPLOAD_DIR}/${file.filename}`,
		Body: file.buffer,
		ContentType: file.mimetype
	});
	// -----------------------------------------

	try {
		// Execute the command to upload the file to S3
		console.log(`Starting to upload the file :=> `, file.filename);
		const s3Result = await s3.send(command);
		console.log(`S3 Bucket uploading Success :=> `, s3Result);

		return {
			size: (file.size / 1024).toFixed(2),
			s3_link: `https://${AWS_S3BUCKET_NAME}.s3.amazonaws.com/${AWS_UPLOAD_DIR}/${file.filename}`,
			file_name: file.filename,
			original_name: file.originalname
		};
	} catch (error: any) {
		throw new Error(error.message);
	}
};

// Delete File from S3 Bucket
export const s3Delete = async (key: string, category: string): Promise<any> => {
	const s3 = initS3Client();

	// ---------- Init AWS S3 Command ----------
	const command = new DeleteObjectCommand({
		Bucket: AWS_S3BUCKET_NAME,
		Key: `${AWS_UPLOAD_DIR}/${category}/${key}`
	});
	// -----------------------------------------
	try {
		// Send the AWS s3 command to delete the data
		return await s3.send(command);
	} catch (err) {
		console.error(`Error S3Bucket deleting file :=> ${err}`);
	}
};
