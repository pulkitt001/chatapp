import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages.js";

const Messages = () => {
	const { messages, loading } = useGetMessages(); // Default to empty array if messages is undefined
	useListenMessages();
	const lastMessageRef = useRef();

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
	// 	}, 100);
	// }, [messages]);

	console.log(messages);
	
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 &&
				messages.map((message, index) => (
					<div key={message._id || index} ref={lastMessageRef}>
					  <Message message={message} />
					</div>
				  ))
				  }

			{/* {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)} */}
		</div>
	);
};

export default Messages;
