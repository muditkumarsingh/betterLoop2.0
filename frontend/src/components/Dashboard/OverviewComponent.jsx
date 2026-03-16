import React from 'react'

const OverviewComponent = ({}) => {
    return (
        <div className='p-4 bg-[#A8866B] rounded-xl flex items-center justify-center gap-5 w-fit mx-auto '>
            <div className='bg-white w-15 h-15 rounded-lg'>
            </div>
            <div className='flex flex-col p-0'>
                <h3 className='text-[20px] font-bold text-white'>Headline and more</h3>
                <p className='text-[16px] text-white -mt-1'>data days</p>
            </div>
        </div>
    )
}

export default OverviewComponent
