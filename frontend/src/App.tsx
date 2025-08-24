import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Applayout from "./layout";
import Landing from "./pages/landing/page";
import AuthLogic from "./pages/auth/AuthLogic";
import HackerNetworkPage from "./pages/HHRoom/HackerNetworkPage";
import { useEffect } from "react";
import socket from "./socket";
import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";
import Home from "./pages/home/Home";

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

export default function App() {
  const userId = "68a99f2cd7997fb3268e346d";
  useEffect(() => {
    if (userId) {
      socket.emit("join", userId);

      socket.on("receive_request", ({ senderId, requestId }) => {
        console.log("New connection request from:", senderId, requestId);
        // ✅ show toast or popup with "Accept / Reject" buttons
      });

      socket.on("request_accepted", ({ receiverId, roomId }) => {
        console.log(
          "Your request was accepted by:",
          receiverId,
          "Room:",
          roomId
        );
        // ✅ navigate to chat room page
      });

      socket.on("request_cancelled", ({ by, requestId }) => {
        console.log(`Request ${requestId} was cancelled by ${by}`);
        // ✅ update UI, remove from pending requests list
      });
    }

    return () => {
      socket.off("receive_request");
      socket.off("request_accepted");
    };
  }, [userId]);
  return <RouterProvider router={router} />;
}
