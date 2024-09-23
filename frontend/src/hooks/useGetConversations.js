import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/user/getuser");
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const useGetConversations = () => {
// 	const [loading, setLoading] = useState(false);
// 	const [conversations, setConversations] = useState([]);
// 	const [error, setError] = useState(null); // Added state for error handling

// 	useEffect(() => {
// 		const getConversations = async () => {
// 			setLoading(true);
// 			setError(null); // Reset error state

// 			try {
				
				
// 				const res = await fetch(`${import.meta.env.VITE_LOCAL_HOST}/api/user/getuser`,{
// 					method:"GET",
// 					credentials:"include",
// 					headers:{"Content-Type":"Application/json"},
				
// 				})
// 				//console.log(res);
				
// 				if (!res.ok) {
// 					// Handle HTTP errors (non-200 responses)
// 					throw new Error(`HTTP error! Status: ${res.status}`);
// 				}
// 				//console.log("aa rhia");
				
// 				const data = await res.json();
// 				console.log(data);
// 				console.log("enmtet");
				
// 				if (!Array.isArray(data)) {
// 					// Ensure data is an array
// 					throw new Error('Expected an array of conversations.');
// 				}
// 				console.log(data);
				
// 				setConversations(data);
// 			} catch (error) {
// 				setError(error.message); // Set error message to state
// 				toast.error(error.message); // Display error message
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		getConversations();
// 	}, []);

// 	return { loading, conversations, error }; // Return error state
// };

// export default useGetConversations;
