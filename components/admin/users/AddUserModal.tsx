import { addOneUser } from "@/apis/admin/users";
import CustomModal from "@/components/basic/CustomModal";
import { XButton, XCheckbox, XInput } from "@/components/basic/XC";
import React from "react";
import { toast } from "react-toastify";

interface PropsType {
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AddUserModal: React.FC<PropsType> = ({ users, setUsers }) => {
	const initalUser: User = {
		name: "",
		email: "",
		_id: "",
		isAdmin: false,
		isActive: false,
		password: ""
	};
	const [user, setUser] = React.useState<User>(initalUser);
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setUser({ ...user, [e.target.name]: e.target.value });

	const handleNewModelSave = async () => {
		if (users.filter(item => item.email === user.email).length !== 0) {
			toast.warning("Same email already exists");
			return;
		}
		setIsLoading(true);
		const newUser = await addOneUser(user);
		setUsers([newUser, ...users]);
		setModalOpen(false);
		setUser(initalUser);
		setIsLoading(false);
	};

	return (
		<>
			<XButton onClick={() => setModalOpen(true)} rounded loading={isLoading}>
				Add New User
			</XButton>
			<CustomModal
				title="Add New User"
				isOpen={modalOpen}
				onClose={() => {
					setUser(initalUser);
					setModalOpen(false);
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
					<XInput
						label="Email"
						name="email"
						placeholder="User email"
						value={user.email}
						onChange={handleInputChange}
						block
					/>
					<XInput
						label="User Password"
						name="password"
						type="password"
						placeholder="User password"
						value={user.password ?? ""}
						onChange={handleInputChange}
						block
					/>
					<XCheckbox
						label="Administrator"
						onChange={() => setUser({ ...user, isAdmin: !user.isAdmin })}
						id="user-administrator"
						checked={user.isAdmin}
					/>

					<XButton
						onClick={handleNewModelSave}
						block
						loading={isLoading}
						className="mt-2"
					>
						Save Model
					</XButton>
				</div>
			</CustomModal>
		</>
	);
};

export default AddUserModal;
