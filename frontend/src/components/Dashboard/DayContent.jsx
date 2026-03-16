import React from "react";
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import API from "../../services/api";
import { FaPlus } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";
import { BsCheckCircleFill } from "react-icons/bs";

const DayContent = ({ isToday, day, setPlan }) => {
  let content;

  const isCompleted = day?.completed;

  const [isContentOpen, setIsContentOpen] = useState(false);

  const handleClick = (e) => {
    setIsContentOpen(!isContentOpen);
  };

  const fetchPlan = async () => {
    try {
      const userId = localStorage.getItem("userId");

      const res = await API.get(`/plan/${userId}`);

      setPlan(res.data);
    } catch (error) {
      console.error("Failed to fetch plan");
    }
  };

  if (isToday) {
    // setIsContentOpen(true)

    content = (
      <div className="flex justify-center items-center gap-2">
        {/* ✅ removed mt-4 — spacing now owned by PlanSection wrapper */}
        <div
          className="rounded-2xl p-4 flex-10 w-full"
          style={{
            background:
              "linear-gradient(135deg, #B8957A 0%, #A8866B 60%, #96735A 100%)",
            boxShadow: "0 4px 20px rgba(168, 134, 107, 0.35)",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-sm font-black tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
            >
              TODAY
            </span>
            <h3 className="text-white font-bold text-2xl tracking-wide">
              Day {day?.day}
            </h3>
          </div>

          <ul className="space-y-2 ml-1 mb-4">
            {day?.tasks.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-white text-base leading-snug"
              >
                <span
                  className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.7)" }}
                />
                {item}
              </li>
            ))}
          </ul>

          <div
            className="pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.2)" }}
          >
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={day?.completed}
                disabled={day?.completed}
                onChange={async () => {
                  try {
                    await API.patch(`/plan/day/${day.day}`);
                    fetchPlan();
                  } catch (error) {
                    console.error("Failed to update day status");
                  }
                }}
              />
              <div
                className="relative w-11 h-6 rounded-full transition-all duration-300"
                style={{
                  background: day?.completed
                    ? "rgba(134,239,172,0.9)"
                    : "rgba(255,255,255,0.25)",
                }}
              >
                <div
                  className="absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-all duration-300"
                  style={{ left: day?.completed ? "22px" : "3px" }}
                />
              </div>
              <span className="text-sm font-bold tracking-widest text-white uppercase">
                {day?.completed ? "Completed" : "Mark Done"}
              </span>
            </label>
          </div>
        </div>

        {/* ✅ removed mt-4 — both card and button now truly centered */}
        <div className="flex items-center justify-center flex-1">
          <button
            className="p-3 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #B8957A, #A8866B)",
              boxShadow: "0 2px 10px rgba(168,134,107,0.4)",
              minWidth: "44px",
              minHeight: "44px",
            }}
          >
            <FaPlus className="text-white text-base" />
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div className="flex justify-center items-center gap-2">
        {/* ✅ removed mt-4 */}
        <div
          className="rounded-2xl p-4 flex-10 w-full cursor-pointer transition-all duration-200"
          onClick={handleClick}
          style={{
            background: isCompleted
              ? "linear-gradient(135deg, #f0fdf4, #dcfce7)"
              : "white",
            boxShadow: isContentOpen
              ? "0 4px 16px rgba(0,0,0,0.10)"
              : "0 1px 4px rgba(0,0,0,0.06)",
            border: isCompleted ? "1px solid #bbf7d0" : "1px solid #f0f0f0",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {isCompleted && (
                <BsCheckCircleFill className="text-green-400 text-lg shrink-0" />
              )}
              <h3
                className="font-bold text-xl tracking-wide"
                style={{ color: isCompleted ? "#16a34a" : "#515151" }}
              >
                Day {day?.day}
              </h3>
              {isCompleted && (
                <span className="text-sm font-semibold text-green-500 bg-green-100 px-2 py-0.5 rounded-full">
                  Done
                </span>
              )}
            </div>
            <IoMdArrowDropdown
              className="text-gray-400 text-2xl transition-transform duration-300 shrink-0"
              style={{
                transform: isContentOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>

          <div
            className="overflow-hidden transition-all duration-300"
            style={{
              maxHeight: isContentOpen ? "400px" : "0px",
              opacity: isContentOpen ? 1 : 0,
            }}
          >
            <ul className="mt-3 space-y-2 ml-1">
              {day?.tasks.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-base leading-snug"
                  style={{ color: isCompleted ? "#0f0f0f" : "#626262" }}
                >
                  <span
                    className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: isCompleted ? "#4ade80" : "#d1d5db" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isCompleted && isContentOpen && (
          <div className="flex items-center justify-center flex-1">
            <button
              className="p-3 rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
              style={{
                background: "#f3f4f6",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              <CiCircleInfo className="text-gray-500 text-2xl font-bold" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return content;
};

export default DayContent;
