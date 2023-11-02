import React from "react";

interface PropsType {
	tempname: string;
	setTempName: (_val: string) => void;
}

const Templatename: React.FC<PropsType> = ({ setTempName }) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempName(e.target.value);
	};

	return (
		<>
			<div>
				<div className="inset-0 items-center">
					<input
						type="text"
						onChange={handleChange}
						className="border-primary focus-visible:ring-primary flex w-full items-center justify-between rounded-xl border-2 bg-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-100 focus-visible:transition-all"
					/>
				</div>
			</div>
		</>
	);
};

export default Templatename;
