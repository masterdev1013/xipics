import mongoose, { Schema, Document } from "mongoose";

// Define interface with properties of the document.
export interface Prompt extends Document {
	name: string;
	prompt: string;
	negativePrompt: string;
}

const PromptSchema = new Schema<Prompt>({
	name: { type: String, required: true },
	prompt: { type: String, required: true },
	negativePrompt: { type: String }
});

let Prompts: mongoose.Model<any, object, object, object, any, any>;

try {
	Prompts = mongoose.model<Prompt>("prompts");
} catch (error) {
	Prompts = mongoose.model<Prompt>("prompts", PromptSchema);
}

export default Prompts;
