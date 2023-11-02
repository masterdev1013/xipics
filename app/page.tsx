"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
	const router = useRouter();
	useEffect(() => {
		router.push("/playground");
	}, []);
	return (
		<main className="flex min-h-screen select-none flex-row items-center justify-center p-2">
			<div className="relative flex w-full flex-col place-items-center space-y-2 text-center md:w-4/5 lg:w-3/5">
				<h1 className="mb-3 hidden text-2xl font-semibold md:visible">
					Xipics Platform
				</h1>
			</div>
		</main>
	);
}
