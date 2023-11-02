"use client";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import api from "@/configs/api";
import Link from "next/link";

interface SignUpData {
	name: string;
	email: string;
	password: string;
	password1: string;
}

export default function Page() {
	const router = useRouter();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [password1, setPassword1] = useState<string>("");

	const handleSignUp = async (e: FormEvent) => {
		e.preventDefault();
		const data: SignUpData = {
			name: "harry",
			email,
			password,
			password1
		};

		try {
			const res = await api.post("/auth/signup", data);
			if (res.data?.status === 200) {
				toast.success(res.data?.message);
				router.push("/login");
			} else {
				toast.warn(res.data?.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<ToastContainer />
			<div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
				<div className="w-full rounded-lg border border-gray-700 bg-gray-800 shadow sm:max-w-md md:mt-0 xl:p-0">
					<div className="space-y-4 p-6 sm:p-8 md:space-y-6">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
							Register User
						</h1>
						<form
							className="group space-y-4 md:space-y-6"
							onSubmit={handleSignUp}
							noValidate
						>
							<div>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-white"
								>
									User email
									<input
										type="email"
										name="email"
										id="email"
										value={email}
										onChange={e => setEmail(e.target.value)}
										className="placeholder:text-text-gray-400 focus-outline-none focus-visible-ring-2 focus-visible-ring-primary/100 focus-visible-transition-all block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white
										"
										placeholder="name@company.com"
										pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
										required
									/>
									<span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
										Please enter a valid email address
									</span>
								</label>
							</div>
							<div>
								<label
									htmlFor="password"
									className="mb-2 block text-sm font-medium text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									value={password}
									onChange={e => setPassword(e.target.value)}
									className="placeholder:text-text-gray-400 focus-visible:ring-primary/100 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white focus:outline-none focus-visible:ring-2 focus-visible:transition-all"
									pattern=".{7,}"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="mb-2 block text-sm font-medium text-white"
								>
									Confirm password
								</label>
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									placeholder="••••••••"
									value={password1}
									onChange={e => setPassword1(e.target.value)}
									className="focus-visible:ring-primary/100 block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:transition-all"
									required
								/>
							</div>
							<button
								type="submit"
								className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-800"
							>
								Register account
							</button>
							<p className="text-sm font-light text-gray-400">
								Already have an account?{" "}
								<Link
									href="/login"
									className="font-medium text-primary-500 hover:underline"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
