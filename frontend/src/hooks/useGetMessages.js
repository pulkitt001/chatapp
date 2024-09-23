import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/getmessages/${selectedConversation._id}`);
				const data = await res.json();
				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading };
};
export default useGetMessages;


// import { useEffect, useState } from "react";
// import useConversation from "../zustand/useConversation";
// import toast from "react-hot-toast";

// const useGetMessages = () => {
// 	const [loading, setLoading] = useState(false);
// 	const { messages, setMessages, selectedConversation } = useConversation();

// 	useEffect(() => {
// 		const getMessages = async () => {
// 			if (!selectedConversation?._id) return; // Prevent fetch if no conversation is selected

// 			setLoading(true);
// 			try {
// 				const res = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/messages/getmessages/${selectedConversation._id}`,{
// 					credentials: "include",
// 				})
// 				if (!res.ok) {
// 					throw new Error(`Error: ${res.statusText}`);
// 				}
// 				const data = await res.json();
// 				if (data.error) throw new Error(data.error);
				
// 			} catch (error) {
// 				toast.error(`Failed to load messages: ${error.message}`);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		getMessages();
// 	}, [selectedConversation?._id, setMessages]);

// 	return { messages, loading };
// };

// export default useGetMessages;
