import Link from "next/link";
import React, { FC, cloneElement, isValidElement, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Icon from "../Icon";

export const XLink: React.FC<XLinkProps> = ({
	href,
	children,
	className = "",
	onClick
}) => {
	return (
		<Link href={href} onClick={onClick} className={`${className}`}>
			{children && children}
		</Link>
	);
};

export const XButton: React.FC<XButtonPropsType> = ({
	children,
	className = "",
	onClick,
	type = "button",
	block = false,
	color = "primary",
	position,
	onBlur,
	rounded = false,
	disabled = false,
	loading = false,
	size = "medium"
}) => {
	let buttonStyle = "rounded-md";
	let buttonSize = "";
	switch (position) {
		case "left":
			buttonStyle = rounded ? "rounded-l-md mr-0" : "mr-0";
			break;
		case "right":
			buttonStyle = rounded ? "rounded-r-md ml-0" : "ml-0";
			break;
	}

	switch (size) {
		case "large":
			break;
		case "small":
			buttonSize = "px-2 py-[3px]";
			break;
		default:
			buttonSize = "px-4 py-2";
	}
	return (
		<button
			disabled={disabled}
			onBlur={onBlur}
			type={type}
			onClick={onClick}
			className={`hover:font-white text-dark mx-[2px] ${buttonSize} text-sm font-medium transition-all delay-100 ease-in ${className} ${
				block ? "w-full" : ""
			} bg-${color} ${
				!disabled && "hover:bg-" + color + "-100"
			} text-white ${buttonStyle}`}
		>
			<div role="status">
				{loading === true ? (
					<div role="status">
						<Icon icon={"Loading"} />
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					children && children
				)}
			</div>
		</button>
	);
};

export const XButtonGroup: React.FC<XButtonGroupProps> = ({ children }) => {
	const childrenArray = React.Children.toArray(children);
	return (
		<div className="inline-flex rounded-md shadow-sm" role="group">
			{childrenArray.map((child, i) => {
				if (!React.isValidElement(child)) return child;
				let position: XGroupPosition = "middle";
				if (i === 0) {
					position = "left";
				} else if (i === childrenArray.length - 1) {
					position = "right";
				}

				return React.cloneElement(child, { ...child.props, position });
			})}
		</div>
	);
};

export const XInput: React.FC<XInputProps> = ({
	label,
	value,
	type = "text",
	name = "",
	onChange,
	className = "",
	placeholder = "",
	id,
	block = false
}) => {
	return (
		<div className={`my-4 ${block && "w-full"}`}>
			{label && (
				<label
					className="mb-1 block text-sm font-medium text-white px-1"
					htmlFor={name}
				>
					{label}
				</label>
			)}
			<input
				name={name}
				id={id ? id : name}
				value={value}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				className={`x-full item-center focus-visible:border-primary flex justify-between rounded-xl border-2 border-solid border-[#dee1e354] bg-transparent px-4 py-2 text-sm font-medium text-white outline-none transition-all duration-300 ease-in-out focus:ring-2 focus-visible:ring-primary/10 ${className} ${
					block && "w-full"
				}`}
			/>
		</div>
	);
};

// Card Component
export const XCard: React.FC<XCardProps> = ({
	className,
	children,
	title,
	footer
}) => {
	return (
		<div
			className={`mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0 ${
				className && className
			}`}
		>
			<div className="w-full rounded-lg border border-gray-700 bg-gray-800 shadow sm:max-w-md md:mt-0 xl:p-0">
				<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
					{title && <>{title}</>}
					{children}
					{footer && <>{footer}</>}
				</div>
			</div>
		</div>
	);
};

// Table Component
export const XTable: React.FC<XTableProps> = ({
	columns,
	data,
	loading = false
}) => {
	return (
		<table className="w-full text-sm text-gray dark:text-gray-400 rounded-sm mt-2">
			<thead className="bg-dark-100 text-xs uppercase text-gray-400">
				<tr>
					{columns.map((column, i) => (
						<th
							key={`columns-${i}`}
							scope="col"
							style={{
								...column.style,
								width: column.width ? `${column.width}%` : ""
							}}
							className={`px-6 py-4 text-${
								column.align ? column.align : "center"
							}`}
						>
							{column.label}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{loading ? (
					<>Loading...</>
				) : (
					data.map((k: { [key: string]: any }, i) => (
						<tr
							key={`data-column-${i}`}
							className="border-b text-white border-gray-700 bg-gray-800 hover:bg-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
						>
							{columns.map((col, j) => (
								<td key={`data-row-${j}`} className="p-2 text-center">
									{col.render && typeof col.render === "function"
										? col.render(k[col.dataIndex], k, i)
										: k[col.dataIndex]}
								</td>
							))}
						</tr>
					))
				)}
			</tbody>
		</table>
	);
};

export const XSwitch: React.FC<XSwitchProps> = ({
	checked,
	children,
	onChange
}) => {
	return (
		<label className="relative inline-flex cursor-pointer items-center outline-none">
			<input
				type="checkbox"
				value=""
				className="peer sr-only outline-none"
				checked={checked}
				onChange={() => {
					if (onChange) onChange(!checked);
				}}
			/>
			<div className="peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 outline-none peer-checked:bg-blue-600 peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 dark:border-gray-600 dark:bg-gray-700"></div>
			{children && (
				<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 outlie-none">
					{children}
				</span>
			)}
		</label>
	);
};

// Radio Component
export const XRadio: React.FC<XRadioProps> = ({
	name,
	className,
	id,
	value,
	options,
	onChange
}) => {
	return (
		<div className="flex item-center w-full">
			{options.map((option, i) => (
				<div className="mr-4" key={`${option.value}-${i}`}>
					<input
						id={`${id}-i`}
						checked={value === option.value}
						type="radio"
						value={option.value}
						name={name}
						onChange={e => onChange(e.target.value)}
						className={`w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 outline-none ${className}`}
					/>
					<label
						htmlFor={name}
						className="ml-2 text-sm font-medium dark:text-gray-300 text-white"
					>
						{option.label}
					</label>
				</div>
			))}
		</div>
	);
};

export const XCheckbox: React.FC<XCheckboxProps> = ({
	onChange,
	checked,
	label,
	id
}) => {
	return (
		<>
			<input
				checked={checked}
				onChange={onChange}
				id={id}
				type="checkbox"
				className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
			/>
			<label htmlFor={id} className="ml-2 text-sm font-medium text-white">
				{label}
			</label>
		</>
	);
};

export const XConfirmModal: FC<XConfirmModalProps> = ({
	children,
	header,
	content,
	position
}) => {
	const [visible, setVisible] = useState(false);

	const showConfirmModal = () => {
		setVisible(true);
	};

	const handleConfirm = () => {
		setVisible(false);

		// Trigger the onClick event of the button
		if (
			children &&
			isValidElement(children) &&
			children.props &&
			children.props.onClick
		) {
			children.props.onClick();
		}
	};

	const handleCancel = () => {
		setVisible(false);
	};

	return (
		<>
			{isValidElement(children) &&
				cloneElement(children, {
					position,
					onClick: showConfirmModal
				})}
			<Transition appear show={visible} as={React.Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleCancel}>
					<Transition.Child
						as={React.Fragment}
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
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-[30%] flex flex-col max-w-xl overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all text-white">
									{header && (
										<Dialog.Title
											as="h3"
											className="text-lg font-medium leading-6 border-[1px solid white]"
										>
											{header}
										</Dialog.Title>
									)}
									{content && (
										<Dialog.Description className="border-b-[1px] border-solid border-white] py-2">
											{content}
										</Dialog.Description>
									)}
									<div className="flex justify-end pt-2">
										<XButton onClick={handleConfirm} color="danger" rounded>
											Ok
										</XButton>
										<XButton onClick={handleCancel} color="info" rounded>
											Cancel
										</XButton>
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

export default XConfirmModal;
