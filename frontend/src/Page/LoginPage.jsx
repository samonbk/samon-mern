import React, { useEffect, useState } from "react";
import { useLoged, useUserStore } from "../Store/Store";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { users, fetchUser } = useUserStore();
  const { loged, checkloged, setLogedIn } = useLoged();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkloged();
  }, [checkloged]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const user = users.find(
      (user) => user.name === name && user.password === password
    );

    if (user) {
      console.log(user);
      setLogedIn();
      alert("Successfully logged in");
      localStorage.setItem("islogedkey", user.name);
      navigate("/");
    } else {
      alert("User not found");
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-white">Log In</h1>
      <form onSubmit={onSubmit} className="mt-6">
        <div className="flex justify-between gap-2">
          <label className="text-gray-300 text-lg" htmlFor="name">
            Name:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="text"
            name="name"
            placeholder="User name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-2">
          <label className="text-gray-300 text-lg" htmlFor="password">
            Password:
          </label>
          <input
            className="w-[84%] h-8 rounded-lg px-2"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full h-8 mt-6 bg-slate-600 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
