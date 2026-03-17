import { useState, useEffect } from "react";
import API from "../services/api";

function DailyLogForm({ onLogCreated, setIsModalOpen }) {

  const [status, setStatus] = useState("");
  const [trigger, setTrigger] = useState("");
  const [notes, setNotes] = useState("");

  // ✅ New fields
  const [triggerType, setTriggerType] = useState("other");
  const [urgeLevel, setUrgeLevel] = useState(1);
  const [mood, setMood] = useState("");
  const [completedPlan, setCompletedPlan] = useState(false);
  const [logTime, setLogTime] = useState("");

  // ✅ Auto-fill current time
  useEffect(() => {
    const now = new Date();
    const time = now.toTimeString().slice(0, 5);
    setLogTime(time);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsModalOpen(false);

      await API.post("/logs/create", {
        status,
        trigger,
        notes,
        triggerType,
        urgeLevel: Number(urgeLevel), // ✅ ensure number
        mood,
        completedPlan,
        logTime
      });

      onLogCreated();

    } catch (error) {
      alert("Failed to create log");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 "
      onClick={() => setIsModalOpen(false)}
    >

      <div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >

        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Log Today's Progress
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Status */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A8866B]"
            >
              <option value="">Select status</option>
              <option value="clean">Clean</option>
              <option value="trigger">Trigger</option>
              <option value="relapse">Relapse</option>
            </select>
          </div>

          {/* Trigger */}
          <div>
            <label className="text-sm text-gray-600">Trigger</label>
            <input
              placeholder="Trigger (optional)"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A8866B]"
            />
          </div>

          {/* Trigger Type */}
          <div>
            <label className="text-sm text-gray-600">Trigger Type</label>
            <select
              value={triggerType}
              onChange={(e) => setTriggerType(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300"
            >
              <option value="stress">Stress</option>
              <option value="boredom">Boredom</option>
              <option value="social">Social</option>
              <option value="habit">Habit</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Urge Level */}
          <div>
            <label className="text-sm text-gray-600">Urge Level (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={urgeLevel}
              onChange={(e) => setUrgeLevel(Number(e.target.value))}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300"
            />
          </div>

          {/* Mood */}
          <div>
            <label className="text-sm text-gray-600">Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300"
            >
              <option value="">Select mood</option>
              <option value="good">Good</option>
              <option value="neutral">Neutral</option>
              <option value="stressed">Stressed</option>
              <option value="sad">Sad</option>
            </select>
          </div>

          {/* Completed Plan */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completedPlan}
              onChange={(e) => setCompletedPlan(e.target.checked)}
            />
            <label className="text-sm text-gray-600">
              Completed Today's Plan
            </label>
          </div>

          {/* Log Time */}
          <div>
            <label className="text-sm text-gray-600">Log Time</label>
            <input
              type="time"
              value={logTime}
              onChange={(e) => setLogTime(e.target.value)}
              className="w-full mt-1 p-3 rounded-lg border border-gray-300"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-gray-600">Notes</label>
            <textarea
              placeholder="Write your notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="4"
              className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A8866B]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-[#A8866B] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Submit Daily Log
          </button>

        </form>
      </div>
    </div>
  );
}

export default DailyLogForm;