import { ModelType } from "@/@types/global";
import mongoose, { Schema, Document } from "mongoose";

// Define interface with properties of the document.
export interface Model extends Document {
	url?: string;
	modelName: string;
	modelType: ModelType;
	thumbnail: {
		name: string;
		link: string;
	};
	supportInpainting: boolean;
	isActive?: boolean;
	isPrivate?: boolean;
	isTrained?: boolean;
}

const ModelSchema = new Schema<Model>({
	modelName: {
		type: String,
		required: true
	},
	url: String,
	modelType: {
		type: String,
		required: true,
		enum: ["Checkpoint", "Lora"]
	},
	thumbnail: {
		name: {
			type: String,
			required: true
		},
		link: {
			type: String,
			requried: true
		}
	},
	supportInpainting: {
		type: Boolean,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	},
	isPrivate: {
		type: Boolean,
		default: true
	},
	isTrained: {
		type: Boolean,
		default: false
	}
});

let Models: mongoose.Model<any, object, object, object, any, any>;

try {
	Models = mongoose.model<Model>("models");
} catch (error) {
	Models = mongoose.model<Model>("models", ModelSchema);
}

export default Models;
