import React from "react";
import { FiChevronRight } from "react-icons/fi";

const NotificationItem = ({ isTodayLogAdded }) => {

  const bgColor = isTodayLogAdded
    ? "bg-green-100 hover:bg-green-200"
    : "bg-red-100 hover:bg-red-200";

  const iconColor = isTodayLogAdded ? "bg-green-500" : "bg-red-500";

  const message = isTodayLogAdded
    ? "Today's log has been added"
    : "Add today's log";

  return (
    <div className={`flex items-center justify-between transition p-4 rounded-xl ${bgColor}`}>

      <div className="flex items-center gap-3">

        <div className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl ${iconColor}`}>
          <span className="text-white font-bold text-xs sm:text-sm">O</span>
        </div>

        <p className="text-gray-700 text-xs sm:text-sm max-w-[180px] sm:max-w-xs">
          {message}
        </p>

      </div>

      <FiChevronRight className="text-gray-500 text-lg" />
    </div>
  );
};

export default NotificationItem;