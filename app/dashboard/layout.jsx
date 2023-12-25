import React from 'react'
import Navbar from '../components/dashboard/navbar/Navbar'
import Footer from '../components/dashboard/footer/Footer'
import Sidebar from '../components/dashboard/sidebar/Sidebar'

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-1/5 bg-[color:var(--bgSoft)] p-[20px]">
                <Sidebar />
            </div>
            <div className="w-4/5 p-[20px]">
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>

    )
}

export default DashboardLayout