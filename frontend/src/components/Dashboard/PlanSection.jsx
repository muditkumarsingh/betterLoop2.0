import React, { useLayoutEffect } from 'react'
import DayContent from './DayContent'
import { useRef } from 'react'
import { useEffect } from 'react'

const PlanSection = ({ plan, setPlan }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const todayRef = useRef(null)
  console.log("Plan : ", plan);
  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      })
    }
  }, [])
  const updateItemStyles = () => {
    if (!containerRef.current || !itemRefs.current[0]) return;
    const container = containerRef.current;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrollProgress = scrollHeight > 0 ? container.scrollTop / scrollHeight : 0;
    const halfItemHeight = itemRefs.current[0].clientHeight / 2;
    const focusY = halfItemHeight + (container.clientHeight - halfItemHeight * 2) * scrollProgress;
    const absoluteFocusLine = container.scrollTop + focusY;
  };
  useLayoutEffect(() => {
    updateItemStyles();
  }, [plan]);

  //    const firstIncompleteDayObj = plan.find((day) => !day.completed);
  //   const firstIncompleteDay = firstIncompleteDayObj ? firstIncompleteDayObj.day : null;
  const firstIncompleteDay = plan.days?.find(day => !day.completed).day;
  const completedCount = plan?.days.filter((d) => d.completed).length;
  const totalCount = plan?.days.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  useEffect(() => {
    if (!firstIncompleteDay) return;
    const todayIndex = plan?.days.findIndex((item) => item.day === firstIncompleteDay);
    if (todayIndex !== -1) {
      // ✅ setTimeout ensures DOM is fully painted before scrolling
      setTimeout(() => {
        itemRefs.current[todayIndex]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        let startTime = performance.now();
        const animateScroll = (currentTime) => {
          updateItemStyles();
          if (currentTime - startTime < 1500) {
            requestAnimationFrame(animateScroll);
          }
        };
        requestAnimationFrame(animateScroll);
      }, 150);
    }
  }, [plan, firstIncompleteDay]);
  const handleScroll = () => {
    requestAnimationFrame(updateItemStyles);
  };

  const getDayColor = (item) => {
    if (item.completed) return "#22c55e";
    if (item.day === firstIncompleteDay) return "#ef4444";
    return "#d1d5db";
  };



  return (
    <div className="w-full mt-4">
      {/* Header */}
      <div className="px-1 mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-lg font-semibold text-gray-700 tracking-wide">Your Plan</span>
          <span className="text-sm font-bold text-gray-800">
            {completedCount}
            <span className="text-gray-400 font-normal">/{totalCount}</span>
          </span>
        </div>
        <div style={{ width: "100%", height: "6px", backgroundColor: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${progressPercent}%`, backgroundColor: "#22c55e", borderRadius: "999px", transition: "width 0.5s ease" }} />
        </div>
      </div>

      {/* Scrollable list */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full h-[60vh] bg-red-100 px-5 rounded-lg overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        {plan?.days.map((item, index) => {
          const color = getDayColor(item);
          return (
            <div
              key={`plan-item-${index}`}
              ref={(el) => (itemRefs.current[index] = el)}
              style={{
                transformOrigin: "center",
                position: "relative",
                borderLeft: `5px solid ${color}`,
                paddingLeft: "14px",
              }}
              // ✅ increased py so the card has vertical room and circle lands at true center
              className="py-4"
            >
              {/* Timeline circle */}
              <div
                style={{
                  position: "absolute",
                  left: "-8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%",
                  backgroundColor: color,
                  boxShadow: "0 0 0 2px white",
                }}
              />
              <DayContent key={index} day={item} isToday={item.day === firstIncompleteDay} setPlan={setPlan} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlanSection
