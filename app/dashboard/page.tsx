"use client";
import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import PromptTab from "@/components/admin/prompt/PromptTab";
import { classNames } from "@/utils/classnames";
import TemplateTab from "@/components/admin/template/TemplateTab";
import api from "@/configs/api";
import { useAppContext } from "@/context/AppContext";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function Page() {
	const [prompts, setPrompts] = useState<Prompt[]>([]);
	const [templates, setTemplates] = useState<Template[]>([]);
	const router = useRouter();
	const [context] = useAppContext();
	useEffect(() => {
		if (context.auth === null) return;
		getPrompts();
		getTemplates();
	}, []);

	const getPrompts = async () => {
		api
			.get("/prompts")
			.then(res => {
				const prompts = res.data as Prompt[];
				setPrompts(prompts);
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
				if (err.response?.status === 403) {
					router.push("/login");
				}
			});
	};

	const getTemplates = async () => {
		api
			.get("/templates")
			.then(res => {
				setTemplates(res.data);
			})
			.catch((err: AxiosError) => {
				toast.error(err.response?.data as string);
			});
	};

	return (
		<>
			<Head>
				<title>Xipics | Dashboard</title>
			</Head>
			<div className="flex w-full flex-col justify-around pt-10 lg:flex-row">
				<div className="w-full p-10 lg:w-4/5">
					<Tab.Group>
						<Tab.List className={"flex"}>
							<Tab
								key={1}
								className={({ selected }) =>
									classNames(
										"text-blue-700 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
										"ring-offset-blue-400 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
										selected
											? "bg-white shadow"
											: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
									)
								}
							>
								{"Prompt"}
							</Tab>
							<Tab
								key={2}
								className={({ selected }) =>
									classNames(
										"text-blue-700 w-full rounded-lg py-2.5 text-sm font-medium leading-5",
										"ring-offset-blue-400 ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2",
										selected
											? "bg-white shadow"
											: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
									)
								}
							>
								{"Template"}
							</Tab>
						</Tab.List>

						<Tab.Panel
							key={1}
							className={
								classNames()
								// 'rounded-xl bg-white p-3',
								// 'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
							}
						>
							<PromptTab
								prompts={prompts}
								setPrompts={setPrompts}
								setTemplates={setTemplates}
							/>
						</Tab.Panel>

						<Tab.Panel key={2} className={classNames()}>
							<TemplateTab
								prompts={prompts}
								templates={templates}
								setTemplates={setTemplates}
							/>
						</Tab.Panel>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}
