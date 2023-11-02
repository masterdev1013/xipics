import React, { useEffect, useState } from "react";
import CustomButton from "@/components/basic/CustomButton";
import AddTemplateModal from "@/components/admin/template/AddTemplateModal";
import { SAMPLER_LIST } from "@/constants";
import isEmpty from "is-empty";
import UserSelectArea from "@/components/basic/UserSelectArea";
import ImageItemSelect from "@/components/basic/ImageItemSelect";
import CustomMultiSelect from "@/components/basic/CustomMultiSelect";
import ImageUpload from "@/components/basic/ImageUpload";
import AdminSettings from "@/components/admin/settings/AdminSettings";
import { toast } from "react-toastify";
import { handleImageUpload } from "@/utils/fileupload";
import api from "@/configs/api";
import XConfirmModal from "@/components/basic/XC";

interface PropsType {
	templates: Template[];
	prompts: Prompt[];
	setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
}

const TemplateTab: React.FC<PropsType> = ({
	templates,
	prompts,
	setTemplates
}) => {
	const [models, setModels] = useState<Model[]>([]);
	const initialTemplate: Template = {
		_id: "",
		name: "",
		model: null,
		prompts: [],
		thumbnail: {
			name: "",
			link: ""
		},
		imageNumber: 1,
		stepNumber: 30,
		guidanceScale: 7.5,
		sampler: SAMPLER_LIST[0],
		width: 128,
		height: 128,
		loras: "",
		loraScale: 7.5
	};
	const [selectedTemplate, setSelectedTemplate] =
		useState<Template>(initialTemplate);
	const [imageFile, setImageFile] = useState<File | null>(null);

	const [templateEditable, setTemplateEditable] = useState<boolean>(false);
	const [loadingState, setLoadingState] = useState<LoadingState>({
		add: false,
		edit: false,
		delete: false
	});
	const [tempModalOpen, setTempModalOpen] = useState<boolean>(false);
	useEffect(() => {
		getModels();
	}, []);

	useEffect(() => {
		if (isEmpty(templates)) return;
		setSelectedTemplate(templates[0]);
	}, [templates]);

	useEffect(() => {
		if (imageFile === null) return;
		setTemplateEditable(true);
	}, [imageFile]);

	useEffect(() => {
		const a = templates.filter(
			template => template._id === selectedTemplate._id
		)[0];
		if (isEmpty(selectedTemplate) || isEmpty(a)) return;
		if (
			a.name === selectedTemplate.name &&
			a.model === selectedTemplate.model &&
			a.prompts === selectedTemplate.prompts &&
			a.imageNumber === selectedTemplate.imageNumber &&
			a.stepNumber === selectedTemplate.stepNumber &&
			a.guidanceScale === selectedTemplate.guidanceScale &&
			a.sampler === selectedTemplate.sampler &&
			a.width === selectedTemplate.width &&
			a.height === selectedTemplate.height &&
			a.loras === selectedTemplate.loras &&
			a.loraScale === selectedTemplate.loraScale &&
			imageFile === null
		) {
			setTemplateEditable(false);
		} else {
			setTemplateEditable(true);
		}
	}, [selectedTemplate]);

	const getModels = async () => {
		try {
			const res = await api.get("/randomseed/models");
			const data = res.data.filter((item: any) => item.isActive);
			setModels(data);
		} catch (err: any) {
			toast.error(err.response.data as string);
		}
	};

	const handleUpdateTemplate = async () => {
		setLoadingState({ ...loadingState, edit: true });

		try {
			let updatedImageData;
			if (!isEmpty(imageFile)) {
				updatedImageData = await handleImageUpload(imageFile, "templates");
				setImageFile(null);
			}

			// Store the data
			const data = !isEmpty(updatedImageData)
				? {
						...selectedTemplate,
						thumbnail: {
							name: updatedImageData.fileName,
							link: updatedImageData.link
						}
				  }
				: selectedTemplate;
			const res = await api.post(`/admin/template/${selectedTemplate._id}`, {
				updated: data,
				image: !isEmpty(imageFile)
			});

			const updatedTemplate = res.data.result;
			setTemplates(prevState => {
				return prevState.map(prompt =>
					prompt._id === updatedTemplate._id ? updatedTemplate : prompt
				);
			});
			toast.success("Successfully updated Prompt");
		} catch (error: any) {
			toast.warning(error?.response?.data);
		}
		setLoadingState({ ...loadingState, edit: false });
	};

	const handleDeleteTemplate = async () => {
		setLoadingState({ ...loadingState, delete: true });
		try {
			const res = await api.delete(`/admin/template/${selectedTemplate._id}`);
			const deletedId = res.data._id;
			// Find Prompt that is _id=deletedId and delete it from prompts
			const newTemplates = templates.filter(prompt => prompt._id !== deletedId);
			setTemplates(newTemplates);
			toast.success("Successfully Deleted Prompt");
		} catch (error: any) {
			toast.warning(error?.response?.data);
		}
		setLoadingState({ ...loadingState, delete: false });
	};

	return (
		<>
			<AddTemplateModal
				isOpen={tempModalOpen}
				handleOpen={setTempModalOpen}
				onSuccess={(newOne: Template) => setTemplates([newOne, ...templates])}
				prompts={prompts}
				models={models}
				templates={templates}
			/>
			<div className="flex w-full flex-col justify-around lg:flex-row">
				<div className="w-full p-4 lg:w-1/2">
					<p className="my-3 text-white">Template Name</p>
					<UserSelectArea
						options={templates.map(item => ({
							label: item.name,
							value: item
						}))}
						value={{
							label: selectedTemplate.name,
							value: selectedTemplate
						}}
						onChange={e => setSelectedTemplate(e.value)}
						className="mb-2"
					/>
					<ImageUpload
						componentId={"image-2"}
						onImageSelect={e => setImageFile(e)}
						src={selectedTemplate.thumbnail.link}
					/>
					{/* Select Several Prompts */}
					<CustomMultiSelect
						value={selectedTemplate.prompts.map(item => ({
							value: item,
							label: item.name
						}))}
						options={prompts
							.filter(
								item =>
									selectedTemplate.prompts.map(i => i._id).indexOf(item._id) ===
									-1
							)
							.map(item => ({
								value: item,
								label: item.name
							}))}
						onChange={(e: Option[]) => {
							setSelectedTemplate({
								...selectedTemplate,
								prompts: e.map((item: any) => {
									return item.value;
								})
							});
						}}
						defaultValue={[]}
						multiple
					/>
					{/* Select Model */}
					<ImageItemSelect
						options={models
							.filter(item => item.modelType === "Checkpoint")
							.map(item => ({
								src: item.thumbnail.link,
								name: item.modelName,
								id: item.modelName,
								value: item
							}))}
						value={
							selectedTemplate.model !== null
								? {
										id: selectedTemplate.model?.modelName as string,
										src: selectedTemplate.model?.thumbnail?.link as string,
										name: selectedTemplate.model?.modelName as string,
										value: selectedTemplate.model
								  }
								: {
										id: "",
										src: "",
										name: "",
										value: ""
								  }
						}
						onSelect={(e: Model) =>
							setSelectedTemplate({
								...selectedTemplate,
								model: models.filter(item => item.modelName === e.modelName)[0]
							})
						}
						title="Select Model"
					/>
					<AdminSettings
						template={selectedTemplate}
						loraModels={models?.filter(model => model.modelType === "Lora")}
						setTemplate={setSelectedTemplate}
					/>

					<CustomButton onClick={() => setTempModalOpen(true)}>
						Add Template
					</CustomButton>
					<CustomButton
						onClick={handleUpdateTemplate}
						loading={loadingState.edit}
						disabled={!templateEditable}
					>
						Update Template
					</CustomButton>
					<XConfirmModal header={`Delete ${selectedTemplate.name}`}>
						<CustomButton
							onClick={handleDeleteTemplate}
							loading={loadingState.delete}
							color={"danger"}
						>
							Delete Template
						</CustomButton>
					</XConfirmModal>
				</div>
			</div>
		</>
	);
};

export default TemplateTab;
