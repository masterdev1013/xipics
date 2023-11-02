declare interface GSettingsType {
	imageNumber: number;
	stepNumber: number;
	guidanceScale: number;
	strength: number;
	sampler: string;
	seed: number;
	loraScale: number;
}

// Define the structure for file upload data
declare interface IS3UploadFile {
	filename: string;
	mimetype: string;
	buffer: Buffer;
	size: number;
	originalname: string;
}

// Define the structure for the response after uploading to S3
declare interface IS3Upload {
	size: string;
	s3_link: string;
	file_name: string;
	original_name: string;
}

declare interface SamplerList {
	EulerAncestralDiscreteScheduler: string;
	UniPCMultistepScheduler: string;
	DDIMScheduler: string;
	EulerDiscreteScheduler: string;
	LMSDiscreteScheduler: string;
	DPMSolverMultistepScheduler: string;
	HeunDiscreteScheduler: string;
	DDPMScheduler: string;
	PNDMScheduler: string;
	DPMSolverSinglestepScheduler: string;
	[key: string]: string; // This is the index signature
}

declare interface FileType {
	filename: string;
	size: number;
	originalname: string;
	mimetype: string;
	buffer: ArrayBuffer;
}

declare interface LoadingState {
	add: boolean;
	edit: boolean;
	delete: boolean;
}

declare interface PrivateModel {
	support_inpainting: boolean;
	model_name: string;
	thumbnail: {
		name: string;
		link: string;
	};
	model_type: "Checkpoint" | "Lora";
	is_private: boolean;
	is_active?: boolean;
}

declare interface Model {
	_id?: string;
	modelName: string;
	modelType: "Checkpoint" | "Lora";
	thumbnail: {
		name: string;
		link: string;
	};
	supportInpainting: boolean;
	isActive?: boolean;
	isPrivate?: boolean;
	isTrained?: boolean;
	url?: string;
}

declare type Option = {
	value: any;
	label: string;
};

declare interface User {
	_id: string;
	name: string;
	email: string;
	isActive: boolean;
	isAdmin: boolean;
	password?: string;
}

declare interface ImageSize {
	width: number;
	height: number;
}

declare interface RSModel {
	support_inpainting: boolean;
	model_name: string;
	model_type: "Checkpoint" | "Lora";
}
