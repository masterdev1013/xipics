import React from "react";

const icons = {
	TwoDice: (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="dice"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 640 512"
			width={"30px"}
			color="#fff"
		>
			<path
				fill="currentColor"
				d="M252.3 11.7c-15.6-15.6-40.9-15.6-56.6 0l-184 184c-15.6 15.6-15.6 40.9 0 56.6l184 184c15.6 15.6 40.9 15.6 56.6 0l184-184c15.6-15.6 15.6-40.9 0-56.6l-184-184zM248 224c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24zM96 248c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm128 80c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm128-80c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zM224 72c13.3 0 24 10.7 24 24s-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24zm96 392c0 26.5 21.5 48 48 48H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H472.5c13.4 26.9 8.8 60.5-13.6 82.9L320 413.8V464zm160-88c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24z"
			></path>
		</svg>
	),
	QuestionMark: (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="circle-question"
			className="svg-inline--fa fa-circle-question z-10"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 512 512"
			color="#fff"
			style={{ paddingLeft: "4px", paddingTop: "4px" }}
		>
			<path
				fill="currentColor"
				d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
			></path>
		</svg>
	),
	RightArrow: (
		<svg viewBox="0 0 24 24" fill="none">
			<path
				d="M9 5l7 7-7 7"
				stroke="#fff"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
	Search: (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-search"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
			<path d="M21 21l-6 -6"></path>
		</svg>
	),
	Loading: (
		<svg
			aria-hidden="true"
			className="mr-2 inline h-4 w-4 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
			viewBox="0 0 100 101"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
				fill="currentColor"
			/>
			<path
				d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
				fill="currentFill"
			/>
		</svg>
	),
	DropdownIcon: (
		<svg
			className="w-2.5 h-2.5 ml-2.5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 10 6"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m1 1 4 4 4-4"
			/>
		</svg>
	)
};

interface IconType {
	icon: keyof typeof icons;
	className?: string;
	$width?: number;
	$height?: number;
	$color?: string;
}

const Icon: React.FC<IconType> = ({ icon, className, ...rest }) => {
	return (
		<div
			className={`inline-flex items-center justify-center ${
				className ?? className
			}`}
			{...rest}
		>
			{icons[icon]}
		</div>
	);
};

export default Icon;
