import { Outlet } from "react-router-dom"
import DashHeader from "./DashHeader"


const DashboardLayout = () => {
    return (
        <>
            <DashHeader />
            <div className="mx-5 md:mx-10 lg:mx-30">
                <Outlet/>
            </div>


        </>
    )
}

export default DashboardLayout
