import React, { Fragment } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import Icon from "@/components/Icon";

interface ModelType {
	model_name: string;
	model_type: string;
}

interface PropsType {
	openModal: () => void;
	closeModal: () => void;
	model_name: string;
	setModel_name: (_val: string) => void;
	isOpen: boolean;
	filteredModels: ModelType[];
	models: ModelType[];
}

const Model: React.FC<PropsType> = ({
	openModal,
	closeModal,
	model_name,
	isOpen,
	filteredModels,
	models,
	setModel_name
}) => {
	return (
		<>
			<p className="my-3 text-white">Model</p>
			<div className="inset-0 items-center ">
				<button
					type="button"
					onClick={openModal}
					className="flex w-full items-center justify-between rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
				>
					<div className="flex items-center">
						<div className="text-sm">{model_name}</div>
					</div>
					<div className="shrink-0 text-white">
						<Icon icon={"RightArrow"} className={"h-6 w-6"} />
					</div>
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-800/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-xl overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-white"
									>
										Models
									</Dialog.Title>
									<div className="mt-2 flex flex-wrap p-2">
										{Array.isArray(filteredModels) && models.length !== 0
											? models.map(
													(model: {
														model_name: string;
														model_type: string;
													}) =>
														model.model_type === "Checkpoint" ? (
															<div
																key={model.model_name}
																onClick={() => {
																	setModel_name(model.model_name);
																	closeModal();
																}}
																className="relative mx-2 mb-8 flex w-5/12 cursor-pointer overflow-hidden rounded-lg border border-solid border-slate-300 shadow-lg"
															>
																<Image
																	alt=""
																	loading="lazy"
																	width={500}
																	height={800}
																	className="h-auto max-w-full rounded-lg bg-transparent"
																	src={"/default_model.png"}
																/>
																<div className="absolute inset-y-0 flex h-full w-full">
																	<div className="absolute bottom-0 h-[75px] w-full bg-white/25">
																		<div
																			className="flex h-full w-full items-center justify-between px-4"
																			style={{
																				background:
																					"linear-gradient(45deg, rgba(37, 38, 43, 0.9) 0%, rgba(37, 38, 43, 0) 100%)",
																				backdropFilter:
																					"blur(13px) saturate(160%)",
																				boxShadow:
																					"rgba(0, 0, 0, 0.2) 0px -2px 6px 1px"
																			}}
																		>
																			<div className="flex h-full grow rounded-md py-4">
																				<div className="ml-2 mt-2 flex grow flex-col">
																					<a className="text-sm font-light text-white">
																						{model.model_name}
																					</a>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														) : (
															""
														)
											  )
											: ""}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default Model;
