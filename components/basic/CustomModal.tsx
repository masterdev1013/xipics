import React, { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface PropsType {
	onClose?: () => void;
	isOpen?: boolean;
	title?: ReactNode;
	children?: ReactNode;
}

const CustomModal: React.FC<PropsType> = ({
	isOpen = false,
	onClose,
	title = "",
	children
}) => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className="relative z-10"
				onClose={
					onClose
						? onClose
						: (_var: boolean) => {
								console.log(_var);
						  }
				}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-800/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-xl overflow-hidden rounded-2xl bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-white"
								>
									{title}
								</Dialog.Title>
								{children}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default CustomModal;
