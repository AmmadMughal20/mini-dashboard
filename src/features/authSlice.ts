
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface User
{
    id: string
    email: string
    firstName: string
    lastName: string
}

interface AuthState
{
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
}

/**
 * Authentication slice managing user login state
 * Persists authentication status in localStorage
 */
const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    isAuthenticated: !!localStorage.getItem('user'),
    isLoading: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) =>
        {
            state.isLoading = true
        },
        loginSuccess: (state, action: PayloadAction<User>) =>
        {
            state.user = action.payload
            state.isAuthenticated = true
            state.isLoading = false
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        loginFailure: (state) =>
        {
            state.isLoading = false
        },
        logout: (state) =>
        {
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem('user')
        },
    },
})

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions
export default authSlice.reducer
