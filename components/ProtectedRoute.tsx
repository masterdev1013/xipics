import React from "react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PropsType {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<PropsType> = ({ children }) => {
	const [context] = useAppContext();
	const { checkingStatus, auth } = context;
	const router = useRouter();

	React.useEffect(() => {
		if (auth === null) {
			toast.warning("You need to login first");
		}
	}, [auth]);

	if (checkingStatus) {
		return (
			<div
				style={{
					width: "100%",
					height: "100vh",
					display: "flex",
					alignItems: "center"
				}}
			>
				<Image
					src="/assets/happy-hacker.gif"
					style={{
						alignItems: "center",
						width: "150px",
						height: "150px",
						margin: "10px auto"
					}}
					alt="happy-hacker"
				/>
			</div>
		);
	}

	if (auth === null && window.location.pathname !== "/auth/login") {
		router.push("/auth/login");
	}
	return children;
};

export default ProtectedRoute;
