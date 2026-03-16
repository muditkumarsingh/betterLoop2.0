import { useState } from "react";
import API from "../services/api";

function DailyLogForm({ onLogCreated }) {

  const [status, setStatus] = useState("");
  const [trigger, setTrigger] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/logs/create", {
        status,
        trigger,
        notes
      });

      onLogCreated(); // notify dashboard that log was created

    } catch (error) {

      alert("Failed to create log");

    }

  };

  return (

    <div>

      <h3>Log Today's Progress</h3>

      <form onSubmit={handleSubmit}>

        <label>Status</label>
        <br/>

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          required
        >

          <option value="">Select status</option>
          <option value="clean">Clean</option>
          <option value="trigger">Trigger</option>
          <option value="relapse">Relapse</option>

        </select>

        <br/><br/>

        <input
          placeholder="Trigger (optional)"
          value={trigger}
          onChange={(e)=>setTrigger(e.target.value)}
        />

        <br/><br/>

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Submit Daily Log
        </button>

      </form>

    </div>

  );

}

export default DailyLogForm;