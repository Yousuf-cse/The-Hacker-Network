import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

import Applayout from "./layout";
import Landing from "./pages/landing/page";
import AuthLogic from "./pages/auth/AuthLogic";
import HackerNetworkPage from "./pages/HHRoom/HackerNetworkPage";
import Home from "./pages/home/Home";

import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";
import socket from "./socket";

import {
  NotificationProvider,
  useNotifications,
} from "@/contexts/NotificationContext";
import { toast } from "sonner";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Applayout />}>
      <Route index element={<PublicRoute element={<Landing />} />} />
      <Route path="auth" element={<PublicRoute element={<AuthLogic />} />} />
      <Route
        path="hacker-room"
        element={<PrivateRoute element={<HackerNetworkPage />} />}
      />
      <Route path="home" element={<PrivateRoute element={<Home />} />} />
    </Route>
  )
);

function SocketHandler() {
  const { addNotification } = useNotifications();
  const userId = Cookies.get("_id");

  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    const handleReceiveRequest = (request: any) => {
      console.log("Full connection request received:", request);
      toast(`New connection request from ${request.senderName}`);

      // Use requestId and senderId only
      if (request?.requestId && request?.senderId) {
        addNotification(request.requestId, request.senderId);
      }
    };

    const handleRequestAccepted = (response: any) => {
      console.log("Full request accepted data:", response);
      toast(`${response.receiverName} accepted your request`);

      // If needed, also track as notification
      if (response?.requestId && response?.receiverId) {
        addNotification(response.requestId, response.receiverId);
      }
    };

    socket.on("receive_request", handleReceiveRequest);
    socket.on("request_accepted", handleRequestAccepted);

    return () => {
      socket.off("receive_request", handleReceiveRequest);
      socket.off("request_accepted", handleRequestAccepted);
    };
  }, [userId, addNotification]);

  return null;
}

export default function App() {
  return (
    <NotificationProvider>
      <SocketHandler />
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}
