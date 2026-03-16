import React from 'react'
import NotificationItem from './NotificationItem'

const UserInfo = () => {
    return (

        <div className='flex flex-col lg:flex-row gap-4'>

            {/* Welcome Card */}
            <div className="w-full lg:flex-[3] bg-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm">

                {/* Left Section */}
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                        Hi, George!
                    </h1>

                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        What are we doing today?
                    </p>

                    {/* Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">

                        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                            <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                            Check Calendar
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            Manage Wallet
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                            <span className="w-3 h-3 rounded-full bg-pink-400"></span>
                            Manage Workers
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
                            <span className="w-3 h-3 rounded-full bg-indigo-400"></span>
                            Manage Projects
                        </div>

                    </div>
                </div>

                {/* Right Illustration */}
                <div className="mt-6 sm:mt-0">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                        alt="bear illustration"
                        className="w-28 sm:w-32 md:w-40"
                    />
                </div>

            </div>


            {/* Notifications */}
            <div className='w-full lg:flex-[1] flex flex-col gap-4'>

                <NotificationItem isTodayLogAdded={false} />

                <NotificationItem isTodayLogAdded={true} />

            </div>

        </div>
    )
}

export default UserInfo