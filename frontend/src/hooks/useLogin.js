import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const login = async (username, password) => {
		const success = handleInputErrors(username, password);
		if (!success) return;
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ username, password }),
			});

			// Check if the response is successful
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Login failed");
			}

			// Assuming the response is JSON
			const data = await res.json();

			// Save user data to local storage
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);

			// Optional: success notification
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
	if (!username || !password) {
		toast.error("Please fill in all fields");
		return false;
	}
	return true;
}
