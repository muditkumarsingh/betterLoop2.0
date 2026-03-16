import React from 'react'
import OverviewComponent from './OverviewComponent'

const DashOverview = () => {
    return (
        <div className='bg-[#D9D9D9] p-5 rounded-xl'>
            <h1 className='text-xl font-bold'>OverView</h1>
            <div className='section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <OverviewComponent/>
                <OverviewComponent/>
                <OverviewComponent/>
            </div>
        </div>
    )
}

export default DashOverview
