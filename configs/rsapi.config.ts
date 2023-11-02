import { RANDOMSEED_API, RANDOMSEED_API_KEY } from "./env.config";

export const rsModelGetApi = `${RANDOMSEED_API}/v1/models`;
export const rsModelTrainingApi = `${RANDOMSEED_API}/v1/load-model`;
export const rsImage2ImageApi = `${RANDOMSEED_API}/v1/sync/img2img`;
export const rsText2ImageApi = `${RANDOMSEED_API}/v1/sync/txt2img`;

export const rsApiConfig = {
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${RANDOMSEED_API_KEY}`
	}
};
