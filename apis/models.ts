import api from "@/configs/api";
import { toast } from "react-toastify";

export const getRandomseedModels = async () => {
	try {
		const response = await api.get("/randomseed/models");
		return response.data;
	} catch (err: any) {
		toast.error(err.response.data.message);
	}
};

export const updateRandomseedModel = async (update: Model) => {
	try {
		const response = await api.post(`/randomseed/models/${update.modelName}`, {
			newUpdate: update
		});
		return response.data;
	} catch (err: any) {
		toast.error(err.response.data.message);
	}
};
