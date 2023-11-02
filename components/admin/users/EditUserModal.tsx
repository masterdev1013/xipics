import CustomModal from "@/components/basic/CustomModal";
import { XButton, XInput } from "@/components/basic/XC";
import api from "@/configs/api";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

interface PropsType {
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	userEdit: User | null;
}

const EditUserModal: React.FC<PropsType> = ({
	users,
	setUsers,
	open,
	setOpen,
	userEdit
}) => {
	const initalUser: User = {
		name: "",
		email: "",
		_id: "",
		isAdmin: false,
		isActive: false,
		password: ""
	};
	const [user, setUser] = React.useState<User>(initalUser);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	useEffect(() => {
		if (open && userEdit !== null) {
			setUser(userEdit);
		}
	}, [open]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const handleUserUpdate = async () => {
		if (users.filter(item => item.email === user.email).length === 0) {
			toast.warning("Email doesn't exist");
			return;
		}
		setIsLoading(true);
		try {
			const axiosResponse = await api.post(`/admin/users/${user._id}`, {
				newUser: {
					name: user.name
				}
			});
			if (axiosResponse.data.success) {
				const result = axiosResponse.data.result;
				const usersUpdate = users;
				usersUpdate[users.map(item => item._id).indexOf(result._id)] = result;
				setUsers(usersUpdate);
				toast.success(axiosResponse.data);
				setOpen(false);
				setUser(initalUser);
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			toast.warning(error?.response?.data);
		}
		setIsLoading(false);
	};

	return (
		<CustomModal
			title="Add New User"
			isOpen={open}
			onClose={() => {
				setUser(initalUser);
				setOpen(false);
			}}
		>
			<div className="w-full p-4">
				<XInput
					label="Name"
					name="name"
					placeholder="User name"
					value={user.name}
					onChange={handleInputChange}
					block
				/>
				<XButton onClick={handleUserUpdate} block loading={isLoading}>
					Save Model
				</XButton>
			</div>
		</CustomModal>
	);
};

export default EditUserModal;
