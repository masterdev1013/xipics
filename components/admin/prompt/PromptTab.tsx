import React, { useEffect, useState } from "react";
import UserSelectArea from "../../basic/UserSelectArea";
import CustomButton from "@/components/basic/CustomButton";
import { toast } from "react-toastify";
import { DEFAULT_NEGATIVE_PROMPT } from "@/constants";
import AddPromptModal from "./AddPromptModal";
import UserTextArea from "@/components/basic/UserTextArea";
import isEmpty from "is-empty";
import api from "@/configs/api";
import XConfirmModal from "@/components/basic/XC";

interface PropsType {
	prompts: Prompt[];
	setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

const PromptTab: React.FC<PropsType> = ({
	prompts,
	setPrompts,
	setTemplates
}) => {
	const [selectedPrompt, setSelectedPrompt] = useState<Prompt>({
		_id: "",
		name: "",
		prompt: "",
		negativePrompt: DEFAULT_NEGATIVE_PROMPT
	});
	const [promptEditable, setPromptEditable] = useState<boolean>(false);
	const [promptModalOpen, setPromptModalOpen] = useState<boolean>(false);
	const [loadingState, setLoadingState] = useState<LoadingState>({
		add: false,
		edit: false,
		delete: false
	});

	useEffect(() => {
		if (isEmpty(prompts)) return;
		setSelectedPrompt(prompts[0]);
	}, [prompts]);

	useEffect(() => {
		const measurePrompt = prompts.filter(
			prompt => prompt._id === selectedPrompt._id
		)[0];
		if (isEmpty(selectedPrompt) || isEmpty(measurePrompt)) return;
		if (
			measurePrompt.name === selectedPrompt.name &&
			measurePrompt.prompt === selectedPrompt.prompt &&
			measurePrompt.negativePrompt === selectedPrompt.negativePrompt
		) {
			setPromptEditable(false);
		} else {
			setPromptEditable(true);
		}
	}, [selectedPrompt]);

	// Update Prompt
	const handleUpdatePrompt = async () => {
		setLoadingState({ ...loadingState, edit: true });
		try {
			const res = await api.post(
				`/admin/prompt/${selectedPrompt._id}`,
				selectedPrompt
			);
			const updatedPrompt = res.data;

			setPrompts(prevState => {
				return prevState.map(prompt =>
					prompt._id === updatedPrompt._id ? updatedPrompt : prompt
				);
			});

			const templateRes = await api.get("/templates");
			setTemplates(templateRes.data);
			setPromptEditable(false);
			toast.success("Successfully Edited Prompt");
		} catch (error: any) {
			toast.warning(error?.response?.data);
		}
		setLoadingState({ ...loadingState, edit: false });
	};

	// Delete Prompt
	const handleDeletePrompt = async () => {
		setLoadingState({ ...loadingState, delete: true });
		try {
			const res = await api.delete(`/admin/prompt/${selectedPrompt._id}`);
			const deletedId = res.data._id;
			// Find Prompt that is _id=deletedId and delete it from prompts
			const newprompts = prompts.filter(prompt => prompt._id !== deletedId);
			setPrompts(newprompts);
			const templates = (await api.get("/templates")).data;
			setTemplates(templates);
			toast.success("Successfully Deleted Prompt");
		} catch (error: any) {
			if (error.response.data.message) {
				toast.warning(error?.response?.data.message);
			} else {
				console.log(error.response.data);
			}
		}
		setLoadingState({ ...loadingState, delete: false });
	};

	return (
		<>
			<AddPromptModal
				isOpen={promptModalOpen}
				prompts={prompts}
				handleOpen={setPromptModalOpen}
				onSuccess={(newOne: Prompt) => setPrompts([newOne, ...prompts])}
			/>
			<div className="flex w-full flex-col justify-around lg:flex-row">
				<div className="w-full p-4 lg:w-1/2">
					<UserSelectArea
						options={prompts.map(item => ({
							label: item.name,
							value: item
						}))}
						value={{
							label: selectedPrompt.name,
							value: selectedPrompt
						}}
						title="Prompt"
						onChange={e => setSelectedPrompt(e.value)}
					/>

					{/* Prompt Start */}
					<UserTextArea
						title="Prompt"
						value={selectedPrompt.prompt}
						onChange={e =>
							setSelectedPrompt({ ...selectedPrompt, prompt: e.target.value })
						}
					/>
					{/* Prompt End */}

					{/* Negative Prompt Start */}
					<UserTextArea
						title={"Negative Prompt"}
						value={selectedPrompt.negativePrompt}
						onChange={e =>
							setSelectedPrompt({
								...selectedPrompt,
								negativePrompt: e.target.value
							})
						}
					/>
					{/* Negative Prompt End */}

					<CustomButton onClick={() => setPromptModalOpen(true)}>
						Add Prompt
					</CustomButton>
					<CustomButton
						onClick={handleUpdatePrompt}
						loading={loadingState.edit}
						disabled={!promptEditable}
					>
						Update Prompt
					</CustomButton>
					<XConfirmModal
						header={`Delete ${selectedPrompt.name} prompt template`}
					>
						<CustomButton
							onClick={handleDeletePrompt}
							loading={loadingState.delete}
							color={"danger"}
						>
							Delete Prompt
						</CustomButton>
					</XConfirmModal>
				</div>
			</div>
		</>
	);
};

export default PromptTab;
