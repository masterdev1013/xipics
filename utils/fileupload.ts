import api from "@/configs/api";
import { toast } from "react-toastify";

export const handleImageUpload = async (
	file: File | null,
	path: string = ""
) => {
	if (!file) {
		toast.warning("Image uploading is required!");
	}
	const formData = new FormData();
	formData.append("file", file as Blob);
	// formData.append("path", `/images${path}`);
	formData.append("path", path);
	try {
		const imageUploadResponse = await api.post("/upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return imageUploadResponse.data;
	} catch (error: any) {
		toast.warning(error?.response?.data);
	}
};
