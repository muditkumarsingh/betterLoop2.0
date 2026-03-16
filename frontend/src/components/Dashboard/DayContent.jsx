import React from 'react'
import { useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import API from '../../services/api';



const DayContent = ({ isToday, day ,setPlan}) => {
    let content;

    const isCompleted = day?.completed

    const [isContentOpen, setIsContentOpen] = useState(false)

    const handleClick = (e) => {
        setIsContentOpen(!isContentOpen)
    }

    const fetchPlan = async () => {

        try {

            const userId = localStorage.getItem("userId");

            const res = await API.get(`/plan/${userId}`);
    
            setPlan(res.data);

        } catch (error) {

            console.error("Failed to fetch plan");

        }

    };

    console.log(day.day)

    if (isToday) {

        // setIsContentOpen(true)

        content = (
            <div className='flex justify-center items-center'>
                <div className='mt-4 bg-[#A8866B] rounded-xl p-4 flex-3 md:flex-10 '>
                    <h3 className='text-white font-bold text-lg'>DAY {day?.day}</h3>
                    <ul className='mt-3 ml-4'>
                        {day?.tasks.map((item, index) => (
                            <li
                                key={index}
                                className='text-white'
                            >{item}</li>
                        ))}
                    </ul>
                    <div className='mt-3'>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <span className="text-sm font-bold text-white">TASK COMPLETE</span>
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={day?.completed}
                                disabled={day?.completed}
                                onChange={async () => {
                                    try {
                                        await API.patch(`/plan/day/${day.day}`);
                                        // refresh plan after update
                                        fetchPlan();
                                    } catch (error) {
                                        console.error("Failed to update day status ",error.message);
                                    }
                                }}
                            />
                            <div className="relative w-11 h-6 bg-gray-300 rounded-full  
                                peer-checked:bg-green-500        after:content-[''] after:absolute after:top-[2px] after:left-[2px]        after:bg-white after:h-5 after:w-5 after:rounded-full        after:transition-all peer-checked:after:translate-x-full">
                            </div>
                        </label>
                    </div>
                </div>

                <div className=' flex items-center justify-center flex-1'>
                    <div
                        className='bg-[#A8866B] p-2 w-15 h-15 rounded-lg flex items-center justify-center'
                    >
                        <FaPlus className='text-white' />
                    </div>
                </div>
            </div>
        )
    } else {
        content = (
            <div className='flex justify-center items-center'>

                <div className='mt-4 bg-white rounded-xl p-4 flex-3 md:flex-10 ' onClick={handleClick}>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-[#515151] font-bold text-lg'>DAY {day?.day}</h3>
                        <IoMdArrowDropdown />
                    </div>

                    <div
                        className={` ${isContentOpen ? "block" : "hidden"} `}
                    >
                        <ul className='mt-3 ml-4'>
                            {day?.tasks.map((item, index) => (
                                <li
                                    key={index}
                                    className='text-[#626262]'
                                >{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                {isCompleted && isContentOpen && (
                    <div className=' flex items-center justify-center flex-1'>
                        <div
                            className='bg-[#D9D9D9] text-black p-2 w-15 h-15 rounded-lg flex items-center justify-center'
                        >
                            <CiCircleInfo className='font-bold text-2xl' />
                        </div>
                    </div>
                )}

            </div>
        )
    }






    return content
}

export default DayContent
