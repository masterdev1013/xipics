"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import api from "@/configs/api";
import setAuthToken from "@/configs/setAuthToken";
import isEmpty from "is-empty";
import { XButton, XCard, XInput } from "@/components/basic/XC";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

interface LoginState {
	email: string;
	password: string;
}

export default function Page() {
	const router = useRouter();
	const initialLogin: LoginState = {
		email: "",
		password: ""
	};
	const [loginState, setLoginState] = useState<LoginState>(initialLogin);
	const [context, setContext] = useAppContext();

	useEffect(() => {
		localStorage.removeItem("x-token");
	}, []);

	const handleSignIn = (e: FormEvent) => {
		e.preventDefault();
		api
			.post("/auth/login", loginState)
			.then(res => {
				if (res.status === 200) {
					const token = res.data.token;
					if (isEmpty(token)) {
						toast.warning("Token is empty. Please retry");
						return;
					}
					localStorage.setItem("x-token", token);
					setAuthToken(token);
					setContext({
						...context,
						auth: { token: token, user: res.data.user, isAuthenticated: true }
					});
					toast.success("Successfully signed in");
					if (res.data.user.isAdmin) {
						router.push("/dashboard");
					} else {
						router.push("/playground");
					}
				} else {
					toast.warning(res.data.message);
				}
			})
			.catch(err => {
				toast.error(err.response.data.message);
			});
	};

	return (
		<>
			<ToastContainer />
			<XCard
				title={
					<h1 className="text-center text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
						Sign in to your account
					</h1>
				}
			>
				<form
					className="space-y-4 md:space-y-6 flex flex-col"
					onSubmit={handleSignIn}
				>
					<div>
						<XInput
							label="Email"
							type="text"
							name="email"
							value={loginState.email}
							onChange={e =>
								setLoginState({ ...loginState, email: e.target.value })
							}
							placeholder="Your Email"
							block
						/>
						<XInput
							label="Password"
							type="password"
							name="password"
							placeholder="••••••••"
							value={loginState.password}
							onChange={e =>
								setLoginState({ ...loginState, password: e.target.value })
							}
							block
						/>
					</div>
					<XButton type="submit" block rounded>
						Sign in
					</XButton>
					<Link
						href={"/playground"}
						className="text-[13px] text-right hover:underline text-[primary] items-end text-[#ffffff]"
					>
						Back to home
					</Link>
				</form>
			</XCard>
		</>
	);
}
