import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="w-full bg-slate-500 px-3 fixed top-0 shadow-md">
        <ul className=" text-white  h-12 text-xl font-bold flex items-center  gap-5 max-w-[920px] mx-auto justify-between">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"create"}>Create+</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
