import React, { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Transition, Listbox } from "@headlessui/react";
import { IMAGE_SIZE } from "@/constants";
import { convertSizeToString } from "@/utils/math";

interface PropsType {
	size: ImageSize;
	setSize: (_val: ImageSize) => void;
}

const Size: React.FC<PropsType> = ({ size, setSize }) => {
	return (
		<>
			<p className="mb-3 mt-6 text-white">Size</p>
			<div className="top-16 w-full">
				<Listbox value={size} onChange={value => setSize(value)}>
					<div className="relative mt-1 focus:z-[999]">
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-600 py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">
								{convertSizeToString(size)}
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
							<Listbox.Options className="max-h-100 ring-dark/5 absolute mt-1 w-full overflow-auto rounded-md bg-gray-600 py-1 text-base shadow-lg ring-1 focus:outline-none sm:text-sm">
								{IMAGE_SIZE.map((imageWidth, index) => (
									<Listbox.Option
										key={index}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-amber-100 text-amber-900" : "text-white"
											}`
										}
										value={imageWidth}
									>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{convertSizeToString(imageWidth)}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
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
		</>
	);
};

export default Size;
