import { useEffect, useState } from "react";
import DailyLogForm from "../components/DailyLogForm";
import API from "../services/api";
import ProgressStats from "../components/ProgressStats";
import AIChatWidget from "../components/AIChatWidget";
import PlanSection from "../components/Dashboard/PlanSection";

function DashboardPage() {

  const [plan, setPlan] = useState(null);
  const [todayLog, setTodayLog] = useState(null);

  // fetch recovery plan
  const fetchPlan = async () => {

    try {

      const userId = localStorage.getItem("userId");

      const res = await API.get(`/plan/${userId}`);

      setPlan(res.data);

    } catch (error) {

      console.error("Failed to fetch plan");

    }

  };

  // fetch today's log
  const fetchTodayLog = async () => {

    try {

      const res = await API.get("/logs/today");

      setTodayLog(res.data);

    } catch (error) {

      console.error("Failed to fetch today's log");

    }

  };

  // this runs after the form submits
  const handleLogCreated = () => {

    fetchTodayLog();

  };

  // run when dashboard loads
  useEffect(() => {

    fetchPlan();
    fetchTodayLog();

  }, []);

  console.log(plan)

  if (!plan) {
    return <h2>Loading your recovery plan...</h2>;
  }

  return (

    <div>

      <h2>Your Recovery Plan</h2>

      <h3>Motivation</h3>
      <p>{plan.motivation}</p>

      <h3>Good Habit</h3>
      <p>{plan.goodHabit}</p>

      <h3>Plan Steps</h3>

      <ul>
        {plan.planSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <hr />


      {plan.days && plan.days.length > 0 ? (

        <PlanSection plan={plan} setPlan={setPlan} />
      ) : (<p>No daily plan available.</p>)}


      {/* <h3>Daily Plan</h3>

      {plan.days && plan.days.length > 0 ? (

        <div>

          {plan.days.map((day) => (

            <div key={day.day} style={{ marginBottom: "15px" }}>

              <h4>Day {day.day}</h4>

              <ul>
                {day.tasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>

              <p>
                Status: {day.completed ? "Completed ✅" : "Not completed"}
              </p>

              <label>
                <input
                  type="checkbox"
                  checked={day.completed}
                  disabled={day.completed}
                  onChange={async () => {

                    try {

                      await API.patch(`/plan/day/${day.day}`);

                      // refresh plan after update
                      fetchPlan();

                    } catch (error) {

                      console.error("Failed to update day status");

                    }

                  }}
                />

                {day.completed ? " Completed ✅" : " Mark as completed"}

              </label>
            </div>

          ))}

        </div>

      ) : (

        <p>No daily plan available.</p>

      )} */}
      <hr />

      <h2>Daily Progress</h2>

      {todayLog ? (

        <div>

          <h3>Today's Log</h3>

          <p>Status: {todayLog.status}</p>
          <p>Trigger: {todayLog.trigger}</p>
          <p>Notes: {todayLog.notes}</p>

        </div>

      ) : (

        <DailyLogForm onLogCreated={handleLogCreated} />

      )}

      <hr />

      {/* <AIChatWidget /> */}
    </div>

  );

}

export default DashboardPage;