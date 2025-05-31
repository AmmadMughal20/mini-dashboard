
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { logout } from '../features/authSlice'
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
            </div>
        )
    }

export default Dashboard
