import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../services/api";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      const token = res.data.token;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.userId);

      try {

        const profileRes = await API.get(`/profile/${res.data.userId}`);

        if (profileRes.data) {
          navigate("/dashboard");
        } else {
          navigate("/assessment");
        }

      } catch {
        navigate("/assessment");
      }

    } catch (error) {
      alert("Login failed");
    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#A8866B] p-4">

      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE FORM */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome back
          </h2>

          <p className="text-gray-500 mb-8">
            Please enter your details
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#A8866B]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#A8866B]"
            />

            <button
              type="submit"
              className="w-full bg-[#A8866B] text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              Login
            </button>

          </form>

        </div>


        {/* RIGHT SIDE DESIGN PANEL */}
        <div className="hidden md:flex md:w-1/2 bg-[#A8866B] items-center justify-center p-10">

          <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#A8866B] via-[#c4a48a] to-[#8c6c55] flex items-center justify-center">

            <h1 className="text-white text-4xl font-semibold text-center">
              Stay Focused
            </h1>

          </div>

        </div>

      </div>

    </div>

  );

}

export default LoginPage;