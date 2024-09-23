import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/auth/logout`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});

			// Check if the response is successful
			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Logout failed");
			}

			// Assuming the response is JSON
			const data = await res.json();

			// Clear user data from local storage
			localStorage.removeItem("chat-user");
			setAuthUser(null);

			// Optional: success notification
			toast.success("Logged out successfully");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};

export default useLogout;
