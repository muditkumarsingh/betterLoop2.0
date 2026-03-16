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
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
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
    <div className="relative min-h-screen flex items-center justify-center bg-stone-50 p-4 sm:p-8 overflow-hidden">
      
      {/* --- BACKGROUND BLOBS --- */}
      {/* NEW: Light Yellow/Amber Blob in the Top Left Corner */}
      <div className="absolute -top-[10%] -left-[5%] w-[40rem] h-[40rem] bg-amber-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-[pulse_6s_ease-in-out_infinite]"></div>
      
      {/* Primary Brand Color Blob */}
      <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-[#A8866B] rounded-full mix-blend-multiply filter blur-[120px] opacity-30 animate-pulse"></div>
      
      {/* Secondary Warm Amber Blob */}
      <div
        className="absolute bottom-[10%] right-[5%] w-[35rem] h-[35rem] bg-amber-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-[pulse_8s_ease-in-out_infinite_reverse]"
        style={{ animationDelay: "2s" }}
      ></div>
      
      {/* Center Soft Orange Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
      {/* ------------------------ */}

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-6xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row bg-white/40 backdrop-blur-2xl border border-white/60">
        
        {/* LEFT SIDE: FORM */}
        <div className="w-full md:w-5/12 p-10 md:p-14 flex flex-col justify-center bg-white/30">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Welcome back
            </h2>
            <p className="text-gray-500 mb-10 font-medium">
              Please enter your details to continue
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 focus:bg-white transition-all shadow-sm"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 focus:bg-white transition-all shadow-sm"
                />
              </div>

              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm font-semibold text-[#A8866B] hover:text-[#8c6c55] transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#A8866B] hover:bg-[#8c6c55] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#A8866B]/30 hover:shadow-[#A8866B]/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: FLOATING WIDGETS PANEL */}
        <div className="hidden md:flex md:w-7/12 p-4">
          <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-[#A8866B]/10 to-amber-600/5 flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-white/40">
            
            {/* Inner background lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A8866B]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

            {/* --- FLOATING UI WIDGETS (Updated for Light Mode) --- */}

            {/* Top Left: Streak Widget */}
            <div className="absolute top-[15%] left-[10%] w-48 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-xl transform -rotate-3 animate-[bounce_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-xl shadow-md text-white">🔥</div>
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Current Streak</p>
                  <p className="text-gray-900 text-xl font-black">24 Days</p>
                </div>
              </div>
            </div>

            {/* Top Right: Progress Ring Widget */}
            <div className="absolute top-[20%] right-[10%] w-52 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-xl transform rotate-6 animate-[bounce_5s_ease-in-out_infinite_reverse]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-[3px] border-gray-200 relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#A8866B]" style={{ clipPath: "polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%)" }}></div>
                  <span className="text-[#A8866B] font-bold text-sm">75%</span>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-bold">Daily Goal</p>
                  <p className="text-[#A8866B] text-xs font-semibold">Almost there!</p>
                </div>
              </div>
            </div>

            {/* Bottom Left: Clean Days Widget */}
            <div className="absolute bottom-[15%] left-[11%] w-44 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-xl transform rotate-3 animate-[bounce_4s_ease-in-out_infinite]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Clean Days</p>
                  <p className="text-gray-900 text-xl font-black">180</p>
                </div>
              </div>
            </div>

            {/* Bottom Right: Meditation Check Widget */}
            <div className="absolute bottom-[13%] right-[11%] w-56 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-xl transform -rotate-6 animate-[bounce_7s_ease-in-out_infinite_reverse]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white shadow-md shadow-indigo-500/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-gray-900 text-sm font-bold">Mindfulness</p>
                  <p className="text-indigo-500 text-xs font-semibold">15 min session done</p>
                </div>
              </div>
            </div>

            {/* --- CENTRAL TEXT --- */}
            <div className="relative z-10 text-center pointer-events-none mt-4">
              <h1 className="text-gray-800 text-5xl lg:text-6xl font-black tracking-tighter mb-4 drop-shadow-sm">
                Master Your<br/>Routine.
              </h1>
              <p className="text-gray-600 text-base lg:text-lg font-medium max-w-sm mx-auto leading-relaxed">
                Join thousands building better habits, conquering addictions, and taking back control.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;