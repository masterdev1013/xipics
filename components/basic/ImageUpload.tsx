import Image from "next/image";
import React, { useState } from "react";

interface PropsType {
	onImageSelect: (_var: File) => void;
	src?: string;
	componentId: string;
}

const ImageUpload: React.FC<PropsType> = ({
	onImageSelect,
	src,
	componentId
}) => {
	const [selectedImage, setSelectedImage] = useState<
		string | ArrayBuffer | null
	>(null);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const file = e.target.files[0];

			if (file) {
				const reader = new FileReader();

				reader.onload = event => {
					if (event.target === null) {
						return;
					}
					setSelectedImage(URL.createObjectURL(file));
					onImageSelect(file); // Pass the selected image to the parent component
				};
				reader.readAsDataURL(file);
			} else {
				setSelectedImage(null);
			}
		}
	};

	return (
		<div className="flex w-full items-center justify-center my-4">
			<label
				htmlFor={componentId}
				className="relative flex w-[500px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-700"
			>
				{selectedImage ? (
					<Image
						src={selectedImage as string}
						alt="Selected"
						className="m-auto h-auto max-w-full object-cover"
						width={300}
						height={100}
					/>
				) : src ? (
					<Image
						// src={src[0] === "/" ? src : "/" + src}
						src={src}
						className="m-auto h-auto max-w-full object-cover"
						width={300}
						height={300}
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
					id={componentId}
					type="file"
					className="hidden"
					accept={"image/*"}
					onChange={handleImageChange}
				/>
			</label>
		</div>
	);
};

export default ImageUpload;
