import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from '../Dashboard/DashHeader'
import AIChatWidget from '../AIChatWidget'

const DashboardLayout = () => {
    return (
        <>
            <DashHeader />
            <div className="mx-5 md:mx-10 lg:mx-30">
                <Outlet />
            </div>
            <AIChatWidget />
        </>
    )
}

export default DashboardLayout
