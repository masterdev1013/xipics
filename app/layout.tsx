"use client";
import React, { useEffect } from "react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { AppWrapper, useAppContext } from "@/context/AppContext";
import setAuthToken from "@/configs/setAuthToken";
import api from "@/configs/api";
import Header from "@/app/header";
import XLoading from "@/components/basic/XLoading";
import { XLoadingProvider, useXLoading } from "@/context/XLoadingContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
// 	title: "Xipics - swf & nsfw Image generator",
// 	description: "Generate the free image using AI"
// };

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<AppWrapper>
			<XLoadingProvider>
				<Main>{children}</Main>
			</XLoadingProvider>
		</AppWrapper>
	);
}

const Main = ({ children }: { children: React.ReactNode }) => {
	const [context, setContext] = useAppContext();
	const { stopLoading } = useXLoading();
	// Check and regenerate new JWT token
	useEffect(() => {
		const pathName = location.pathname;
		if (pathName === "/") {
			location.href = "/playground";
		}
		if (pathName !== "/login") {
			const xToken = localStorage.getItem("x-token");
			if (xToken) {
				setAuthToken(xToken);
				api
					.get("/auth")
					.then(response => {
						const user = response.data;
						setAuthToken(user.token);
						setContext({
							...context,
							auth: {
								isAuthenticated: true,
								token: xToken,
								user: user.user
							},
							checkingStatus: false
						});
						stopLoading();
					})
					.catch(error => {
						console.log(error);
					});
			} else {
				if (pathName !== "playground") {
					location.pathname = "/login";
				}
				location.href === "/playground";
				setContext({ ...context, checkingStatus: false });
			}
		} else {
			stopLoading();
			setContext({ ...context, checkingStatus: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html lang="en">
			<body className={inter.className}>
				<ToastContainer />
				<XLoading />
				<Header />
				{!context.checkingStatus && (
					<div className="container mx-auto">{children}</div>
				)}
			</body>
		</html>
	);
};
