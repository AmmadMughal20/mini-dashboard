
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import type { RootState } from '../store'

/**
 * Sales dashboard card component displaying current sales and growth
 * Features a mini chart visualization showing sales trend
 */
const SalesCard: React.FC = () =>
{
  const { currentSales, growthPercentage, chartData } = useSelector((state: RootState) => state.sales)

  // Transform chart data for Recharts
  const chartDataFormatted = chartData.map((value: any, index: number) => ({
    name: `Day ${index + 1}`,
    sales: value
  }))


  return (
    <Card className="shadow-lg border-0 bg-white min-h-[375px] min-w-[320px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-[34px] font-semibold text-slate-800">Sales</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col justify-between h-full">
        <div className="flex flex-col space-y-3">
          <div className="items-baseline space-x-2">
            <span className="text-[54px] font-bold text-slate-900">
              ${currentSales.toLocaleString()}
            </span>
            <span className="text-[25px] font-medium text-green-600 flex items-center">
              <span className="mr-1">↗</span>
              {growthPercentage}%
            </span>
          </div>
        </div>

        {/* Recharts area chart with gradient fill */}
        <div className="h-[150px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartDataFormatted} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#669dee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#669dee" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#669dee"
                strokeWidth={3}
                fill="url(#salesGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesCard
