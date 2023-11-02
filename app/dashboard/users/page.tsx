"use client";
import AddUserModal from "@/components/admin/users/AddUserModal";
import EditUserModal from "@/components/admin/users/EditUserModal";
import UserTable from "@/components/admin/users/UserTable";
import api from "@/configs/api";
import { useXLoading } from "@/context/XLoadingContext";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
	const [users, setUsers] = React.useState<User[]>([]);
	const [editModalOpen, setUserEditModalOpen] = useState<boolean>(false);
	const [userEdit, setUserEdit] = useState<User | null>(null);
	const { startLoading, stopLoading } = useXLoading();
	React.useEffect(() => {
		startLoading();
		getUsers();
	}, []);

	const getUsers = async () => {
		api
			.get("/admin/users")
			.then(res => {
				setUsers(res.data.users);
				stopLoading();
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			});
	};

	return (
		<div className="relative overflow-x-auto shadow-md pt-10">
			<AddUserModal users={users} setUsers={setUsers} />
			<EditUserModal
				users={users}
				setUsers={setUsers}
				open={editModalOpen}
				setOpen={setUserEditModalOpen}
				userEdit={userEdit}
			/>
			<UserTable
				users={users}
				setUsers={setUsers}
				setUserEditModalOpen={setUserEditModalOpen}
				setUserEdit={setUserEdit}
			/>
		</div>
	);
}
