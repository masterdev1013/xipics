import React from "react";

interface PropsType {
	title: string;
	value?: string;
	defaultValue?: string;
	onChange?: (_var?: any) => void;
	row?: number;
}

const UserTextArea: React.FC<PropsType> = ({ title, value, onChange, row }) => {
	return (
		<>
			<p className="mb-3 text-white">{title}</p>
			<textarea
				rows={row ? row : 10}
				className="focus-visible:ring-primary h-[150px] w-full rounded-xl border-2 border-input-boarder bg-slate-700 p-3 text-sm text-white focus:outline-none focus-visible:ring-2 focus-visible:transition-all"
				value={value}
				onChange={onChange}
			/>
		</>
	);
};

export default UserTextArea;
