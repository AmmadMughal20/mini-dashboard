
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import type { RootState } from '../store'
import { markAsRead, markAsUnread } from '../features/notificationsSlice'
import DoneIcon from '@mui/icons-material/Done';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CommentIcon from '@mui/icons-material/Comment';
/**
 * Notifications panel component displaying system notifications
 * Allows users to mark notifications as read/unread
 */
const NotificationsCard: React.FC = () =>
{
  const dispatch = useDispatch()
  const { notifications } = useSelector((state: RootState) => state.notifications)

  const getNotificationIcon = (type: string) =>
  {
    switch (type)
    {
      case 'comment':
        return (
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white text-sm"><CommentIcon /></span>
          </div>
        )
      case 'system':
        return (
          <div className="w-8 h-8 bg-custom-orange rounded-lg flex items-center justify-center">
            <span className="text-white text-sm"><ReportProblemIcon /></span>
          </div>
        )
      case 'success':
        return (
          <div className="w-8 h-8 bg-custom-green rounded-lg flex items-center justify-center">
            <span className="text-white text-sm"><DoneIcon /></span>
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-600 text-sm">📋</span>
          </div>
        )
    }
  }

  const handleNotificationClick = (id: string, isRead: boolean) =>
  {
    if (isRead)
    {
      dispatch(markAsUnread(id))
    } else
    {
      dispatch(markAsRead(id))
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white min-h-[375px] ">
      <CardHeader className="pb-4">
        <CardTitle className="text-[34px] font-semibold text-slate-800">Notifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification.id, notification.read)}
            className={`flex items-start space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${notification.read
              ? 'opacity-60 hover:opacity-80'
              : 'hover:bg-slate-50'
              }`}
          >
            {getNotificationIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {notification.title}
              </p>
              <p className="text-xs text-slate-500">
                {notification.message}
              </p>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default NotificationsCard
