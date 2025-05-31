
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ProfileState
{
  firstName: string
  lastName: string
  email: string
  age: number | null
  avatar: string | null
}

/**
 * Profile slice managing user profile information
 * Handles profile updates and avatar management
 */
const initialState: ProfileState = {
  firstName: '',
  lastName: '',
  email: '',
  age: null,
  avatar: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<Partial<ProfileState>>) =>
    {
      Object.assign(state, action.payload)
    },
    updateAvatar: (state, action: PayloadAction<string>) =>
    {
      state.avatar = action.payload
    },
  },
})

export const { updateProfile, updateAvatar } = profileSlice.actions
export default profileSlice.reducer
