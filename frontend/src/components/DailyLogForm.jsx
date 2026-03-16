import { useState } from "react";
import API from "../services/api";

function DailyLogForm({ onLogCreated, setIsModalOpen }) {

  const [status, setStatus] = useState("");
  const [trigger, setTrigger] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setIsModalOpen(false)
      await API.post("/logs/create", {
        status,
        trigger,
        notes
      });

      onLogCreated();


    } catch (error) {
      alert("Failed to create log");
    }
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center p-6"
      onClick={() => setIsModalOpen(false)}

    >

      <div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md"
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

          {/* Submit Button */}
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