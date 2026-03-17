import React from "react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import LogModal from "../LogModal";

const NotificationItem = ({ isTodayLogAdded, handleLogCreated,isModalOpen,setIsModalOpen }) => {

    // const [isModalOpen, setIsModalOpen] = useState(false)

    const bgColor = isTodayLogAdded
        ? "bg-green-100 hover:bg-green-200"
        : "bg-red-100 hover:bg-red-200";

    const iconColor = isTodayLogAdded ? "bg-green-500" : "bg-red-500";

    const message = isTodayLogAdded
        ? "Today's log has been added"
        : "Add today's log";

    const handleClick = () => {
        if (!isTodayLogAdded) {
            setIsModalOpen(true)
        }
    }


    return (
        <>
            {/* <LogModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleLogCreated={handleLogCreated} /> */}
            <div className={`flex-1 flex items-center justify-between transition p-4 rounded-xl ${bgColor}`}
                onClick={handleClick}
            >

                <div className="flex items-center gap-3">

                    <div className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl ${iconColor}`}>
                        <span className="text-white font-bold text-xs sm:text-sm">O</span>
                    </div>

                    <p className="text-gray-700 text-xs sm:text-sm max-w-[180px] sm:max-w-xs">
                        {message}
                    </p>

                </div>

                <FiChevronRight className="text-gray-500 text-lg" />
            </div>

        </>
    );
};

export default NotificationItem;