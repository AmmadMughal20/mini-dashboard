
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Notification
{
  id: string
  type: 'comment' | 'system' | 'success'
  title: string
  message: string
  timestamp: string
  read: boolean
}

interface NotificationsState
{
  notifications: Notification[]
}

/**
 * Notifications slice managing notification state
 * Handles marking notifications as read/unread
 */
const initialState: NotificationsState = {
  notifications: [
    {
      id: '1',
      type: 'comment',
      title: 'New comment',
      message: '2 min ago',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'system',
      title: 'System update',
      message: '1 hour ago',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Password changed',
      message: '5 hours ago',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ],
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) =>
    {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification)
      {
        notification.read = true
      }
    },
    markAsUnread: (state, action: PayloadAction<string>) =>
    {
      const notification = state.notifications.find(n => n.id === action.payload)
      if (notification)
      {
        notification.read = false
      }
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id'>>) =>
    {
      const newNotification = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.notifications.unshift(newNotification)
    },
  },
})

export const { markAsRead, markAsUnread, addNotification } = notificationsSlice.actions
export default notificationsSlice.reducer
