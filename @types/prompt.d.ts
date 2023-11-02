declare interface Prompt {
	_id: string;
	name: string;
	prompt?: string;
	negativePrompt?: string;
}

// declare interface Model {
// 	modelName: string;
// 	modelType: ModelType;
// 	isPrivate: boolean;
// }

declare interface Template {
	_id?: string;
	name: string;
	model: Model | null;
	prompts: Prompt[];
	thumbnail: {
		name: string;
		link: string;
	};
	imageNumber: number;
	stepNumber: number;
	guidanceScale: number;
	sampler: string;
	width: number;
	height: number;
	loras: string;
	loraScale: number;
}
