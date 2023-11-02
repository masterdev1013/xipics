"use client";
import { getRandomseedModels } from "@/apis/models";
import AddModelModal from "@/components/admin/models/AddModelModal";
import EditModelModal from "@/components/admin/models/EditModelModal";
import { ModelTable } from "@/components/admin/models/ModelTable";
import { useXLoading } from "@/context/XLoadingContext";
import React, { useState } from "react";

export default function Page() {
	const { startLoading, stopLoading } = useXLoading();
	const [models, setModels] = useState<Model[]>([]);
	const [editModalOpen, setModelEditModalOpen] = useState<boolean>(false);
	const [modelEdit, setModelEdit] = useState<Model | null>(null);

	React.useEffect(() => {
		startLoading();
		getModels();
	}, []);

	const getModels = async () => {
		const result = await getRandomseedModels();
		setModels(result);
		stopLoading();
	};

	return (
		<div className="relative overflow-x-auto shadow-md pt-10">
			<AddModelModal models={models} />
			<EditModelModal
				models={models}
				open={editModalOpen}
				setOpen={setModelEditModalOpen}
				modelEdit={modelEdit}
				setModels={setModels}
			/>
			<ModelTable
				models={models}
				setModels={setModels}
				setModelEditModalOpen={setModelEditModalOpen}
				setModelEdit={setModelEdit}
			/>
		</div>
	);
}
