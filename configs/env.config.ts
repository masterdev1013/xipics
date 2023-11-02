// LOCAL ENV
export const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "";

// JWT ENV
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? "";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

// MONGODB ENV
export const MONGO_URI = process.env.MONGO_URI ?? "";
export const DB_NAME = process.env.DB_NAME ?? "";

// AWS ENV
export const AWS_UPLOAD_DIR = process.env.AWS_UPLOAD_DIR ?? "";
export const AWS_REGION = process.env.AWS_REGION ?? "";
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ?? "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY ?? "";
export const AWS_S3BUCKET_NAME = process.env.AWS_S3BUCKET_NAME ?? "";

// RANDOMSEED ENV
export const RANDOMSEED_API_KEY = process.env.RANDOMSEED_API_KEY ?? "";
export const RANDOMSEED_API = process.env.RANDOMSEED_API ?? "";
