import React, { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import CustomModal from "@/components/basic/CustomModal";

interface ImageOption {
	src: string;
	name: string;
	id: string | undefined;
	value: any;
}
interface PropsType {
	options: ImageOption[];
	value: ImageOption;
	onSelect: (_var: any) => void;
	title?: string;
}

const ImageItemSelect: React.FC<PropsType> = ({
	options,
	value,
	onSelect,
	title = ""
}) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<>
			<p className="my-3 text-white">{title}</p>
			<div className="inset-0 items-center ">
				<button
					type="button"
					onClick={() => setModalOpen(true)}
					className="flex w-full items-center justify-between rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
				>
					<div className="flex items-center">
						<div className="text-sm">{value?.name}</div>
					</div>
					<div className="shrink-0 text-white">
						<Icon icon={"RightArrow"} className={"h-6 w-6"} />
					</div>
				</button>
			</div>

			<CustomModal
				title={title}
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<div className="mt-2 flex flex-wrap p-2">
					{options.length !== 0
						? options.map((item, i) => (
								<div
									key={`${item.name}-${i}`}
									onClick={() => {
										onSelect(item.value);
										setModalOpen(false);
									}}
									className="relative mx-2 mb-8 flex w-5/12 cursor-pointer overflow-hidden rounded-lg border border-solid border-slate-300 shadow-lg"
								>
									<Image
										alt=""
										loading="lazy"
										width={500}
										height={800}
										className="h-auto max-w-full rounded-lg bg-transparent"
										// src={item.src[0] === "/" ? item.src : "/" + item.src}
										src={item.src}
									/>
									<div className="absolute inset-y-0 flex h-full w-full">
										<div className="absolute bottom-0 h-[75px] w-full bg-white/25">
											<div
												className="flex h-full w-full items-center justify-between px-4"
												style={{
													background:
														"linear-gradient(45deg, rgba(37, 38, 43, 0.9) 0%, rgba(37, 38, 43, 0) 100%)",
													backdropFilter: "blur(13px) saturate(160%)",
													boxShadow: "rgba(0, 0, 0, 0.2) 0px -2px 6px 1px"
												}}
											>
												<div className="flex h-full grow rounded-md py-4">
													<div className="ml-2 mt-2 flex grow flex-col">
														<a className="text-sm font-light text-white">
															{item.name}
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
						  ))
						: ""}
				</div>
			</CustomModal>
		</>
	);
};

export default ImageItemSelect;
