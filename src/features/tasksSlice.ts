
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Task
{
  id: string
  title: string
  completed: boolean
  order: number
}

interface TasksState
{
  tasks: Task[]
}

/**
 * Tasks slice managing task list with drag-and-drop functionality
 * Handles adding, removing, reordering, and toggling task completion
 */
const initialState: TasksState = {
  tasks: [
    { id: '1', title: 'Finish report', completed: true, order: 0 },
    { id: '2', title: 'Email client', completed: false, order: 1 },
    { id: '3', title: 'Update website', completed: false, order: 2 },
    { id: '4', title: 'Draft presentation', completed: false, order: 3 },
  ],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) =>
    {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
        order: state.tasks.length,
      }
      state.tasks.push(newTask)
    },
    removeTask: (state, action: PayloadAction<string>) =>
    {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    toggleTask: (state, action: PayloadAction<string>) =>
    {
      const task = state.tasks.find(t => t.id === action.payload)
      if (task)
      {
        task.completed = !task.completed
      }
    },
    reorderTasks: (state, action: PayloadAction<{ activeId: string; overId: string }>) =>
    {
      const { activeId, overId } = action.payload
      const activeIndex = state.tasks.findIndex(task => task.id === activeId)
      const overIndex = state.tasks.findIndex(task => task.id === overId)

      if (activeIndex !== -1 && overIndex !== -1)
      {
        const [movedTask] = state.tasks.splice(activeIndex, 1)
        state.tasks.splice(overIndex, 0, movedTask)

        // Update order values
        state.tasks.forEach((task, index) =>
        {
          task.order = index
        })
      }
    },
  },
})

export const { addTask, removeTask, toggleTask, reorderTasks } = tasksSlice.actions
export default tasksSlice.reducer
