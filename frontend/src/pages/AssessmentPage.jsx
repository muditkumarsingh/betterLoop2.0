import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaSpinner } from "react-icons/fa";

function AssessmentPage() {
  const navigate = useNavigate();

  // Step tracking & Loading
  const [step, setStep] = useState(1);
  const [makingPlan, setMakingPlan] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const totalSteps = 3;

  // Form State
  const [addictionType, setAddictionType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");
  const [triggers, setTriggers] = useState("");
  const [planDuration, setPlanDuration] = useState(30);

  // Clear errors when the user types
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  const handleNext = () => {
    // Validation: Step 1
    if (step === 1) {
      if (!addictionType.trim() || !frequency.trim()) {
        setErrorMsg("Please fill in both fields to continue.");
        return;
      }
    }

    // Validation: Step 2
    if (step === 2) {
      if (!duration.trim() || !triggers.trim()) {
        setErrorMsg("Please provide your duration and triggers.");
        return;
      }
    }

    setErrorMsg("");
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setErrorMsg("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Step 3 (Final Submit)
    if (!goal.trim()) {
      setErrorMsg("Please set a primary goal to generate your plan.");
      return;
    }

    setMakingPlan(true);
    setErrorMsg("");

    try {
      await API.post("/profile/create", {
        addictionType,
        frequency,
        duration,
        triggers: triggers.split(",").map((t) => t.trim()).filter(Boolean),
        goal,
        planDuration,
      });
      
      navigate("/dashboard");
    } catch (error) {
      setMakingPlan(false);
      setErrorMsg("Failed to generate your plan. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-stone-50 p-4 sm:p-8 overflow-hidden">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute -top-[10%] -left-[5%] w-[40rem] h-[40rem] bg-amber-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[#A8866B] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[10%] left-[20%] w-[35rem] h-[35rem] bg-orange-100 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>
      {/* ------------------------ */}

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/60 p-8 sm:p-12">
        
        {/* Progress Bar & Header */}
        <div className="mb-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Personalize Your Plan</h2>
              <p className="text-gray-500 font-medium mt-1">Let's tailor this journey to you.</p>
            </div>
            <span className="text-[#A8866B] font-bold bg-white/50 px-3 py-1 rounded-lg shadow-sm border border-white/60">
              Step {step} of {totalSteps}
            </span>
          </div>
          
          <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden border border-white/50">
            <div 
              className="bg-[#A8866B] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 min-h-[280px] flex flex-col justify-between">
          
          {/* --- STEP 1: The Basics --- */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">What brings you here?</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">What habit are you trying to break?</label>
                <input
                  type="text"
                  placeholder="e.g. Social media, Gaming, Junk food"
                  value={addictionType}
                  onChange={handleInputChange(setAddictionType)}
                  disabled={makingPlan}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">How often does this happen?</label>
                <input
                  type="text"
                  placeholder="e.g. Multiple times a day, Weekends"
                  value={frequency}
                  onChange={handleInputChange(setFrequency)}
                  disabled={makingPlan}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 transition-all shadow-sm"
                />
              </div>
            </div>
          )}

          {/* --- STEP 2: History & Triggers --- */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Understanding the pattern</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">How long has this been a challenge?</label>
                <input
                  type="text"
                  placeholder="e.g. 2 years, Since high school"
                  value={duration}
                  onChange={handleInputChange(setDuration)}
                  disabled={makingPlan}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">What usually triggers it? (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Stress, Boredom, Late nights"
                  value={triggers}
                  onChange={handleInputChange(setTriggers)}
                  disabled={makingPlan}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 transition-all shadow-sm"
                />
              </div>
            </div>
          )}

          {/* --- STEP 3: Goals & Timeline --- */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Setting your sights</h3>
              
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">What is your primary goal?</label>
                <input
                  type="text"
                  placeholder="e.g. Regain my focus, Feel healthier"
                  value={goal}
                  onChange={handleInputChange(setGoal)}
                  disabled={makingPlan}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Choose your recovery plan duration</label>
                <select
                  value={planDuration}
                  onChange={(e) => setPlanDuration(Number(e.target.value))}
                  disabled={makingPlan}
                  className="w-full bg-white/60 border border-white/60 rounded-2xl px-5 py-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#A8866B]/50 transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option value={30}>30 Days (Recommended start)</option>
                  <option value={45}>45 Days</option>
                  <option value={60}>60 Days (Deep reset)</option>
                </select>
              </div>
            </div>
          )}

          {/* Validation Error Message Space */}
          <div className="h-6">
            {errorMsg && (
              <p className="text-red-500 text-sm font-semibold text-center animate-fade-in">
                {errorMsg}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-2 mt-auto">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                disabled={makingPlan}
                className={`w-1/3 font-semibold py-4 rounded-2xl border border-white/60 shadow-sm transition-all duration-200 ${
                  makingPlan ? "bg-white/30 text-gray-400 cursor-not-allowed" : "bg-white/50 hover:bg-white/80 text-gray-700"
                }`}
              >
                Back
              </button>
            )}
            
            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#A8866B] hover:bg-[#8c6c55] text-white font-semibold py-4 rounded-2xl shadow-lg shadow-[#A8866B]/30 transition-all duration-200"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={makingPlan}
                className={`flex-1 flex items-center justify-center gap-3 font-semibold py-4 rounded-2xl shadow-lg transition-all duration-300 ${
                  makingPlan 
                  ? "bg-[#8c6c55] text-white/80 cursor-not-allowed shadow-none" 
                  : "bg-[#A8866B] hover:bg-[#8c6c55] text-white shadow-[#A8866B]/30 hover:-translate-y-0.5"
                }`}
              >
                {makingPlan ? (
                  <>
                    <FaSpinner className="animate-spin text-xl" />
                    Generating Plan...
                  </>
                ) : (
                  "Generate My Plan"
                )}
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

export default AssessmentPage;