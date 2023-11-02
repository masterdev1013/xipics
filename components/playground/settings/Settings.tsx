import React, { Fragment, useState } from "react";
import { Dialog, Transition, Disclosure, Listbox } from "@headlessui/react";
import {
	ChevronUpIcon,
	CheckIcon,
	ChevronUpDownIcon
} from "@heroicons/react/20/solid";
import { SAMPLER_LIST } from "@/constants";
import Icon from "@/components/Icon";
import Width from "@/components/playground/settings/Width";
import Height from "@/components/playground/settings/Height";
import FileUpload from "@/components/playground/settings/FileUpload";
import Image from "next/image";

interface PropsType {
	generationSettings: GSettingsType;
	setGenerationSettings: (_params: GSettingsType) => void;
	width: number;
	setWidth: (_val: number) => void;
	height: number;
	setHeight: (_val: number) => void;
	models: Array<{
		model_name: string;
		model_type: string;
	}>;
	selectedFile: string;
	setSelectedFile: (_val: string) => void;
	loras: string;
	setLoras: (_val: string) => void;
}

const Settings: React.FC<PropsType> = ({
	generationSettings,
	setGenerationSettings,
	width,
	setWidth,
	height,
	setHeight,
	models,
	selectedFile,
	setSelectedFile,
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
					{({ open }) => (
						<>
							<Disclosure.Button className="focus-visible:ring/75 flex w-full justify-between  rounded-lg px-4 py-2 text-left text-sm font-medium  text-white transition-all duration-200 focus:outline-none">
								<span>What is your refund policy?</span>
								<ChevronUpIcon
									className={`${
										open ? "rotate-180" : ""
									} h-5 w-5 text-white transition-transform duration-200`}
								/>
							</Disclosure.Button>
							<Transition
								show={open}
								enter="transition-all ease-out duration-200"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="transition-all ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-white">
									<p className="mb-3 text-white">Number of images</p>
									<input
										type="range"
										className="w-3/4"
										step={1}
										// max={0}
										defaultValue={0}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											setGenerationSettings({
												...generationSettings,
												imageNumber: Number(e.currentTarget.value)
											})
										}
									/>
									<span className=" mx-2 rounded-lg bg-gray-600 px-4 py-1">
										{generationSettings.imageNumber}
									</span>
									<p className="mb-3 text-white">
										<a href="https://example.com" className="underline">
											Upgrade
										</a>{" "}
										to generate more images per turn
									</p>

									<div className="mb-3 text-white">
										Number of Inference Steps
										<Icon
											icon={"QuestionMark"}
											className="m-0.5 inline h-6 w-6"
										/>
									</div>
									<input
										type="range"
										className="w-3/4"
										step={1}
										max={120}
										defaultValue={generationSettings.stepNumber}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											setGenerationSettings({
												...generationSettings,
												stepNumber: Number(e.currentTarget.value)
											})
										}
									/>
									<span className=" mx-2 rounded-lg bg-gray-600 px-4 py-1">
										{generationSettings.stepNumber}
									</span>

									<div className="mb-3 text-white">
										Guidance Scale
										<Icon
											icon={"QuestionMark"}
											className="m-0.5 inline h-6 w-6"
										/>
									</div>
									<input
										type="range"
										className="w-3/4"
										step={0.5}
										max={20}
										defaultValue={generationSettings.guidanceScale}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											setGenerationSettings({
												...generationSettings,
												guidanceScale: Number(e.currentTarget.value)
											})
										}
									/>
									<span className=" mx-2 rounded-lg bg-gray-600 px-4 py-1">
										{generationSettings.guidanceScale}
									</span>

									{/* Sampler Option Start */}
									<p className="mb-3 mt-6 text-white">Sampler</p>
									<div className=" top-16 w-3/4">
										<Listbox
											value={generationSettings.sampler}
											onChange={newSampler =>
												setGenerationSettings({
													...generationSettings,
													sampler: newSampler
												})
											}
										>
											<div className="relative mt-1">
												<Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-600 py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
													<span className="block truncate">
														{generationSettings.sampler}
													</span>
													<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
														<ChevronUpDownIcon
															className="h-5 w-5 text-white"
															aria-hidden="true"
														/>
													</span>
												</Listbox.Button>
												<Transition
													as={Fragment}
													leave="transition ease-in duration-100"
													leaveFrom="opacity-100"
													leaveTo="opacity-0"
												>
													<Listbox.Options className="max-h-100 ring-dark/5 absolute z-30 mt-1 w-full overflow-auto rounded-md bg-gray-600 py-1 text-base shadow-lg ring-1 focus:outline-none sm:text-sm">
														{SAMPLER_LIST.map((person, personIdx) => (
															<Listbox.Option
																key={personIdx}
																className={({ active }) =>
																	`relative cursor-default select-none py-2 pl-10 pr-4 ${
																		active
																			? "bg-amber-100 text-amber-900"
																			: "text-white"
																	}`
																}
																value={person}
															>
																{({ selected }) => (
																	<>
																		<span
																			className={`block truncate ${
																				selected ? "font-medium" : "font-normal"
																			}`}
																		>
																			{person}
																		</span>
																		{selected ? (
																			<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																				<CheckIcon
																					className="h-5 w-5"
																					aria-hidden="true"
																				/>
																			</span>
																		) : null}
																	</>
																)}
															</Listbox.Option>
														))}
													</Listbox.Options>
												</Transition>
											</div>
										</Listbox>
									</div>
									{/* Sampler Option End */}
									<Width width={width} setWidth={setWidth} />
									<Height height={height} setHeight={setHeight} />
									<p className="mb-3 mt-6 text-white">Seed</p>
									<input
										type="number"
										min={-1}
										defaultValue={generationSettings.seed}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											setGenerationSettings({
												...generationSettings,
												seed: Number(e.currentTarget.value)
											})
										}
										className=" w-3/4 cursor-default rounded-lg bg-gray-600 px-3 py-2 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
									/>
									<p className="mb-3 mt-2 text-white">put -1 for random</p>
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>
				<Disclosure as="div" className="mt-2">
					{({ open }) => (
						<>
							<Disclosure.Button className="focus-visible:ring/75 flex w-full justify-between  rounded-lg px-4 py-2 text-left text-sm font-medium  text-white transition-all  duration-200 focus:outline-none">
								<span>Img2Img & Inpainting</span>
								<ChevronUpIcon
									className={`${
										open ? "rotate-180" : ""
									} h-5 w-5 text-white transition-transform duration-200`}
								/>
							</Disclosure.Button>
							<Transition
								show={open}
								enter="transition-all ease-out duration-200"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="transition-all ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-400">
									<div className="mb-3 text-white">
										Image Strength
										<Icon
											icon={"QuestionMark"}
											className="m-0.5 inline h-6 w-6"
										/>
									</div>
									<input
										type="range"
										className="mb-4 w-3/4"
										step={0.1}
										min={0}
										max={1}
										defaultValue={0.5}
										onChange={(e: React.FormEvent<HTMLInputElement>) =>
											setGenerationSettings({
												...generationSettings,
												strength: Number(e.currentTarget.value)
											})
										}
									/>
									<span className=" mx-2 mb-4 rounded-lg bg-gray-600 px-4 py-1">
										{generationSettings.strength}
									</span>

									{/* File Upload Start */}
									<FileUpload
										selectedFile={selectedFile}
										setSelectedFile={setSelectedFile}
									/>
									{/* File Upload End */}
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>
				<Disclosure as="div" className="mt-2">
					{({ open }) => (
						<>
							<Disclosure.Button className="focus-visible:ring/75 flex w-full justify-between  rounded-lg px-4 py-2 text-left text-sm font-medium  text-white transition-all  duration-200 focus:outline-none">
								<span>Loras</span>
								<ChevronUpIcon
									className={`${
										open ? "rotate-180" : ""
									} h-5 w-5 text-white transition-transform duration-200`}
								/>
							</Disclosure.Button>
							<Transition
								show={open}
								enter="transition-all ease-out duration-200"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="transition-all ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-400">
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
													defaultValue={0.75}
													onChange={(e: React.FormEvent<HTMLInputElement>) =>
														setGenerationSettings({
															...generationSettings,
															loraScale: Number(e.currentTarget.value)
														})
													}
												/>
												<span className=" mx-2 rounded-lg bg-gray-600 px-4 py-1">
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
																	? models.map(
																			(model: {
																				model_name: string;
																				model_type: string;
																			}) =>
																				model.model_type === "Lora" ? (
																					<div
																						key={model.model_name}
																						onClick={() => {
																							setLoras(model.model_name);
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
																							src={"/default_mode.png"}
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
								</Disclosure.Panel>
							</Transition>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	);
};

export default Settings;
