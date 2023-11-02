import Link from "next/link";
import Image from "next/image";
import React from "react";

interface PropsType {
	loadingState: boolean;
	output: string[];
	width: number;
	height: number;
}

const Output: React.FC<PropsType> = ({
	loadingState,
	output,
	width,
	height
}) => {
	return (
		<>
			<div className="w-full p-20 md:w-1/2">
				<p className="mb-3 text-2xl text-white">Output</p>
				<div className="flex h-96 w-full justify-center rounded-xl shadow-md ">
					{loadingState === true ? (
						<div className="flex h-96 w-full animate-pulse items-center justify-center rounded-xl bg-gray-700 shadow-md">
							<div>
								<div className="flex flex-col">
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="image"
										className="svg-inline--fa fa-image fa-2x "
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										color="white"
									>
										<path
											fill="currentColor"
											d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
										></path>
									</svg>
								</div>
								<div className="mt-2 flex flex-col">
									<svg
										className="h-5 animate-spin text-white"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								</div>
							</div>
						</div>
					) : (
						<div>
							{Array.isArray(output) && output.length !== 0 ? (
								output.map(url => (
									<Link
										key={url}
										href={url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Image
											src={url}
											alt="output"
											className="mb-2 flex justify-center"
											width={width}
											height={height}
										/>
									</Link>
								))
							) : (
								<>
									<div className="mb-2 mt-10 flex justify-center">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											focusable="false"
											data-prefix="fas"
											data-icon="dice"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											className="h-8 w-8 text-slate-600"
										>
											<rect
												width="18"
												height="18"
												x="3"
												y="3"
												rx="2"
												ry="2"
											></rect>
											<circle cx="9" cy="9" r="2"></circle>
											<path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
										</svg>
									</div>
									<div className="flex justify-center">
										<p className="chakra-text css-0 text-white">No Images</p>
									</div>
									<div className="mt-2 flex flex-col text-sm text-slate-600">
										<p className="chakra-text css-0">
											Generated images will appear here
										</p>
									</div>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Output;
