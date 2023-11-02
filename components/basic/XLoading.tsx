import React from "react";
import "@/styles/loading.css";
import { useXLoading } from "@/context/XLoadingContext";

export default function XLoading() {
	const { isLoading } = useXLoading();
	return (
		<div
			className={`w-[100vw] h-[100vh] bg-[rgb(0,0,0)] fixed z-[99999] ${
				!isLoading && "hidden"
			}`}
		>
			<div id="loading-page">
				<div className="loading-icon one"></div>
				<div className="loading-icon two"></div>
				<div className="loading-icon three"></div>
			</div>
		</div>
	);
}
