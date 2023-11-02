import React from "react";
import Icon from "./Icon";

export default function SerachInput() {
	return (
		<div className="border-[1px] focus:border-[#635bff]">
			<input className="outline-none" />
			<button>
				<Icon icon={"Search"} />
			</button>
		</div>
	);
}
