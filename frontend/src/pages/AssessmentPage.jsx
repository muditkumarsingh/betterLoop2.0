import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AssessmentPage() {

  const navigate = useNavigate();

  const [addictionType, setAddictionType] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [goal, setGoal] = useState("");
  const [triggers, setTriggers] = useState("");
  const [planDuration, setPlanDuration] = useState(30);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/profile/create", {
        addictionType,
        frequency,
        duration,
        triggers: triggers.split(","),
        goal
      });

      navigate("/dashboard");

    } catch (error) {

      alert("Failed to create profile");

    }

  };

  return (

    <div>

      <h2>Addiction Assessment</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Addiction Type (e.g. social media)"
          value={addictionType}
          onChange={(e)=>setAddictionType(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Frequency (e.g. multiple times a day)"
          value={frequency}
          onChange={(e)=>setFrequency(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Duration (e.g. 2 years)"
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
        />

        <br/><br/>

        <input
          placeholder="Triggers (comma separated)"
          value={triggers}
          onChange={(e)=>setTriggers(e.target.value)}
        />

        <h3>Recovery Plan Duration</h3>

        <select
          value={planDuration}
          onChange={(e) => setPlanDuration(Number(e.target.value))}
        >

          <option value={30}>30 Days</option>
          <option value={45}>45 Days</option>
          <option value={60}>60 Days</option>

        </select>
        <br/><br/>

        <input
          placeholder="Goal"
          value={goal}
          onChange={(e)=>setGoal(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Generate My Recovery Plan
        </button>

      </form>

    </div>

  );

}

export default AssessmentPage;