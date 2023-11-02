import React, { Fragment } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Transition, Listbox } from "@headlessui/react";
import { IMAGE_WIDTHS } from "@/constants";

interface PropsType {
	height: number;
	setHeight: (_val: number) => void;
}

const Height: React.FC<PropsType> = ({ height, setHeight }) => {
	// const [selectedSize, setSelectedSize] = useState<number>(IMAGE_WIDTHS[0]);

	return (
		<>
			<p className="mb-3 mt-6 text-white">Height</p>
			<div className=" top-16 w-3/4">
				<Listbox value={height} onChange={value => setHeight(value)}>
					<div className="relative mt-1">
						<Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-600 py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
							<span className="block truncate">{height}</span>
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
							<Listbox.Options className="max-h-100 absolute z-10 mt-1 w-full overflow-auto rounded-md bg-gray-600 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
								{IMAGE_WIDTHS.map((imageHeight, index) => (
									<Listbox.Option
										key={index}
										className={({ active }: { active: boolean }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-amber-100 text-amber-900" : "text-white"
											}`
										}
										value={imageHeight}
									>
										{({ selected }: { selected: boolean }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{imageHeight}
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

export default Height;
