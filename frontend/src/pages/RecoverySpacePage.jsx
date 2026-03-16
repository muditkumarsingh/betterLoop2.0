import { useState, useRef, useEffect } from "react";
import API from "../services/api";

function RecoverySpacePage() {

    const [activity, setActivity] = useState("");
    const [seconds, setSeconds] = useState(120);
    const [running, setRunning] = useState(false);
    const [urgeSeconds, setUrgeSeconds] = useState(90);
    const [urgeRunning, setUrgeRunning] = useState(false);

    const urgeIntervalRef = useRef(null);
    // const [addictionType, setAddictionType] = useState("");
    // const [focus, setFocus] = useState("");

    const intervalRef = useRef(null);

    const [breathStep, setBreathStep] = useState("Ready");
    const [breathRunning, setBreathRunning] = useState(false);

    const breathIntervalRef = useRef(null);

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

        const steps = ["Inhale", "Hold", "Exhale"];
        let index = 0;

        breathIntervalRef.current = setInterval(() => {

            setBreathStep(steps[index]);

            index++;

            if (index >= steps.length) index = 0;

        }, 4000);

    };

    const stopBreathing = () => {

        clearInterval(breathIntervalRef.current);
        setBreathRunning(false);
        setBreathStep("Ready");

    };

    // AI activity suggestion
    const getSuggestion = async () => {

        try {

            const res = await API.post("/recovery/suggestion");

            setActivity(res.data.suggestion);

        } catch (error) {

            console.error("Suggestion failed");

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h2>Today's Recovery Space</h2>

            <p>This space helps you reset when you feel triggered.</p>

            <hr />

            {/* Meditation Timer */}

            <h3>🧘 Meditation Timer</h3>

            <p>{seconds} seconds</p>

            <button onClick={startTimer}>Start</button>
            <button onClick={resetTimer}>Reset</button>

            <hr />

            {/* Motivational Video */}

            <h3>🎥 Motivational Video</h3>

            <iframe
                width="400"
                height="225"
                src="https://www.youtube.com/embed/ZXsQAXx_ao0"
                title="Motivation"
                frameBorder="0"
                allowFullScreen
            />

            <hr />

            {/* AI Activity */}

            <h3>💡 AI Suggested Activity</h3>

            <button onClick={getSuggestion}>
                Get Quick Activity
            </button>

            {activity && <p>{activity}</p>}

            <hr />

            <h3>🚨 Urge Surfing</h3>

            <p>If you're feeling a craving, ride it out for 90 seconds.</p>

            <p><b>{urgeSeconds} seconds</b></p>

            <button onClick={startUrgeSurfing}>
                Start Urge Surfing
            </button>

            <button onClick={resetUrgeSurfing}>
                Reset
            </button>

            <p style={{ marginTop: "10px" }}>
                1️⃣ Take a slow breath <br />
                2️⃣ Notice the urge without acting on it <br />
                3️⃣ Watch the urge rise and fall
            </p>
            <hr />

            <h3>🌬 Breathing Exercise</h3>

            <p><b>{breathStep}</b></p>

            <button onClick={startBreathing}>
                Start Breathing
            </button>

            <button onClick={stopBreathing}>
                Stop
            </button>

            <p>
                Follow the breathing rhythm to relax your mind.
            </p>
        </div>

    );

}

export default RecoverySpacePage;