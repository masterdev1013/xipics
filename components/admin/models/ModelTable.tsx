import { XButton, XSwitch, XTable } from "@/components/basic/XC";
import api from "@/configs/api";
import { AxiosError } from "axios";
import React, { Dispatch, FC } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

type ModelUpdateOption = "onlyActive" | "all";

interface PropsType {
	models: Model[];
	setModels: Dispatch<React.SetStateAction<Model[]>>;
	setModelEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setModelEdit: React.Dispatch<React.SetStateAction<Model | null>>;
}

export const ModelTable: FC<PropsType> = ({
	models,
	setModels,
	setModelEditModalOpen,
	setModelEdit
}) => {
	const handleModelUpdate = (model_name: string, option: ModelUpdateOption) => {
		const modelUpdate = models.filter(item => item.modelName === model_name)[0];
		if (option === "onlyActive") {
			modelUpdate.isActive = !modelUpdate.isActive;
		}

		api
			.post(`/admin/randomseed/model/${modelUpdate.modelName}`, {
				updated: modelUpdate,
				image: false
			})
			.then(res => {
				const result = res.data.result as Model;
				if (result && res.data.success) {
					setModels(
						models.map(item => {
							if (item.modelName === result.modelName) {
								return result;
							}
							return item;
						})
					);
				}
			})
			.catch((err: AxiosError) => {
				toast.warning(err.response?.data as string);
			});
	};
	const columns: XTableColumn[] = [
		{
			id: "index",
			dataIndex: "modelName",
			label: "No",
			key: "index",
			render: (_v, _item, _i) => <>{_i + 1}</>
		},
		{
			id: "thumbnail",
			dataIndex: "thumbnail",
			label: "",
			key: "thumbnail",
			render: i =>
				i.link !== undefined ? (
					<Image
						className="rounded-sm"
						// src={i.link[0] === "/" ? i.link : "/" + i.link}
						src={i.link}
						alt={i.name}
						width={30}
						height={50}
					/>
				) : (
					<Image
						className="rounded-sm"
						src={"/default_model.png"}
						alt={i}
						width={30}
						height={50}
					/>
				)
		},
		{
			id: "model_name",
			dataIndex: "modelName",
			label: "Mode Name",
			key: "",
			width: 25,
			render: i => <>{i}</>
		},
		{
			id: "model_type",
			dataIndex: "modelType",
			label: "Type",
			key: ""
		},
		{
			id: "is_private",
			dataIndex: "isPrivate",
			label: "Private Model",
			key: "is_private",
			render: i => <>{i ? "Yes" : "No"}</>
		},
		{
			id: "support_inpainting",
			dataIndex: "supportInpainting",
			label: "Support Inpainting",
			key: "",
			render: i => <>{i ? "Yes" : "No"}</>
		},
		{
			id: "is_active",
			dataIndex: "isActive",
			key: "is_active",
			label: "Active Status",
			render: (isActive, item) => (
				<XSwitch
					checked={isActive}
					onChange={() => handleModelUpdate(item.modelName, "onlyActive")}
				/>
			)
		},
		{
			id: "action",
			dataIndex: "action",
			key: "action",
			label: "Action",
			render: (i, item) => (
				<XButton
					color="primary"
					rounded
					disabled={!item.isPrivate}
					onClick={() => {
						console.log(item);
						setModelEdit(models.filter(u => u.modelName === item.modelName)[0]);
						setModelEditModalOpen(true);
					}}
				>
					Edit
				</XButton>
			)
		}
	];
	return <XTable data={models} columns={columns} />;
};
