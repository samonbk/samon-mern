import Navbar from "./Component/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="min-h-screen bg-slate-800 pt-20">
      <Navbar />
      <div className="mt-16 px-2 max-w-[920px] mx-auto">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
