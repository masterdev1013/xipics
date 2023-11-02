import React, { ReactNode } from "react";
import Icon from "@/components/Icon";

interface PropsType {
	onClick: () => void;
	loading?: boolean;
	disabled?: boolean;
	color?: "success" | "danger" | "primary" | "white" | "black";
	children?: ReactNode;
}

const CustomButton: React.FC<PropsType> = ({
	loading = false,
	onClick,
	disabled = false,
	color = "primary",
	children
}) => {
	const colorList = {
		primary: `${
			disabled ? "bg-indigo-950" : "bg-indigo-800 hover:bg-indigo-900"
		}`,
		success: "",
		danger: `bg-red-800 ${disabled ? "" : "hover:bg-red-900"}`,
		white: "",
		black: ""
	};

	return (
		<button
			type="button"
			className={`${colorList[color]} mt-2 inline-flex w-full justify-center rounded-md border border-transparent  px-4 py-2 text-sm text-gray-300  focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2`}
			onClick={onClick}
			disabled={disabled}
		>
			<div role="status">
				{loading === true ? (
					<div role="status">
						<Icon icon={"Loading"} />
						<span className="sr-only">Loading...</span>
					</div>
				) : (
					children
				)}
			</div>
		</button>
	);
};

export default CustomButton;
