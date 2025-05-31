
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import type { RootState } from '../store'
import { updateProfile, updateAvatar } from '../features/profileSlice'
import { Input } from './ui/input'
import { Button } from './ui/button'

/**
 * User profile card component for editing profile information
 * Includes avatar upload functionality and form validation
 */
const ProfileCard: React.FC = () =>
{
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.profile)
  const [formData, setFormData] = useState(profile)

  const handleInputChange = (field: string, value: string | number) =>
  {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const file = e.target.files?.[0]
    if (file)
    {
      const reader = new FileReader()
      reader.onload = (event) =>
      {
        const result = event.target?.result as string
        dispatch(updateAvatar(result))
        setFormData(prev => ({ ...prev, avatar: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () =>
  {
    dispatch(updateProfile(formData))
  }

  // Generate initials for avatar fallback
  const initials = `${formData.firstName?.[0] || ''}${formData.lastName?.[0] || ''}`.toUpperCase()

  return (
    <Card className="flex flex-col justify-between shadow-lg border-0 bg-white min-h-[375px] ">
      <CardHeader className="pb-4">
        <div className="flex justify-center">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-slate-200">
              <AvatarImage src={formData.avatar || undefined} />
              <AvatarFallback className="bg-slate-100 text-slate-600 text-lg font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Upload avatar"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="border-slate-200"
          />
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="border-slate-200"
          />
        </div>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="border-slate-200"
        />
        <Input
          type="number"
          placeholder="Age"
          value={formData.age || ''}
          onChange={(e) => handleInputChange('age', parseInt(e.target.value) || '')}
          className="border-slate-200"
        />
        <Button
          onClick={handleSave}
          className="w-full bg-accent/90 hover:bg-accent text-white font-medium"
        >
          Save
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
