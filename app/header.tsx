import React, { FC, Fragment, ReactNode, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { XButton } from "@/components/basic/XC";
import Icon from "@/components/Icon";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const routes = [
	{
		path: "/dashboard",
		label: "Dashboard",
		admin: true
	},
	{
		path: "/dashboard/models",
		label: "Models",
		admin: true
	},
	{
		path: "/dashboard/users",
		label: "Users",
		admin: true
	}
];

export default function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const [context, setContext] = useAppContext();
	const [dropdownState, setDropdownState] = useState<boolean>(false);

	if (pathname === "/login") {
		return null;
	}

	const handleLogOut = () => {
		localStorage.removeItem("x-token");
		setContext({ ...context, auth: null });
		location.href = "/login";
	};

	const handleDropdownToggle = () => {
		setDropdownState(!dropdownState);
	};

	return (
		<header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-2 bg-gray-800 sticky top-0">
			<nav
				className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between container"
				aria-label="Global"
			>
				<div className="flex items-center justify-between">
					<Link
						className="flex-none text-xl font-semibold text-white"
						href="/playground"
					>
						Xipics
					</Link>
					<div className="sm:hidden">
						<XButton
							onClick={handleDropdownToggle}
							className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium   shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-blue-600 transition-all text-sm bg-slate-900 hover:bg-slate-800 border-gray-700 text-gray-400 dark:hover:text-white focus:ring-offset-gray-800"
						>
							<Icon icon={"DropdownIcon"} />
						</XButton>
					</div>
				</div>
				{context.auth ? (
					<Menu as="div" className="relative inline-block text-left">
						<Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
							{context.auth.user.email}
							<ChevronDownIcon
								className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
								aria-hidden="true"
							/>
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y bg-primary rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-white">
								<div className="px-1 py-1">
									<MenuItem
										href="/playground"
										onClick={() => setDropdownState(false)}
									>
										Playground
									</MenuItem>
								</div>
								<div className="px-1 py-1">
									{context.auth.user.isAdmin &&
										routes
											.filter(i => i.admin)
											.map((r, i) => (
												<MenuItem
													key={`navbar-${i}`}
													onClick={() => setDropdownState(false)}
													href={r.path}
												>
													{r.label}
												</MenuItem>
											))}
								</div>
								<div className="px-1 py-1">
									<MenuItem href={"#"} onClick={handleLogOut}>
										Log Out
									</MenuItem>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				) : (
					<XButton
						onClick={() => router.push("/login")}
						rounded
						className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white"
					>
						Log In
					</XButton>
				)}
			</nav>
		</header>
	);
}

interface MenuItemProps {
	children?: ReactNode;
	href: string;
	onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ children, onClick, href }) => {
	return (
		<Menu.Item>
			<Link
				href={href}
				className="w-full px-4 py-2 hover:bg-primary-100 block rounded-md my-1"
				onClick={onClick}
			>
				{children && children}
			</Link>
		</Menu.Item>
	);
};
