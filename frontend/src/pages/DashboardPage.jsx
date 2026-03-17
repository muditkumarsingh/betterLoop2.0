import { useEffect, useState } from "react";
import DailyLogForm from "../components/DailyLogForm";
import API from "../services/api";
import ProgressStats from "../components/ProgressStats";
import AIChatWidget from "../components/AIChatWidget";
import PlanSection from "../components/Dashboard/PlanSection";
import HeroSection from "../components/Dashboard/HeroSection";
import UserInfo from "../components/Dashboard/UserInfo";
import LogModal from "../components/LogModal";

function DashboardPage() {
  const [plan, setPlan] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlan = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await API.get(`/plan/${userId}`);
      setPlan(res.data);
    } catch (error) {
      console.error("Failed to fetch plan");
    }
  };

  const fetchTodayLog = async () => {
    try {
      const res = await API.get("/logs/today");
      setTodayLog(res.data);
    } catch (error) {
      console.error("Failed to fetch today's log");
    }
  };

  const handleLogCreated = () => {
    fetchTodayLog();
  };

  useEffect(() => {
    fetchPlan();
    fetchTodayLog();
  }, []);

  if (!plan) {
    return (
      <div className="dashboard-root">
        <BlobBackground />
        <div className="loading-state">
          <div className="loading-orb" />
          <p className="loading-text">Loading your recovery plan…</p>
        </div>

        <style>{dashboardStyles}</style>
      </div>
    );
  }

  return (
    <>
      <LogModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleLogCreated={handleLogCreated}
      />
      <div className="dashboard-root">
        <style>{dashboardStyles}</style>

        {/* ── Blob Background ── */}
        <BlobBackground />

        {/* ── Page Content ── */}
        <div className="dashboard-content">
          {/* UserInfo section */}
          <div className="section-wrap fade-up-1">
            <UserInfo
              todayLog={todayLog}
              setTodayLog={setTodayLog}
              handleLogCreated={handleLogCreated}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>

          {/* HeroSection */}
          <div className="section-wrap fade-up-2">
            <HeroSection
              motivation={plan?.motivation}
              goodHabit={plan?.goodHabit}
              planSteps={plan?.planSteps}
            />
          </div>

          {/* PlanSection */}
          <div className="section-wrap fade-up-3">
            {plan.days && plan.days.length > 0 ? (
              <PlanSection plan={plan} setPlan={setPlan} />
            ) : (
              <div className="empty-plan">
                <span className="empty-icon">📋</span>
                <p>No daily plan available yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────── Blob Background Component ─────────────── */
function BlobBackground() {
  return (
    <div className="blob-layer" aria-hidden="true">
      {/* Large blobs */}
      <div className="blob blob-lg blob-yellow blob-1" />
      <div className="blob blob-lg blob-orange blob-2" />
      <div className="blob blob-lg blob-red blob-3" />

      {/* Medium blobs */}
      <div className="blob blob-md blob-peach blob-4" />
      <div className="blob blob-md blob-amber blob-5" />

      {/* Small accent blobs */}
      <div className="blob blob-sm blob-yellow blob-6" />
      <div className="blob blob-sm blob-orange blob-7" />
      <div className="blob blob-sm blob-rose blob-8" />
      <div className="blob blob-sm blob-cream blob-9" />
      <div className="blob blob-sm blob-amber blob-10" />
    </div>
  );
}

/* ─────────────── Styles ─────────────── */
const dashboardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Root wrapper ── */
  .dashboard-root {
    position: relative;
    min-height: 100vh;
    background: #fdf7f0;
    overflow-x: hidden;
  }

  /* ── Blob layer ── */
  .blob-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
  }

  /* sizes */
  .blob-lg  { width: 55vw; height: 55vw; opacity: 0.55; filter: blur(110px); }
  .blob-md  { width: 28vw; height: 28vw; opacity: 0.45; filter: blur(70px); }
  .blob-sm  { width: 14vw; height: 14vw; opacity: 0.50; filter: blur(40px); }

  /* colors */
  .blob-yellow  { background: #fde68a; }
  .blob-orange  { background: #fed7aa; }
  .blob-red     { background: #fecaca; }
  .blob-peach   { background: #ffcba4; }
  .blob-amber   { background: #fbbf24; }
  .blob-rose    { background: #fda4af; }
  .blob-cream   { background: #fef3c7; }

  /* positions + animations */
  .blob-1  { top: -12%; left: -8%;    animation: drift1 26s ease-in-out infinite alternate; }
  .blob-2  { bottom: -14%; right: -10%; animation: drift2 32s ease-in-out infinite alternate; }
  .blob-3  { top: 28%; left: 22%;     animation: drift3 22s ease-in-out infinite alternate; }
  .blob-4  { top: 10%; right: 8%;     animation: drift4 18s ease-in-out infinite alternate; }
  .blob-5  { bottom: 15%; left: 6%;   animation: drift5 24s ease-in-out infinite alternate; }

  /* small blobs — scattered */
  .blob-6  { top: 5%;  left: 40%;  animation: sm1 14s ease-in-out infinite alternate; }
  .blob-7  { top: 55%; right: 5%;  animation: sm2 17s ease-in-out infinite alternate; }
  .blob-8  { bottom: 8%; left: 30%; animation: sm3 12s ease-in-out infinite alternate; }
  .blob-9  { top: 38%; right: 28%; animation: sm4 20s ease-in-out infinite alternate; }
  .blob-10 { bottom: 30%; right: 18%; animation: sm5 15s ease-in-out infinite alternate; }

  @keyframes drift1 {
    0%   { transform: translate(0,   0)   scale(1);    }
    33%  { transform: translate(12vw, 18vh) scale(1.1); }
    66%  { transform: translate(-8vw, 8vh)  scale(0.93);}
    100% { transform: translate(0,   0)   scale(1);    }
  }
  @keyframes drift2 {
    0%   { transform: translate(0,  0)   scale(1);   }
    33%  { transform: translate(-14vw, 12vh) scale(1.08);}
    66%  { transform: translate(8vw, -12vh) scale(0.95);}
    100% { transform: translate(0,  0)   scale(1);   }
  }
  @keyframes drift3 {
    0%   { transform: translate(0,  0) scale(1);   }
    50%  { transform: translate(16vw,-16vh) scale(1.12);}
    100% { transform: translate(0,  0) scale(1);   }
  }
  @keyframes drift4 {
    0%   { transform: translate(0, 0) scale(1);   }
    50%  { transform: translate(-10vw, 12vh) scale(1.15);}
    100% { transform: translate(0, 0) scale(1);   }
  }
  @keyframes drift5 {
    0%   { transform: translate(0, 0) scale(1);   }
    50%  { transform: translate(8vw, -14vh) scale(1.1);}
    100% { transform: translate(0, 0) scale(1);   }
  }
  @keyframes sm1 {
    0%   { transform: translate(0,0) scale(1);   }
    50%  { transform: translate(5vw, 8vh) scale(1.2);}
    100% { transform: translate(0,0) scale(1);   }
  }
  @keyframes sm2 {
    0%   { transform: translate(0,0) scale(1);   }
    50%  { transform: translate(-6vw, -10vh) scale(1.15);}
    100% { transform: translate(0,0) scale(1);   }
  }
  @keyframes sm3 {
    0%   { transform: translate(0,0) scale(1);   }
    50%  { transform: translate(7vw, -6vh) scale(1.1);}
    100% { transform: translate(0,0) scale(1);   }
  }
  @keyframes sm4 {
    0%   { transform: translate(0,0) scale(1);   }
    50%  { transform: translate(-4vw, 9vh) scale(1.18);}
    100% { transform: translate(0,0) scale(1);   }
  }
  @keyframes sm5 {
    0%   { transform: translate(0,0) scale(1);   }
    50%  { transform: translate(8vw, 5vh) scale(0.9);}
    100% { transform: translate(0,0) scale(1);   }
  }

  /* ── Page content ── */
  .dashboard-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 28px 16px 60px;
  }

  @media (min-width: 640px) {
    .dashboard-content {
      padding: 36px 24px 72px;
    }
  }

  /* ── Section wrappers ── */
  .section-wrap {
    margin-bottom: 20px;
  }

  /* ── Fade-up animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up-1 { animation: fadeUp 0.55s 0.05s ease both; }
  .fade-up-2 { animation: fadeUp 0.55s 0.18s ease both; }
  .fade-up-3 { animation: fadeUp 0.55s 0.30s ease both; }

  /* ── Empty plan state ── */
  .empty-plan {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 36px 20px;
    background: rgba(255,255,255,0.60);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.80);
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(168,134,107,0.10);
    color: #6b4c35;
    font-size: 0.95rem;
    font-weight: 500;
  }
  .empty-icon { font-size: 2rem; }

  /* ── Loading state ── */
  .loading-state {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    gap: 16px;
  }
  .loading-orb {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c2955a, #e8b88a);
    animation: pulse-orb 1.6s ease-in-out infinite;
    box-shadow: 0 0 24px rgba(194,149,90,0.4);
  }
  @keyframes pulse-orb {
    0%, 100% { transform: scale(1);    opacity: 1;   }
    50%       { transform: scale(1.18); opacity: 0.7; }
  }
  .loading-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    color: #a8714a;
    letter-spacing: 0.01em;
  }

  /* ── Shared card style (for child components that use .dash-card) ── */
  .dash-card {
    background: rgba(255,255,255,0.62);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255,255,255,0.85);
    border-radius: 22px;
    box-shadow: 0 4px 24px rgba(168,134,107,0.10), 0 1px 4px rgba(0,0,0,0.04);
    padding: 20px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .dash-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 36px rgba(168,134,107,0.17), 0 2px 8px rgba(0,0,0,0.05);
  }

  /* ── Shared button styles ── */
  .btn-primary {
    background: linear-gradient(135deg, #c2955a 0%, #a8714a 100%);
    color: #fff;
    border: none;
    border-radius: 13px;
    padding: 11px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(168,113,74,0.28);
    transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .btn-primary:hover  { filter: brightness(1.08); box-shadow: 0 4px 18px rgba(168,113,74,0.38); }
  .btn-primary:active { transform: scale(0.96); }

  .btn-ghost {
    background: rgba(255,255,255,0.72);
    color: #4a3728;
    border: 1px solid rgba(44,26,14,0.12);
    border-radius: 13px;
    padding: 11px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }
  .btn-ghost:hover  { background: rgba(255,255,255,0.92); border-color: rgba(44,26,14,0.22); }
  .btn-ghost:active { transform: scale(0.96); }

  /* ── Typography helpers ── */
  .display-heading {
    font-family: 'Playfair Display', serif;
    font-weight: 800;
    color: #2c1a0e;
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
  .section-heading {
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    color: #2c1a0e;
    letter-spacing: -0.01em;
  }
  .body-text {
    font-size: 0.9rem;
    font-weight: 500;
    color: #6b4c35;
    line-height: 1.65;
  }
  .label-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.85);
    border-radius: 99px;
    padding: 4px 12px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #a8714a;
    letter-spacing: 0.02em;
  }

  /* ── Progress bar ── */
  .progress-track {
    height: 6px;
    background: rgba(44,26,14,0.08);
    border-radius: 99px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, #c2955a, #e8b88a);
    transition: width 0.9s ease;
  }

  /* ── Divider ── */
  .dash-divider {
    border: none;
    border-top: 1px solid rgba(44,26,14,0.07);
    margin: 14px 0;
  }

  /* ── Responsive tweaks ── */
  @media (max-width: 480px) {
    .blob-sm  { width: 22vw; height: 22vw; }
    .blob-md  { width: 38vw; height: 38vw; }
  }
`;

export default DashboardPage;
