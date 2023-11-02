import React, { useState } from "react";
import { DEFAULT_NEGATIVE_PROMPT } from "@/constants";
import { toast } from "react-toastify";
import CustomModal from "@/components/basic/CustomModal";
import CustomButton from "@/components/basic/CustomButton";
import api from "@/configs/api";

interface PropsType {
	isOpen: boolean;
	prompts: Prompt[];
	handleOpen: (_var: boolean) => void;
	onSuccess: (_var: Prompt) => void;
}

const AddPromptModal: React.FC<PropsType> = ({
	isOpen,
	prompts,
	handleOpen,
	onSuccess
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const initialPrompt: Prompt = {
		_id: "",
		name: "",
		prompt: "",
		negativePrompt: DEFAULT_NEGATIVE_PROMPT
	};

	const [prompt, setPrompt] = useState<Prompt>(initialPrompt);

	const handlePromptSave = async () => {
		if (prompts.filter(item => prompt.name === item.name).length !== 0) {
			toast.warning("Prompt name must be unique");
			return;
		}
		setIsLoading(true);
		try {
			const axiosResponse = await api.post("/admin/prompt", {
				name: prompt.name,
				prompt: prompt.prompt,
				negativePrompt: prompt.negativePrompt
			});

			toast.success("Successfully Save Prompt");
			handleOpen(false);
			setPrompt(initialPrompt);
			onSuccess(axiosResponse.data);
		} catch (error: any) {
			// console.log(error)
			toast.warning(error?.response?.data);
		}
		setIsLoading(false);
	};

	return (
		<CustomModal
			isOpen={isOpen}
			title="Add Prompt Template"
			onClose={() => {
				setPrompt(initialPrompt);
				handleOpen(false);
			}}
		>
			<div className="w-full p-4">
				<p className="my-3 text-white">Prompt Name</p>
				<input
					type="text"
					onChange={e =>
						setPrompt({
							...prompt,
							name: e.currentTarget.value
						})
					}
					value={prompt.name}
					className="focus-visible:ring-primary flex w-full items-center justify-between rounded-xl border-2 border-input-boarder bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-100 focus-visible:transition-all"
				/>
				{/* Prompt Start */}
				<p className="mb-2 mt-5 text-white">Prompt</p>
				<textarea
					value={prompt.prompt}
					className="focus-visible:ring-primary h-[100px] w-full rounded-xl border-2 border-input-boarder bg-slate-700 p-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:transition-all"
					onChange={e => setPrompt({ ...prompt, prompt: e.target.value })}
				>
					{/* {prompt} */}
				</textarea>
				{/* Prompt End */}

				{/* Negative Prompt Start */}
				<p className="mb-3 text-white">Negative Prompt</p>
				<textarea
					rows={10}
					className="focus-visible:ring-primary h-[150px] w-full rounded-xl border-2 border-input-boarder bg-slate-700 p-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:transition-all"
					// value={'hello'}
					defaultValue={DEFAULT_NEGATIVE_PROMPT}
					onChange={e =>
						setPrompt({
							...prompt,
							negativePrompt: e.target.value
						})
					}
				></textarea>
				{/* Negative Prompt End */}
				<CustomButton
					onClick={handlePromptSave}
					color={"primary"}
					loading={isLoading}
				>
					Save Prompt
				</CustomButton>
			</div>
		</CustomModal>
	);
};

export default AddPromptModal;
