import React, { useRef, useState } from "react";

const HeroSection = ({ motivation, goodHabit, planSteps = [] }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
    setIsHovered(true);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle(
      "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  return ( 
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered ? "none" : "transform 0.4s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`
        relative w-full rounded-3xl p-6 md:p-8 
        bg-white/40 backdrop-blur-xl z-10
        border border-gray-200/60 shadow-[0_10px_40px_rgba(0,0,0,0.04)]
        overflow-hidden
      `}
    >
      {/* --- BACKGROUND BLOBS --- */}
      {/* Original Blobs */}
      <div className="absolute top-0 left-[10%] w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
      
      {/* New Blobs for a richer glass effect */}
      <div className="absolute -top-[10%] right-[20%] w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-[10%] left-[20%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      {/* ------------------------ */}
      
      {/* The Dynamic Glowing Orb */}
      <div
        className="pointer-events-none absolute rounded-full transition-opacity duration-500 ease-in-out"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(236,72,153,0.3) 50%, transparent 70%)",
          filter: "blur(50px)",
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          opacity: isHovered ? 1 : 0,
          zIndex: 0,
        }}
      />

      {/* Content Container */}
      <div 
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center" 
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Your Recovery Plan
          </h1>

          <div className="space-y-2">
            {motivation && (
              <p className="text-base text-gray-700 leading-snug">
                <span className="font-semibold text-indigo-600 mr-2">Motivation:</span>
                {motivation}
              </p>
            )}

            {goodHabit && (
              <p className="text-base text-gray-700 leading-snug">
                <span className="font-semibold text-pink-500 mr-2">Focus Habit:</span>
                {goodHabit}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Compact Plan Steps */}
        {planSteps && planSteps.length > 0 && (
          <div className="bg-white/60 rounded-xl p-5 border border-white/80 shadow-sm backdrop-blur-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Today's Action Plan
            </h3>
            <ul className="space-y-2">
              {planSteps.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start text-sm text-gray-700 font-medium bg-white/50 px-3 py-2 rounded-lg transition-colors hover:bg-white/90"
                >
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mr-3 mt-0.5 shadow-sm">
                    {index + 1}
                  </span>
                  <span className="leading-tight">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;