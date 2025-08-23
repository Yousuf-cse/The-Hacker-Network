import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Applayout from "./layout";
import Landing from "./pages/landing/page";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Applayout />}>
      <Route index element={<Landing />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
