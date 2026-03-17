const style = {``
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
            ``}