import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice'
import salesReducer from './features/salesSlice'
import profileReducer from './features/profileSlice'
import notificationsReducer from './features/notificationsSlice'
import tasksReducer from './features/tasksSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sales: salesReducer,
        profile: profileReducer,
        notifications: notificationsReducer,
        tasks: tasksReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

