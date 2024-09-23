import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation.js";

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => { 
		if (!selectedConversation || !selectedConversation._id) {
			toast.error("No conversation selected.");
			return;
		}

		setLoading(true);
		try {
			const res = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials:"include",
				body: JSON.stringify({ message }),
			});

			if (!res.ok) {
				throw new Error("Failed to send message. Please try again.");
			}

			const data = await res.json();
			if (data.error) throw new Error(data.error);

			// Ensure immutability of messages state
			setMessages((prev) => [...prev, message]);
			console.log(messages);
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
