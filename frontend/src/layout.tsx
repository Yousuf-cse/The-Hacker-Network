import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
}

export default Applayout;
