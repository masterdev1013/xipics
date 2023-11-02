import React from "react";

interface PropsType {
	label?: string;
	value: string;
	placeholder?: string;
	onChange: (_val: string) => void;
	className?: string;
}

const UserInputArea: React.FC<PropsType> = ({
	label,
	value,
	placeholder = "",
	onChange,
	className = ""
}) => {
	return (
		<>
			{label && <p className="my-3 text-white">{label}</p>}
			<input
				type="text"
				value={value}
				placeholder={placeholder}
				onChange={e => {
					onChange(e.target.value);
				}}
				className={`focus-visible:ring-primary flex w-full items-center justify-between rounded-xl border-2 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-100 focus-visible:transition-all ${className}`}
			/>
		</>
	);
};

export default UserInputArea;
