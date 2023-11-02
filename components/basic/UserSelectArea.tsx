import React, { Fragment, FC } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import isEmpty from "is-empty";

interface PropsType {
	options: Option[];
	value: Option;
	onChange: (_val: Option) => void;
	title?: string;
	className?: string;
}

const UserSelectArea: FC<PropsType> = ({
	options,
	value: selectedValue,
	onChange: _onChange,
	title = "",
	className
}) => {
	return (
		<div className={className}>
			<p className="my-3 text-white">{title}</p>
			<div className=" top-16 w-full">
				{!isEmpty(selectedValue) ? (
					<Listbox
						value={selectedValue.value}
						onChange={(val: Option) => _onChange(val)}
					>
						<div className="relative mt-1">
							<Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-600 py-2 pl-3 pr-10 text-left text-white shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
								<span className="block truncate">{selectedValue.label}</span>
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
								<Listbox.Options className="max-h-100 ring-dark/5 absolute z-20 mt-1 w-full overflow-auto rounded-md bg-gray-600 py-1 text-base shadow-lg ring-1 focus:outline-none sm:text-sm">
									{options.map((item, index) => (
										<Listbox.Option
											key={index}
											className={({ active }) =>
												`relative cursor-default select-none py-2 pl-10 pr-4 ${
													active ? "bg-amber-100 text-amber-900" : "text-white"
												}`
											}
											value={item}
										>
											{({ selected }) => (
												<>
													<span
														className={`block truncate ${
															selected ? "font-medium" : "font-normal"
														}`}
													>
														{item.label}
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
				) : (
					<div>Prompt is Empty</div>
				)}
			</div>
		</div>
	);
};

export default UserSelectArea;
