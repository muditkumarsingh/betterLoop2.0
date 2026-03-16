import { useEffect, useState } from "react";
import DailyLogForm from "../components/DailyLogForm";
import API from "../services/api";
import ProgressStats from "../components/ProgressStats";
import AIChatWidget from "../components/AIChatWidget";
import PlanSection from "../components/Dashboard/PlanSection";
import HeroSection from "../components/Dashboard/HeroSection";

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
 
      <HeroSection motivation={plan?.motivation} goodHabit={plan?.goodHabit} planSteps={plan?.planSteps}/>

      {plan.days && plan.days.length > 0 ? (

        <PlanSection plan={plan} setPlan={setPlan} />
      ) : (<p>No daily plan available.</p>)}

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