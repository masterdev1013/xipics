import { deleteOneUser, updateOneUser } from "@/apis/admin/users";
import XConfirmModal, {
	XButton,
	XButtonGroup,
	XSwitch,
	XTable
} from "@/components/basic/XC";
import React from "react";

interface PropsType {
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
	setUserEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setUserEdit: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserTable: React.FC<PropsType> = ({
	users,
	setUsers,
	setUserEditModalOpen,
	setUserEdit
}) => {
	// Handle User Updates
	const handleSwitchUpdate = async (
		_id: string,
		param: "active" | "admin" | "other"
	) => {
		const update = users.filter(item => item._id === _id)[0];
		if (param === "active") {
			update.isActive = !update.isActive;
		}
		if (param === "admin") {
			update.isAdmin = !update.isAdmin;
		}
		const result = await updateOneUser(update, users);
		setUsers(result);
	};

	// Handle User Delete
	const handleDeleteUser = async (_id: string) => {
		const result = await deleteOneUser(_id);
		setUsers(users.filter(u => u._id !== result._id));
	};

	const columns: XTableColumn[] = [
		{
			id: "index",
			dataIndex: "name",
			label: "No",
			key: "index",
			render: (_v, _item, _i) => <>{_i + 1}</>
		},
		{
			id: "name",
			dataIndex: "name",
			label: "Name",
			key: "name"
		},
		{
			id: "email",
			dataIndex: "email",
			label: "Email",
			key: "email",
			width: 25,
			render: i => <>{i}</>
		},
		{
			id: "is_active",
			dataIndex: "isActive",
			key: "is_active",
			label: "Active Status",
			render: (isActive, item) => (
				<XSwitch
					checked={isActive}
					key={`user-active-${item._id}`}
					onChange={() => handleSwitchUpdate(item._id, "active")}
				/>
			)
		},
		{
			id: "is_admin",
			dataIndex: "isAdmin",
			key: "ia_admin",
			label: "Administrator",
			render: (isAdmin, item) => (
				<XSwitch
					checked={isAdmin}
					key={`user-admin-${item._id}`}
					onChange={() => handleSwitchUpdate(item._id, "admin")}
				/>
			)
		},
		{
			id: "_id",
			dataIndex: "_id",
			key: "action",
			label: "Action",
			render: (i, item) => (
				<XButtonGroup key={`user-action-${item._id}`}>
					<XButton
						color={"primary"}
						onClick={() => {
							setUserEdit(users.filter(u => u._id === i)[0]);
							setUserEditModalOpen(true);
						}}
						size={"small"}
						rounded
					>
						Edit
					</XButton>
					<XConfirmModal content={`Delete ${item.name}`}>
						<XButton
							color={"danger"}
							disabled={item.email === "admin@xipics.com"}
							onClick={() => {
								handleDeleteUser(item._id);
							}}
							rounded
							size={"small"}
						>
							Delete
						</XButton>
					</XConfirmModal>
				</XButtonGroup>
			)
		}
	];
	return <XTable data={users} columns={columns} />;
};

export default UserTable;
