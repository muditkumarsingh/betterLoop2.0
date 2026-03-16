import { useEffect, useState, useRef } from "react";
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
  
  const scrollRef = useRef(null);

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

  // Auto-scroll to the far right (Current Month) on load
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [logs]);

  const calculateStats = (logs) => {
    const logMap = new Map();
    logs.forEach((log) => {
      logMap.set(log.date, log.status);
    });

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

    let longest = 0;
    let temp = 0;
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
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

    const clean = logs.filter((log) => log.status === "clean").length;
    setCurrentStreak(current);
    setLongestStreak(longest);
    setCleanDays(clean);
  };

  const heatmapData = logs.map((log) => ({
    date: log.date,
    count: log.status === "clean" ? 2 : log.status === "trigger" ? 1 : 0,
  }));

  const getLast12Months = () => {
    const months = [];
    const today = new Date();
    for (let i = 11; i >= 0; i--) {
      const year = today.getFullYear();
      const month = today.getMonth() - i;
        
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 0);
      
      const monthName = start.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      months.push({ start, end, id: `month-${i}`, monthName });
    }
    return months;
  };

  const monthRanges = getLast12Months();

  return (
    // Responsive padding and spacing: p-4 on mobile, p-6 on tablet/desktop
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
      
      <div>
        {/* Responsive text sizing */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Your Progress</h2>
        <p className="text-sm md:text-base text-gray-500 mt-1 md:mt-2">Every day is a step forward. Keep up the great work!</p>
      </div>

      {/* Grid shifts from 1 column (mobile) to 3 columns (desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl p-5 md:p-6 border border-orange-100 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
          <span className="text-2xl md:text-3xl mb-2">🔥</span>
          <p className="text-xs md:text-sm font-semibold text-orange-600 uppercase tracking-wider mb-1">Current Streak</p>
          <p className="text-3xl md:text-4xl font-black text-orange-700">{currentStreak}</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl p-5 md:p-6 border border-indigo-100 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
          <span className="text-2xl md:text-3xl mb-2">🏆</span>
          <p className="text-xs md:text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-1">Longest Streak</p>
          <p className="text-3xl md:text-4xl font-black text-indigo-700">{longestStreak}</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-5 md:p-6 border border-emerald-100 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 duration-300">
          <span className="text-2xl md:text-3xl mb-2">📊</span>
          <p className="text-xs md:text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-1">Total Clean Days</p>
          <p className="text-3xl md:text-4xl font-black text-emerald-700">{cleanDays}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800">Activity Map</h3>
            {/* Mobile-only swipe hint */}
            <p className="text-xs text-gray-400 mt-1 md:hidden">Swipe to see past months →</p>
          </div>

          {/* flex-wrap ensures the legend doesn't break out of the box on small phones */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm font-medium text-gray-600 bg-gray-50 px-3 py-2 md:px-4 md:py-2 rounded-full w-fit">
            <div className="flex items-center gap-1.5 md:gap-2"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-[#4caf50]"></span> Clean</div>
            <div className="flex items-center gap-1.5 md:gap-2"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-[#ff9800]"></span> Trigger</div>
            <div className="flex items-center gap-1.5 md:gap-2"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-sm bg-[#f44336]"></span> Relapse</div>
          </div>
        </div>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-auto gap-3 md:gap-4 pb-4 custom-heatmap-container snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth"
        >
          {monthRanges.map((monthRange, index) => (
            <div 
              key={monthRange.id} 
              // Adjusted width for mobile vs desktop for a tighter feel
              className={`flex flex-col items-center flex-shrink-0 w-[100px] md:w-[120px] snap-end ${index !== 0 ? 'hide-y-axis' : ''}`}
            >
              <span className="text-xs md:text-sm font-bold text-gray-400 mb-1 md:mb-2">{monthRange.monthName}</span>
              
              {/* Height scales slightly down on mobile */}
              <div className="h-[85px] md:h-[105px] [&>svg]:h-full [&>svg]:w-auto">
                <CalendarHeatmap
                  startDate={monthRange.start}
                  endDate={monthRange.end}
                  values={heatmapData}
                  showMonthLabels={false} 
                  showWeekdayLabels={true} 
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
                      "data-tooltip-content": `${value.date} — ${status}`,
                    };
                  }}
                />
              </div>
            </div>
          ))}
          <Tooltip id="heatmap-tooltip" className="!bg-gray-800 !text-white !rounded-lg !px-3 !py-2 !text-xs md:text-sm font-medium !shadow-xl z-50" />
        </div>
      </div>
    </div>
  );
}

export default ProgressStats;