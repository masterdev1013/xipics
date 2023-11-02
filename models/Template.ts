import mongoose, { Schema, Document } from "mongoose";

export interface Template extends Document {
	name: string;
	model: {
		modelName: string;
		modelType: "Checkpoint" | "Lora";
		isPrivate: boolean;
	};
	prompts: string[];
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

// Create schema using defined interface.
const TemplateSchema = new Schema<Template>({
	name: {
		type: String,
		required: true
	},
	model: {
		modelName: {
			type: String,
			required: true
		},
		modelType: {
			type: String,
			enum: ["Checkpoint", "Lora"],
			required: true
		},
		isPrivate: {
			type: Boolean,
			default: false
		}
	},
	prompts: [
		{
			type: Schema.Types.ObjectId,
			ref: "prompts"
		}
	],
	thumbnail: {
		name: {
			type: String,
			required: true
		},
		link: {
			type: String,
			required: true,
			unique: true
		}
	},
	imageNumber: {
		type: Number,
		required: true
	},
	stepNumber: {
		type: Number,
		required: true
	},
	guidanceScale: {
		type: Number,
		required: true
	},
	sampler: {
		type: String,
		required: true
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	loras: {
		type: String,
		required: false
	},
	loraScale: {
		type: Number,
		required: false
	}
});

let Templates: mongoose.Model<any, object, object, object, any, any>;

try {
	Templates = mongoose.model<Model>("templates");
} catch (error) {
	Templates = mongoose.model<Model>("templates", TemplateSchema);
}

export default Templates;
