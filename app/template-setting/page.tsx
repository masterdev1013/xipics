"use client";
import React from "react";

export default function Page() {
	return (
		<div className="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
			<ul className="-mb-px flex flex-wrap">
				<li className="mr-2">
					<a
						href="#"
						className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
					>
						Profile
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#"
						className="active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500"
						aria-current="page"
					>
						Dashboard
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#"
						className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
					>
						Settings
					</a>
				</li>
				<li className="mr-2">
					<a
						href="#"
						className="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
					>
						Contacts
					</a>
				</li>
				<li>
					<a className="inline-block cursor-not-allowed rounded-t-lg p-4 text-gray-400 dark:text-gray-500">
						Disabled
					</a>
				</li>
			</ul>
		</div>
	);
}
