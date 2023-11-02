import React, { useEffect, useState } from "react";
import { IMAGE_SIZE, SAMPLER_LIST } from "@/constants";
import { toast } from "react-toastify";
import CustomModal from "@/components/basic/CustomModal";
import CustomButton from "@/components/basic/CustomButton";
import ImageItemSelect from "@/components/basic/ImageItemSelect";
import isEmpty from "is-empty";
import AdminSettings from "@/components/admin/settings/AdminSettings";
import ImageUpload from "@/components/basic/ImageUpload";
import CustomMultiSelect from "@/components/basic/CustomMultiSelect";
import { handleImageUpload } from "@/utils/fileupload";
import api from "@/configs/api";

interface PropsType {
	isOpen: boolean;
	templates: Template[];
	handleOpen: (_var: boolean) => void;
	onSuccess: (_var: Template) => void;
	prompts: Prompt[];
	models: Model[];
}

const AddTemplateModal: React.FC<PropsType> = ({
	isOpen,
	handleOpen,
	onSuccess,
	templates,
	prompts,
	models
}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
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
		width: IMAGE_SIZE[0].width,
		height: IMAGE_SIZE[0].height,
		loras: "",
		loraScale: 7.5
	};

	const [template, setTemplate] = useState<Template>(initialTemplate);
	const [imageFile, setImageFile] = useState<File | null>(null);

	useEffect(() => {
		if (isEmpty(models)) return;
		setTemplate({ ...template, model: models[0] });
	}, [models]);

	// Save the new Template
	const handleAddTemplate = async () => {
		setIsLoading(true);

		if (templates.filter(item => template.name === item.name).length !== 0) {
			toast.warning("Template name must be unique");
			setIsLoading(false);
			return;
		}

		if (isEmpty(template.model) || template.model === null) {
			toast.warning("Model is required!");
			setIsLoading(false);
			return;
		}

		if (isEmpty(imageFile)) {
			toast.warning("Please upload your template thumbnail image");
			setIsLoading(false);
			return;
		}

		try {
			const imageData = await handleImageUpload(imageFile, "templates");
			const data: Template = {
				...template,
				thumbnail: {
					name: imageData.fileName,
					link: imageData.link
				}
			};

			const axiosResponse = await api.post("/admin/template", data);

			toast.success("Successfully Save Template");
			handleOpen(false);
			setTemplate(initialTemplate);
			onSuccess(axiosResponse.data);
		} catch (error: any) {
			toast.warning(error?.response?.data);
		}
		setIsLoading(false);
	};

	return (
		<>
			<CustomModal
				isOpen={isOpen}
				title="Add Template"
				onClose={() => {
					setTemplate(initialTemplate);
					handleOpen(false);
				}}
			>
				<div className="w-full p-4">
					<div className="inset-0 items-center">
						<input
							type="text"
							onChange={e =>
								setTemplate({ ...template, name: e.currentTarget.value })
							}
							placeholder="Template Name"
							className="focus-visible:ring-primary mb-2 flex w-full items-center justify-between rounded-xl border-2 border-input-boarder bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-100 focus-visible:transition-all"
						/>
						<ImageUpload
							onImageSelect={e => setImageFile(e)}
							componentId={"image-template-add"}
						/>
						{/* Testing start */}

						{/* Testing end */}
						{/* Select Several Prompts */}
						<CustomMultiSelect
							value={template.prompts.map(item => ({
								value: item,
								label: item.name
							}))}
							options={prompts.map(item => ({
								value: item,
								label: item.name
							}))}
							onChange={(e: Option[]) => {
								setTemplate({
									...template,
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
								.filter(model => model.modelType === "Checkpoint")
								.map(item => ({
									src: item.thumbnail.link ? item.thumbnail.link : "",
									name: item.modelName,
									id: item.modelName,
									value: item
								}))}
							value={{
								id: "",
								src: "/default_model.png",
								name: template.model?.modelName as string,
								value: template.model
							}}
							onSelect={(selectedModel: Model) =>
								setTemplate({
									...template,
									model: models.filter(
										item => item.modelName === selectedModel.modelName
									)[0]
								})
							}
							title="Select Model"
						/>
						<AdminSettings
							template={template}
							loraModels={models?.filter(model => model.modelType === "Lora")}
							setTemplate={setTemplate}
						/>

						<CustomButton onClick={handleAddTemplate} loading={isLoading}>
							Add Template
						</CustomButton>
					</div>
				</div>
			</CustomModal>
		</>
	);
};

export default AddTemplateModal;
