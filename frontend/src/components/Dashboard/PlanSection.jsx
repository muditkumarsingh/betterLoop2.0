import React from 'react'
import DayContent from './DayContent'
import { useRef } from 'react'
import { useEffect } from 'react'

const PlanSection = ({ plan,setPlan }) => {

    const todayRef = useRef(null)

    useEffect(() => {
        if (todayRef.current) {
            todayRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }
    }, [])



    const firstIncompleteDay = plan.days?.find(day => !day.completed).day;

    console.log(plan)

    return (
        <div className='w-full h-[50vh] bg-red-100 px-5 mt-4 rounded-lg overflow-y-scroll scrollbar-hide pb-'>
            {plan.days?.map((item, index) => (
                <DayContent key={index} day={item} isToday={item.day===firstIncompleteDay} setPlan={setPlan} />
            ))}
        </div>
    )
}

export default PlanSection
