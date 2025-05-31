
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { logout } from '../features/authSlice'
import SalesCard from '../components/SalesCard'
import ProfileCard from '../components/ProfileCard'
const
    Dashboard: React.FC = () =>
    {
        const dispatch = useDispatch()
        const { user } = useSelector((state: RootState) => state.auth)

        const handleLogout = () =>
        {
            dispatch(logout())
        }

        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
                                <p className="text-sm text-slate-600">Welcome back, {user?.firstName}</p>
                            </div>
                            <button onClick={handleLogout} className="border-slate-200 text-slate-600 hover:text-slate-900">
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid with consistent card sizing */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                        {/* Sales Card */}
                        <div className="col-span-1 flex">
                            <div className="w-full min-h-[280px] min-w-[320px]">
                                <SalesCard />
                            </div>
                        </div>

                        {/* Profile Card */}
                        <div className="col-span-1 flex">
                            <div className="w-full min-h-[280px] min-w-[320px]">
                                <ProfileCard />
                            </div>
                        </div>

                        {/* Notifications Card */}
                        <div className="col-span-1 flex">
                            <div className="w-full min-h-[280px] min-w-[320px]">
                                {/* To be added */}
                            </div>
                        </div>

                        {/* Tasks Card */}
                        <div className="col-span-1 flex">
                            <div className="w-full min-h-[280px] min-w-[320px]">
                                {/* To be added */}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }

export default Dashboard
