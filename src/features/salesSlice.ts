
import { createSlice } from '@reduxjs/toolkit'

interface SalesState
{
  currentSales: number
  growthPercentage: number
  chartData: number[]
}

/**
 * Sales slice managing sales dashboard data
 * Contains current sales figures and chart visualization data
 */
const initialState: SalesState = {
  currentSales: 3200,
  growthPercentage: 12.5,
  chartData: [200, 680, 250, 850, 1230, 930, 1500, 1800, 2100, 2500, 3000, 3200],
}

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    // Future: Add actions for updating sales data
  },
})

export default salesSlice.reducer
