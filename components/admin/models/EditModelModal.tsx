import CustomModal from "@/components/basic/CustomModal";
import ImageUpload from "@/components/basic/ImageUpload";
import { XButton } from "@/components/basic/XC";
import api from "@/configs/api";
import { handleImageUpload } from "@/utils/fileupload";
import isEmpty from "is-empty";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface PropsType {
	models: Model[];
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	modelEdit: Model | null;
	setModels: React.Dispatch<React.SetStateAction<Model[]>>;
}

const EditModelModal: React.FC<PropsType> = ({
	models,
	open,
	setOpen,
	modelEdit,
	setModels
}) => {
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
	const [imageFile, setImageFile] = React.useState<File | null>(null);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	useEffect(() => {
		if (open && modelEdit !== null) {
			setModel(modelEdit);
		}
	}, [open]);

	const handleModelUpdate = async () => {
		if (
			models.filter(item => item.modelName === model.modelName).length !== 0 &&
			isEmpty(imageFile)
		) {
			toast.warning("You didn't change anything.");
			return;
		}

		if (
			models.filter(
				item => item.modelName === model.modelName && item._id !== model._id
			).length !== 0
		) {
			toast.error("Model name musb be unique");
		}
		setIsLoading(true);

		try {
			let updatedImageData;
			if (!isEmpty(imageFile)) {
				updatedImageData = await handleImageUpload(imageFile, "models");
			}

			const data = {
				...model,
				modelType: model.modelType,
				thumbnail: !isEmpty(updatedImageData)
					? {
							name: updatedImageData.fileName,
							link: updatedImageData.link
					  }
					: model.thumbnail
			};

			const updatedResult = (
				await api.post(`/admin/randomseed/model/${modelEdit?.modelName}`, {
					updated: data,
					image: !isEmpty(imageFile)
				})
			).data;
			const updatedModels = models.map(item =>
				item.modelName === updatedResult.result.modelName
					? updatedResult.result
					: item
			);
			console.log(updatedModels);
			setModels(updatedModels);
			setOpen(false);
			setModel(initialModel);
		} catch (error: any) {
			toast.warning(error?.response?.data);
		}
		setIsLoading(false);
	};

	return (
		<CustomModal
			title="Change Model Thumbnail"
			isOpen={open}
			onClose={() => {
				setModel(initialModel);
				setOpen(false);
			}}
		>
			<div className="w-full p-4">
				{/* <XInput
					label="Model Name"
					name="modelName"
					placeholder="Your custom model name"
					value={model.modelName}
					onChange={handleInputChange}
					block
				/> */}
				<ImageUpload
					onImageSelect={e => setImageFile(e)}
					componentId={"image-model-update"}
					src={model.thumbnail.link}
				/>

				<XButton
					onClick={handleModelUpdate}
					block
					loading={isLoading}
					disabled={
						models.filter(item => item.modelName === model.modelName).length !==
							0 && isEmpty(imageFile)
					}
				>
					Save Model
				</XButton>
			</div>
		</CustomModal>
	);
};

export default EditModelModal;
