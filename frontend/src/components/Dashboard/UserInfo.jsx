import React from 'react'
import NotificationItem from './NotificationItem'
import RiskSummary from './RiskSummary'

const UserInfo = ({ todayLog, setTodayLog, handleLogCreated }) => {

    console.log(todayLog)
    return (

        <div className='flex flex-col md:flex-row gap-4 mb-4'>

            {/* Welcome Card */}
            <div className="w-full lg:flex-[3] bg-gray-100 rounded-2xl p-6 flex flex-col  sm:flex-row items-center justify-between shadow-sm">

                {/* Left Section */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Hi, George!
                    </h1>

                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        What are we doing today?
                    </p>

                    {/* Actions */}
                    <div className="mt-5 bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full max-w-sm">

                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Today's Log
                        </h3>

                        <div className="flex flex-col gap-2 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span className={`font-medium ${todayLog?.status === "success"
                                        ? "text-green-600"
                                        : todayLog?.status === "failed"
                                            ? "text-red-600"
                                            : "text-gray-700"
                                    }`}>
                                    {todayLog?.status || "Not Logged"}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Trigger</span>
                                <span className="text-gray-700">
                                    {todayLog?.trigger || "None"}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-gray-500">Notes</span>
                                <span className="text-gray-700 text-xs mt-1">
                                    {todayLog?.notes || "No notes added"}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Illustration */}
                <div className="hidden md:block mt-6 sm:mt-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                        alt="bear illustration"
                        className="w-28 sm:w-32 md:w-40"
                    />
                </div>

                <div className='flex-1 md:hidden'></div>

            </div>


            {/* Notifications */}
            <div className='flex-1 flex flex-col gap-4 flex flex-col'>

                <NotificationItem isTodayLogAdded={todayLog} handleLogCreated={handleLogCreated}/>

                <RiskSummary/>

            </div>

        </div>
    )
}

export default UserInfo