import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TasksCard from '../components/TasksCard'
import tasksReducer from '../features/tasksSlice'

const createMockStore = (initialState = {}) =>
{
  return configureStore({
    reducer: {
      tasks: tasksReducer,
    },
    preloadedState: {
      tasks: {
        tasks: [
          { id: '1', title: 'Test task', completed: false, order: 0 },
        ],
        ...initialState,
      },
    },
  })
}

describe('TasksCard', () =>
{
  it('renders tasks correctly', () =>
  {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <TasksCard />
      </Provider>
    )

    expect(screen.getByText('Tasks')).toBeInTheDocument()
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('allows adding new tasks', () =>
  {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <TasksCard />
      </Provider>
    )

    const input = screen.getByPlaceholderText('Add new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'New test task' } })
    fireEvent.click(addButton)

    expect(screen.getByText('New test task')).toBeInTheDocument()
  })
})
