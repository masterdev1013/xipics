import api from "@/configs/api";
import axios from "axios";

export async function fetchUser(token: string) {
	const res = await api.get("/auth/me", {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return res.data;
}
