import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLoged } from "../Store/Store";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  const { loged, checkloged, setLogedIn, setLogedOut } = useLoged();

  useEffect(() => {
    checkloged();
  }, [checkloged]);

  // console.log(user);

  return (
    <>
      <nav className="w-full h-12 bg-slate-500 px-3 fixed top-0 shadow-md">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link to={"/"}>
            <h1 className="text-white text-2xl font-bold">Home</h1>
          </Link>
          <ul className=" text-white  h-12 text-xl font-bold flex items-center justify-end gap-5 ">
            <li>
              <Link to={"create"}>Create+</Link>
            </li>
            <li className="flex items-center gap-2">
              {!loged ? (
                <Link to={"login"}>Login</Link>
              ) : (
                localStorage.getItem("islogedkey")
              )}
              {loged ? (
                <div className="group relative">
                  <BsThreeDotsVertical />
                  <div className="group-hover:block hidden absolute top-3 left-0">
                    <button onClick={() => setLogedOut()}>logout</button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
