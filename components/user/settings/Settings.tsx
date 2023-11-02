import React, { Fragment, useState } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import Icon from "@/components/Icon";
import Image from "next/image";
import Model from "@/components/user/model/Model";
import Size from "./Size";
import ImageItemSelect from "@/components/basic/ImageItemSelect";

interface PropsType {
	generationSettings: GSettingsType;
	setGenerationSettings: (_val: GSettingsType) => void;
	models: Model[];
	modelName: string;
	setModelName: (_val: string) => void;
	selectedFile: string;
	setSelectedFile: (_val: string) => void;
	loras: string;
	setLoras: (_val: string) => void;
	filteredModels: Model[];
	size: ImageSize;
	setSize: (_val: ImageSize) => void;
}

const Settings: React.FC<PropsType> = ({
	generationSettings,
	setGenerationSettings,
	modelName,
	setModelName,
	models,
	size,
	setSize,
	loras,
	setLoras
}) => {
	const [isLoraOpen, setIsLoraOpen] = useState(false);
	function closeLoraModal() {
		setIsLoraOpen(false);
	}

	function openLoraModal() {
		setIsLoraOpen(true);
	}

	return (
		<div className="flex w-full justify-start pt-4">
			<div className="mx-auto w-full rounded-2xl bg-gray-800 p-2">
				<Disclosure>
					<ImageItemSelect
						options={models
							.filter(model => model.modelType === "Checkpoint")
							.map(item => ({
								src: item.thumbnail.link ? item.thumbnail.link : "",
								name: item.modelName,
								id: item.modelName,
								value: item
							}))}
						value={{
							id: "",
							src: "/default_model.png",
							name: modelName,
							value: modelName
						}}
						onSelect={(selectedModel: Model) =>
							setModelName(
								models.filter(
									item => item.modelName === selectedModel.modelName
								)[0].modelName
							)
						}
						title="Select Model"
					/>
				</Disclosure>
				<Disclosure as="div" className="mt-2">
					{() => (
						<>
							<p className="mb-3 text-white">Lora</p>
							<div className="inset-0 items-center ">
								<button
									type="button"
									onClick={openLoraModal}
									className="flex w-full items-center justify-between rounded-md border-2 border-white bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
								>
									<div className="flex items-center">
										<div className="text-sm">
											{loras !== "" ? loras : "Select a lora"}
										</div>
									</div>
									<div className="shrink-0 text-white">
										<Icon icon={"RightArrow"} className="h-6 w-6" />
									</div>
								</button>

								{loras !== "" ? (
									<div className="mt-2">
										<p className="mb-3 text-white">Lora Scale</p>
										<input
											type="range"
											className="w-3/4"
											step={0.05}
											max={1}
											defaultValue={generationSettings.loraScale}
											onChange={(e: React.FormEvent<HTMLInputElement>) =>
												setGenerationSettings({
													...generationSettings,
													loraScale: Number(e.currentTarget.value)
												})
											}
										/>
										<span className=" mx-2 rounded-lg bg-gray-600 px-4 py-1 text-white">
											{generationSettings.loraScale}
										</span>
									</div>
								) : (
									""
								)}
							</div>

							<Transition appear show={isLoraOpen} as={Fragment}>
								<Dialog
									as="div"
									className="relative z-10"
									onClose={closeLoraModal}
								>
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
												<Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
													<Dialog.Title
														as="h3"
														className="text-lg font-medium leading-6 text-white"
													>
														Models
													</Dialog.Title>
													<div className="mt-2 flex flex-wrap p-2">
														{Array.isArray(models) && models.length !== 0
															? models.map(model =>
																	model.modelType === "Lora" ? (
																		<div
																			key={model.modelName}
																			onClick={() => {
																				setLoras(model.modelName);
																				closeLoraModal();
																			}}
																			className="relative mx-2 mb-8 flex w-5/12 cursor-pointer overflow-hidden rounded-lg border border-solid border-slate-300 shadow-lg"
																		>
																			<Image
																				width={500}
																				height={800}
																				alt=""
																				loading="lazy"
																				className="h-auto max-w-full rounded-lg bg-transparent"
																				src={
																					model.thumbnail.link
																						? model.thumbnail.link
																						: "/default_model.png"
																				}
																			/>
																			<div className="absolute top-0 flex h-full w-full">
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
																								<a className="text-bold font-light text-white">
																									{model.modelName}
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
					)}
				</Disclosure>
				<Disclosure as="div" className="mt-2">
					{() => (
						<>
							<Size size={size} setSize={setSize} />
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default Settings;
