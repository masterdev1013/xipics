import CustomModal from "@/components/basic/CustomModal";
import ImageUpload from "@/components/basic/ImageUpload";
import { XButton, XInput, XRadio } from "@/components/basic/XC";
import api from "@/configs/api";
import { handleImageUpload } from "@/utils/fileupload";
import React from "react";
import { toast } from "react-toastify";

const radioOptions: Option[] = [
	{
		label: "Checkpoint",
		value: "Checkpoint"
	},
	{
		label: "Lora",
		value: "Lora"
	}
];

interface PropsType {
	models: Model[];
}

const AddModelModal: React.FC<PropsType> = ({ models }) => {
	const initialModel: Model = {
		modelName: "",
		modelType: "Checkpoint",
		supportInpainting: false,
		url: "",
		thumbnail: {
			name: "",
			link: ""
		}
	};
	const [model, setModel] = React.useState<Model>(initialModel);
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [imageFile, setImageFile] = React.useState<File | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setModel({ ...model, [e.target.name]: e.target.value });

	const handleNewModelSave = async () => {
		if (!imageFile) {
			toast.warning("Please upload your template thumbnail image");
			return;
		}

		if (
			models.filter(item => item.modelName === model.modelName).length !== 0
		) {
			toast.warning(
				"The Model name must be unique. Please try with other name"
			);
			return;
		}
		setIsLoading(true);

		try {
			const imageData = await handleImageUpload(imageFile, "models");
			const data = {
				...model,
				modelType: model.modelType,
				thumbnail: {
					name: imageData.fileName,
					link: imageData.link
				}
			};

			const axiosResponse = await api.post("/admin/randomseed/model", data);
			toast.success(axiosResponse.data);
			setModalOpen(false);
			setModel(initialModel);
		} catch (error: any) {
			if (!error.response.data.success) {
				toast.error(error.response.data.message);
			} else {
				console.error(error);
			}
		}
		setIsLoading(false);
	};

	return (
		<>
			<XButton onClick={() => setModalOpen(true)} rounded>
				Add New Model
			</XButton>
			<CustomModal
				title="Add New Model"
				isOpen={modalOpen}
				onClose={() => {
					setModel(initialModel);
					setModalOpen(false);
				}}
			>
				<div className="w-full p-4">
					<XInput
						label="Model Name"
						name="modelName"
						placeholder="Your custom model name"
						value={model.modelName}
						onChange={handleInputChange}
						block
					/>
					<XInput
						label="Model Link"
						name="url"
						placeholder="Your model download url"
						value={model.url ?? ""}
						onChange={handleInputChange}
						block
					/>
					<ImageUpload
						onImageSelect={e => setImageFile(e)}
						componentId={"image-model-add"}
					/>

					<div className="flex">
						<XRadio
							name="modelType"
							value={model.modelType}
							options={radioOptions}
							onChange={v => {
								if (v === "Checkpoint" || v === "Lora") {
									setModel({ ...model, modelType: v });
								}
							}}
						/>
						<div className="flex items-center">
							<input
								checked={model.supportInpainting}
								onChange={() =>
									setModel({
										...model,
										supportInpainting: !model.supportInpainting
									})
								}
								id="x-checkbox"
								type="checkbox"
								value=""
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								htmlFor="x-checkbox"
								className="ml-2 text-sm font-medium text-white"
							>
								Support Inpainting
							</label>
						</div>
					</div>

					<XButton onClick={handleNewModelSave} block loading={isLoading}>
						Save Model
					</XButton>
				</div>
			</CustomModal>
		</>
	);
};

export default AddModelModal;
