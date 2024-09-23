import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		let socketInstance;

		if (authUser) {
			socketInstance = io("http://localhost:5000", {
				query: { userId: authUser._id },
				transports: ["websocket", "polling"], // Added polling as fallback
			});

			setSocket(socketInstance);

			socketInstance.on("connect", () => {
				console.log("Socket connected:", socketInstance.id);
			});

			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			socketInstance.on("connect_error", (err) => {
				console.error("Socket connection error:", err);
			});

			// Cleanup function to close the socket connection
			return () => {
				if (socketInstance) {
					socketInstance.off("getOnlineUsers");
					socketInstance.disconnect();
				}
				setSocket(null);
			};
		} else {
			// If there's no authUser, close the existing socket connection if it exists
			if (socket) {
				socket.disconnect();
				setSocket(null);
			}
		}
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
