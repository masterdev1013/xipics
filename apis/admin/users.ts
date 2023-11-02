import api from "@/configs/api";
import { toast } from "react-toastify";

export const addOneUser = async (user: User) => {
	try {
		const response = await api.post("/admin/users", user);
		toast.success(response.data.message);
		return response.data.user;
	} catch (err: any) {
		toast.error(err.data.response.message as string);
	}
};

export const updateOneUser = async (
	update: User,
	users: User[]
): Promise<User[]> => {
	try {
		const response = await api.post(`/admin/users/${update._id}`, {
			newUser: update
		});

		const updatedUser = response.data.user as User;
		if (updatedUser && response.data.success) {
			const userUpdates = users.map(item => {
				if (item._id === updatedUser._id) {
					return updatedUser;
				}
				return item;
			});
			return userUpdates;
		} else {
			return users;
		}
	} catch (err: any) {
		console.error(err.response.data as string);
		return users;
	}
};

// Delete One user by User's ID
export const deleteOneUser = async (_id: string) => {
	try {
		const response = await api.delete(`/admin/users/${_id}`);
		toast.success(response.data.message);	
		return response.data.user;
	} catch (err: any) {
		toast.error(err.response.data.message as string);
	}
};
