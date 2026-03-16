import React from 'react'
import DailyLogForm from './DailyLogForm'

const LogModal = ({ isModalOpen, setIsModalOpen, handleLogCreated }) => {
    return (
        <div className={`w-screen h-screen bg-black/40 absolute z-100 inset-0 fixed ${isModalOpen ? "" : "hidden"}`}>
            <div>
                <DailyLogForm onLogCreated={handleLogCreated} setIsModalOpen={setIsModalOpen} />
            </div>
        </div>
    )
}

export default LogModal
