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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Applayout />}>
      <Route index element={<Landing />} />
      <Route  path="/auth" element={<AuthLogic />} />
      <Route  path="/hacker-room" element={<HackerNetworkPage />} />

    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
