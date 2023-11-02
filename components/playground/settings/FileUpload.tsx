import React, { FC } from "react";
import api from "@/configs/api";

interface FileUploadProps {
	selectedFile: string;
	setSelectedFile: (_val: string) => void;
}

const FileUpload: FC<FileUploadProps> = ({ selectedFile, setSelectedFile }) => {
	const handleFileChange = async (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.files && e.currentTarget.files.length > 0) {
			const file = e.currentTarget.files[0];
			const formData = new FormData();
			formData.append("file", file);
			// Call the function to upload the file
			try {
				const response = await api.post("/aws/img-upload", formData);
				if (response.data.s3_link) {
					setSelectedFile(response.data.s3_link); // Set selectedFile state with the URL of the uploaded image
				}
			} catch (error) {
				console.error(error);
			}
		}
		// else block removed
	};

	return (
		<>
			<div className="flex w-full items-center justify-center">
				<label
					htmlFor="dropzone-file"
					className="relative flex w-[500px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
				>
					{selectedFile ? (
						<img
							src={selectedFile}
							className="m-auto h-auto max-w-full object-cover"
							alt="Uploaded file"
						/>
					) : (
						<div className="flex flex-col items-center justify-center pb-6 pt-5">
							<svg
								className="mb-4 h-8 w-8 text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 16"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
								/>
							</svg>
							<p className="mb-2 text-sm text-gray-400">
								<span className="font-semibold">Click to upload</span>
							</p>
						</div>
					)}
					<input
						id="dropzone-file"
						type="file"
						className="hidden"
						onChange={handleFileChange}
					/>
				</label>
			</div>
		</>
	);
};

export default FileUpload;
