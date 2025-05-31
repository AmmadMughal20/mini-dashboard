
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess } from '../features/authSlice'
import type { AppDispatch } from '../store'

/**
 * Authentication screen component handling login and signup
 * Validates user credentials and manages authentication state
 */
const AuthScreen: React.FC = () =>
{
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (e: React.FormEvent) =>
    {
        e.preventDefault()
        dispatch(loginStart())

        // Simulate authentication - in real app, this would be an API call
        setTimeout(() =>
        {
            const user = {
                id: Date.now().toString(),
                email,
                firstName: isLogin ? 'Ammad' : firstName,
                lastName: isLogin ? 'Mughal' : lastName,
            }
            dispatch(loginSuccess(user))
        }, 1000)
    }

    return (
        <div className="min-h-screen w-screen flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-amber-50 p-8 md:p-10 rounded-xl shadow-md w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </h2>

                {!isLogin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
            </form>

            <div className="absolute bottom-6 w-full text-center">
                <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-blue-600 hover:underline"
                >
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
            </div>
        </div>

    )
}

export default AuthScreen
