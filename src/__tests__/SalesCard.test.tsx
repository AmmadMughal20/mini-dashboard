import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SalesCard from '../components/SalesCard'
import salesReducer from '../features/salesSlice'

// Mock store for testing
const createMockStore = (initialState = {}) =>
{
  return configureStore({
    reducer: {
      sales: salesReducer,
    },
    preloadedState: {
      sales: {
        currentSales: 3200,
        growthPercentage: 12.5,
        chartData: [2800, 2900, 3000, 2950, 3100, 3200],
        ...initialState,
      },
    },
  })
}

describe('SalesCard', () =>
{
  it('renders sales data correctly', () =>
  {
    const store = createMockStore()

    render(
      <Provider store={store}>
        <SalesCard />
      </Provider>
    )

    expect(screen.getByText('Sales')).toBeInTheDocument()
    expect(screen.getByText('$3,200')).toBeInTheDocument()
    expect(screen.getByText('12.5%')).toBeInTheDocument()
  })

  it('matches snapshot', () =>
  {
    const store = createMockStore()

    const { container } = render(
      <Provider store={store}>
        <SalesCard />
      </Provider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
