import { useState, useRef, useEffect } from "react";
import API from "../services/api";

function RecoverySpacePage() {
    const [activity, setActivity] = useState("");
    const [seconds, setSeconds] = useState(120);
    const [running, setRunning] = useState(false);

    const [urgeSeconds, setUrgeSeconds] = useState(90);
    const [urgeRunning, setUrgeRunning] = useState(false);

    const [breathStep, setBreathStep] = useState("Ready");
    const [breathRunning, setBreathRunning] = useState(false);
    const [breathPhase, setBreathPhase] = useState(0); // 0=ready, 1=inhale, 2=hold, 3=exhale

    const intervalRef = useRef(null);
    const urgeIntervalRef = useRef(null);
    const breathIntervalRef = useRef(null);

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
            clearInterval(urgeIntervalRef.current);
            clearInterval(breathIntervalRef.current);
        };
    }, []);

    const startTimer = () => {
        if (running) return;
        setRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    setRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const resetTimer = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
        setSeconds(120);
    };

    const startUrgeSurfing = () => {
        if (urgeRunning) return;
        setUrgeRunning(true);
        urgeIntervalRef.current = setInterval(() => {
            setUrgeSeconds(prev => {
                if (prev <= 1) {
                    clearInterval(urgeIntervalRef.current);
                    setUrgeRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const resetUrgeSurfing = () => {
        clearInterval(urgeIntervalRef.current);
        setUrgeRunning(false);
        setUrgeSeconds(90);
    };

    const startBreathing = () => {
        if (breathRunning) return;
        setBreathRunning(true);
        const steps = [
            { label: "Inhale", phase: 1 },
            { label: "Hold", phase: 2 },
            { label: "Exhale", phase: 3 },
        ];
        let index = 0;
        setBreathStep(steps[index].label);
        setBreathPhase(steps[index].phase);
        index++;
        breathIntervalRef.current = setInterval(() => {
            setBreathStep(steps[index].label);
            setBreathPhase(steps[index].phase);
            index++;
            if (index >= steps.length) index = 0;
        }, 4000);
    };

    const stopBreathing = () => {
        clearInterval(breathIntervalRef.current);
        setBreathRunning(false);
        setBreathStep("Ready");
        setBreathPhase(0);
    };

    const getSuggestion = async () => {
        try {
            const res = await API.post("/recovery/suggestion");
            setActivity(res.data.suggestion);
        } catch {
            setActivity("Try taking a short walk outside or drinking a glass of cold water.");
        }
    };

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${s}s`;
    };

    const urgeProgress = ((90 - urgeSeconds) / 90) * 100;
    const meditProgress = ((120 - seconds) / 120) * 100;

    const breathColor = {
        0: "#c2a38a",
        1: "#7db88a",
        2: "#7aacc2",
        3: "#c2a38a",
    }[breathPhase];

    return (
        <div className="relative min-h-screen bg-[#fdf7f0] text-[#2c1a0e] px-4 py-8 sm:px-6 sm:py-12 font-sans">

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

                * { font-family: 'DM Sans', sans-serif; }

                @keyframes blob-drift-1 {
                    0% { transform: translate(0vw, 0vh) scale(1); }
                    33% { transform: translate(15vw, 20vh) scale(1.15); }
                    66% { transform: translate(-10vw, 10vh) scale(0.92); }
                    100% { transform: translate(0vw, 0vh) scale(1); }
                }
                @keyframes blob-drift-2 {
                    0% { transform: translate(0vw, 0vh) scale(1); }
                    33% { transform: translate(-20vw, 15vh) scale(1.1); }
                    66% { transform: translate(10vw, -15vh) scale(0.95); }
                    100% { transform: translate(0vw, 0vh) scale(1); }
                }
                @keyframes blob-drift-3 {
                    0% { transform: translate(0vw, 0vh) scale(1); }
                    50% { transform: translate(20vw, -20vh) scale(1.12); }
                    100% { transform: translate(0vw, 0vh) scale(1); }
                }
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-ring {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(1.35); opacity: 0; }
                }
                @keyframes breath-expand {
                    0% { transform: scale(0.85); }
                    50% { transform: scale(1.12); }
                    100% { transform: scale(0.85); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }

                .animate-blob-1 { animation: blob-drift-1 28s ease-in-out infinite alternate; }
                .animate-blob-2 { animation: blob-drift-2 34s ease-in-out infinite alternate; }
                .animate-blob-3 { animation: blob-drift-3 22s ease-in-out infinite alternate; }
                .fade-up { animation: fade-up 0.6s ease forwards; }
                .fade-up-1 { animation: fade-up 0.6s 0.1s ease both; }
                .fade-up-2 { animation: fade-up 0.6s 0.2s ease both; }
                .fade-up-3 { animation: fade-up 0.6s 0.3s ease both; }
                .fade-up-4 { animation: fade-up 0.6s 0.4s ease both; }
                .fade-up-5 { animation: fade-up 0.6s 0.5s ease both; }

                .card {
                    background: rgba(255,255,255,0.62);
                    backdrop-filter: blur(28px);
                    -webkit-backdrop-filter: blur(28px);
                    border: 1px solid rgba(255,255,255,0.85);
                    border-radius: 24px;
                    box-shadow: 0 4px 24px rgba(168,134,107,0.10), 0 1.5px 4px rgba(0,0,0,0.04);
                    transition: transform 0.25s ease, box-shadow 0.25s ease;
                }
                .card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 40px rgba(168,134,107,0.18), 0 2px 8px rgba(0,0,0,0.06);
                }

                .btn-primary {
                    background: linear-gradient(135deg, #c2955a 0%, #a8714a 100%);
                    color: white;
                    border-radius: 14px;
                    font-weight: 700;
                    font-size: 0.9rem;
                    letter-spacing: 0.02em;
                    padding: 12px 18px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 10px rgba(168,113,74,0.30);
                }
                .btn-primary:hover { filter: brightness(1.08); box-shadow: 0 4px 18px rgba(168,113,74,0.4); }
                .btn-primary:active { transform: scale(0.96); }
                .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; }

                .btn-ghost {
                    background: rgba(255,255,255,0.7);
                    color: #4a3728;
                    border: 1px solid rgba(44,26,14,0.12);
                    border-radius: 14px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    padding: 12px 18px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .btn-ghost:hover { background: rgba(255,255,255,0.92); border-color: rgba(44,26,14,0.22); }
                .btn-ghost:active { transform: scale(0.96); }

                .progress-track {
                    height: 6px;
                    background: rgba(44,26,14,0.09);
                    border-radius: 99px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    border-radius: 99px;
                    background: linear-gradient(90deg, #c2955a, #e8b88a);
                    transition: width 1s linear;
                }

                .breath-orb {
                    width: 88px;
                    height: 88px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    transition: background 1.2s ease;
                    position: relative;
                }
                .breath-orb-ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 2px solid currentColor;
                    animation: pulse-ring 2s ease-out infinite;
                }
                .breath-orb.breathing {
                    animation: breath-expand 4s ease-in-out infinite;
                }

                .card-title {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 1rem;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                    color: #2c1a0e;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding-bottom: 12px;
                    border-bottom: 1px solid rgba(44,26,14,0.08);
                    margin-bottom: 14px;
                }

                .big-num {
                    font-family: 'Playfair Display', serif;
                    font-size: 3.5rem;
                    font-weight: 800;
                    line-height: 1;
                    color: #2c1a0e;
                    letter-spacing: -0.03em;
                }

                .step-chip {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    padding: 8px 12px;
                    background: rgba(255,255,255,0.55);
                    border: 1px solid rgba(255,255,255,0.7);
                    border-radius: 12px;
                    font-size: 0.84rem;
                    font-weight: 500;
                    color: #4a3728;
                    margin-bottom: 6px;
                }
                .step-num {
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(135deg, #c2955a, #a8714a);
                    color: white;
                    border-radius: 50%;
                    font-size: 0.7rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 1px;
                }

                .activity-box {
                    background: linear-gradient(135deg, rgba(194,149,90,0.10), rgba(232,184,138,0.10));
                    border: 1px solid rgba(194,149,90,0.25);
                    border-radius: 14px;
                    padding: 14px 16px;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #2c1a0e;
                    line-height: 1.6;
                    margin-bottom: 14px;
                }

                .shimmer-btn {
                    background: linear-gradient(270deg, #c2955a, #e8b88a, #c2955a);
                    background-size: 300% 100%;
                    animation: shimmer 3s ease infinite;
                }
                .shimmer-btn:hover { filter: brightness(1.06); }

                @media (max-width: 640px) {
                    .big-num { font-size: 2.8rem; }
                    .breath-orb { width: 72px; height: 72px; }
                }
            `}</style>

            {/* Background blobs */}
            <div className="fixed top-[-15%] left-[-10%] w-[70vw] h-[70vw] bg-yellow-200 rounded-full blur-[100px] opacity-55 animate-blob-1 pointer-events-none z-0" />
            <div className="fixed bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] bg-orange-200 rounded-full blur-[100px] opacity-55 animate-blob-2 pointer-events-none z-0" />
            <div className="fixed top-[25%] left-[30%] w-[55vw] h-[55vw] bg-red-100 rounded-full blur-[120px] opacity-40 animate-blob-3 pointer-events-none z-0" />

            <div className="relative z-10 w-full max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10 fade-up">
                    <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur border border-white/80 rounded-full px-4 py-1.5 text-sm font-600 text-[#a8714a] mb-4 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#c2955a] inline-block"></span>
                        Recovery Space
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2c1a0e] leading-tight mb-3">
                        You've got this.
                    </h1>
                    <p className="text-[#6b4c35] text-base sm:text-lg font-medium max-w-md mx-auto leading-relaxed">
                        This space is here to help you reset whenever you feel triggered or overwhelmed.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Urge Surfing */}
                    <div className="card p-5 flex flex-col fade-up-1">
                        <div className="card-title">
                            <span className="text-lg">🚨</span> Urge Surfing
                        </div>
                        <p className="text-[#6b4c35] text-sm font-medium mb-4 leading-relaxed">
                            Feeling a craving? Ride it out — urges peak and pass within 90 seconds.
                        </p>

                        <div className="text-center mb-2">
                            <span className="big-num">{urgeSeconds}</span>
                            <span className="text-[#a8714a] font-700 text-lg ml-1">s</span>
                        </div>
                        <div className="progress-track mb-5">
                            <div className="progress-fill" style={{ width: `${urgeProgress}%` }} />
                        </div>

                        <div className="mb-5 space-y-1.5">
                            {["Take a slow, deep breath", "Notice the urge — don't judge it", "Watch the feeling rise and fall"].map((t, i) => (
                                <div key={i} className="step-chip">
                                    <span className="step-num">{i + 1}</span>
                                    <span>{t}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="btn-primary flex-1" onClick={startUrgeSurfing} disabled={urgeRunning}>
                                {urgeRunning ? "Running…" : "Start"}
                            </button>
                            <button className="btn-ghost flex-1" onClick={resetUrgeSurfing}>Reset</button>
                        </div>
                    </div>

                    {/* Breathing */}
                    <div className="card p-5 flex flex-col fade-up-2">
                        <div className="card-title">
                            <span className="text-lg">🌬</span> Breathing Exercise
                        </div>
                        <p className="text-[#6b4c35] text-sm font-medium mb-4 leading-relaxed">
                            Follow the rhythm below to calm your nervous system.
                        </p>

                        <div className="flex flex-col items-center justify-center flex-1 py-4">
                            <div
                                className={`breath-orb ${breathRunning ? "breathing" : ""}`}
                                style={{
                                    background: `radial-gradient(circle, ${breathColor}33, ${breathColor}99)`,
                                    color: breathColor,
                                    boxShadow: `0 0 30px ${breathColor}55`,
                                }}
                            >
                                {breathRunning && <div className="breath-orb-ring" />}
                                <span className="text-2xl">
                                    {{ 0: "🫁", 1: "🌿", 2: "✨", 3: "💨" }[breathPhase]}
                                </span>
                            </div>

                            <div
                                className="mt-4 text-2xl font-800 tracking-wide transition-all duration-700"
                                style={{ color: breathColor, fontFamily: "'Playfair Display', serif" }}
                            >
                                {breathStep}
                            </div>
                            {breathRunning && (
                                <p className="text-xs text-[#a8714a] mt-1 font-medium opacity-70">4 seconds per phase</p>
                            )}
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button className="btn-primary flex-1" onClick={startBreathing} disabled={breathRunning}>
                                {breathRunning ? "Breathing…" : "Start"}
                            </button>
                            <button className="btn-ghost flex-1" onClick={stopBreathing}>Stop</button>
                        </div>
                    </div>

                    {/* Meditation Timer */}
                    <div className="card p-5 flex flex-col fade-up-3">
                        <div className="card-title">
                            <span className="text-lg">🧘</span> Meditation Timer
                        </div>
                        <p className="text-[#6b4c35] text-sm font-medium mb-4 leading-relaxed">
                            Center yourself. Close your eyes and focus on your breath for 2 minutes.
                        </p>

                        <div className="text-center mb-2">
                            <span className="big-num">{formatTime(seconds)}</span>
                        </div>
                        <div className="progress-track mb-5">
                            <div className="progress-fill" style={{ width: `${meditProgress}%` }} />
                        </div>

                        <div className="bg-white/50 border border-white/70 rounded-2xl p-4 mb-5 text-sm text-[#6b4c35] font-medium leading-relaxed">
                            💭 <em>Focus only on your breath. Let each thought pass like a cloud.</em>
                        </div>

                        <div className="flex gap-3 mt-auto">
                            <button className="btn-primary flex-1" onClick={startTimer} disabled={running}>
                                {running ? "Meditating…" : "Start"}
                            </button>
                            <button className="btn-ghost flex-1" onClick={resetTimer}>Reset</button>
                        </div>
                    </div>

                    {/* AI Activity */}
                    <div className="card p-5 flex flex-col fade-up-4">
                        <div className="card-title">
                            <span className="text-lg">💡</span> AI Activity Suggestion
                        </div>
                        <p className="text-[#6b4c35] text-sm font-medium mb-4 leading-relaxed">
                            Need a healthy distraction? Let AI find the right activity for this moment.
                        </p>

                        {activity && (
                            <div className="activity-box">
                                <span className="text-[#c2955a] font-700 mr-1">→</span> {activity}
                            </div>
                        )}

                        <div className="mt-auto">
                            <button
                                className="btn-primary shimmer-btn w-full"
                                onClick={getSuggestion}
                            >
                                ✦ Get a Quick Activity
                            </button>
                        </div>
                    </div>

                    {/* Motivational Video — full width */}
                    <div className="card p-5 sm:col-span-2 fade-up-5">
                        <div className="card-title">
                            <span className="text-lg">🎥</span> Motivational Video
                        </div>
                        <p className="text-[#6b4c35] text-sm font-medium mb-4 leading-relaxed">
                            A short reminder that you're stronger than you think.
                        </p>
                        <div className="rounded-2xl overflow-hidden border border-white/50 shadow-sm aspect-video">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/ZXsQAXx_ao0"
                                title="Motivation"
                                frameBorder="0"
                                allowFullScreen
                            />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#b8957a] mt-8 font-medium opacity-70">
                    Take it one moment at a time. You're not alone. 🌿
                </p>
            </div>
        </div>
    );
}

export default RecoverySpacePage;