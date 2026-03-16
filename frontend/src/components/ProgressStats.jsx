import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import API from "../services/api";
import "../utils/heatmap.css";
import { Tooltip } from "react-tooltip";

function ProgressStats() {

  const [logs, setLogs] = useState([]);

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [cleanDays, setCleanDays] = useState(0);

  useEffect(() => {

    const fetchLogs = async () => {

      try {

        const userId = localStorage.getItem("userId");

        const res = await API.get(`/logs/${userId}`);

        const data = res.data;

        setLogs(data);

        calculateStats(data);

      } catch (error) {

        console.error("Failed to fetch logs");

      }

    };

    fetchLogs();

  }, []);

  const calculateStats = (logs) => {

    // Map for quick lookup
    const logMap = new Map();

    logs.forEach((log) => {
      logMap.set(log.date, log.status); // date already YYYY-MM-DD
    });

    // -------- CURRENT STREAK --------
    let current = 0;

    const today = new Date();

    for (let i = 0; i < 365; i++) {

      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);

      const key = checkDate.toISOString().split("T")[0];

      const status = logMap.get(key);

      if (!status || status === "relapse") break;

      current++;

    }

    // -------- LONGEST STREAK --------
    let longest = 0;
    let temp = 0;

    const sortedLogs = [...logs].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    for (let i = 0; i < sortedLogs.length; i++) {

      if (sortedLogs[i].status === "relapse") {

        temp = 0;
        continue;

      }

      if (i === 0) {

        temp = 1;

      } else {

        const prev = new Date(sortedLogs[i - 1].date);
        const curr = new Date(sortedLogs[i].date);

        const diff = (curr - prev) / (1000 * 60 * 60 * 24);

        if (diff === 1) {

          temp++;

        } else {

          temp = 1;

        }

      }

      if (temp > longest) longest = temp;

    }

    // -------- CLEAN DAYS --------
    const clean = logs.filter(log => log.status === "clean").length;

    setCurrentStreak(current);
    setLongestStreak(longest);
    setCleanDays(clean);

  };

  const heatmapData = logs.map((log) => ({
    date: log.date,
    count:
      log.status === "clean"
        ? 2
        : log.status === "trigger"
          ? 1
          : 0
  }));

  return (

    <div>

      <h2>Your Progress</h2>

      <p>🔥 Current Streak: {currentStreak}</p>
      <p>🏆 Longest Streak: {longestStreak}</p>
      <p>📊 Total Clean Days: {cleanDays}</p>

      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {

          if (!value) return "color-empty";

          if (value.count === 2) return "color-clean";

          if (value.count === 1) return "color-trigger";

          return "color-relapse";

        }}
        tooltipDataAttrs={(value) => {

          if (!value || !value.date) return null;

          let status = "No log";

          if (value.count === 2) status = "Clean";
          if (value.count === 1) status = "Trigger";
          if (value.count === 0) status = "Relapse";

          return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${value.date} — ${status}`
          };

        }}
      />

      <Tooltip id="heatmap-tooltip" />
      <div style={{ marginTop: "10px" }}>

        <span style={{ color: "#4caf50" }}>■ Clean</span>{" "}
        <span style={{ color: "#ff9800" }}>■ Trigger</span>{" "}
        <span style={{ color: "#f44336" }}>■ Relapse</span>

      </div>
    </div>

  );

}

export default ProgressStats;