import React, { ReactNode } from "react";
import Select from "react-select";

interface PropsType {
	multiple?: boolean;
	value?: Option[];
	defaultValue?: Option[];
	options: Option[];
	onChange?: (_var: any) => void;
	children?: ReactNode;
}

const CustomMultiSelect: React.FC<PropsType> = ({
	multiple = false,
	defaultValue = [],
	value = [],
	options,
	onChange: _onChange
}) => {
	return (
		<Select
			defaultValue={defaultValue}
			isMulti={multiple}
			name="colors"
			options={options}
			value={value}
			onChange={(_val: any[]) => {
				if (_onChange) {
					_onChange(_val);
				}
			}}
			className="mt-2 w-full"
			classNamePrefix="select"
			styles={{
				control: provided => ({
					...provided,
					backgroundColor: "#333",
					borderColor: "#555",
					color: "#fff",
					borderRadius: "0.375rem", // equivalent to rounded-lg
					padding: "0.5rem 1.25rem 0.5rem 0.75rem", // equivalent to py-2 pl-3 pr-10
					boxShadow:
						"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)" // equivalent to shadow-md
				}),
				singleValue: provided => ({
					...provided,
					color: "#fff"
				}),
				multiValue: provided => ({
					...provided,
					backgroundColor: "#666",
					color: "#fff"
				}),
				multiValueLabel: provided => ({
					...provided,
					color: "#fff"
				}),
				multiValueRemove: provided => ({
					...provided,
					color: "#fff",
					":hover": {
						backgroundColor: "#555",
						color: "#fff"
					}
				}),
				option: (provided, state) => ({
					...provided,
					backgroundColor: state.isSelected
						? "#FBBF24"
						: state.isFocused
						? "#4B5563"
						: "#333", // equivalent to bg-amber-100 and bg-gray-600
					color: state.isSelected ? "#1F2937" : "#fff", // equivalent to text-amber-900 and text-white
					padding: "0.5rem 1.25rem 0.5rem 2.5rem" // equivalent to py-2 pl-10 pr-4
				})
			}}
		/>
	);
};

export default CustomMultiSelect;
