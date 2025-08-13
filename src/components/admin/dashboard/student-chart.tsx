"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", present: 222, late: 150, absent: 50 },
  { date: "2024-04-02", present: 97, late: 180, absent: 53 },
  { date: "2024-04-03", present: 167, late: 120, absent: 63 },
  { date: "2024-04-04", present: 242, late: 260, absent: 48 },
  { date: "2024-04-05", present: 373, late: 290, absent: 67 },
  { date: "2024-04-06", present: 301, late: 340, absent: 59 },
  { date: "2024-04-07", present: 245, late: 180, absent: 75 },
  { date: "2024-04-08", present: 409, late: 320, absent: 71 },
  { date: "2024-04-09", present: 59, late: 110, absent: 31 },
  { date: "2024-04-10", present: 261, late: 190, absent: 49 },
  { date: "2024-04-11", present: 327, late: 350, absent: 23 },
  { date: "2024-04-12", present: 292, late: 210, absent: 98 },
  { date: "2024-04-13", present: 342, late: 380, absent: 80 },
  { date: "2024-04-14", present: 137, late: 220, absent: 43 },
  { date: "2024-04-15", present: 120, late: 170, absent: 110 },
  { date: "2024-04-16", present: 138, late: 190, absent: 72 },
  { date: "2024-04-17", present: 446, late: 360, absent: 94 },
  { date: "2024-04-18", present: 364, late: 410, absent: 126 },
  { date: "2024-04-19", present: 243, late: 180, absent: 77 },
  { date: "2024-04-20", present: 89, late: 150, absent: 61 },
  { date: "2024-04-21", present: 137, late: 200, absent: 63 },
  { date: "2024-04-22", present: 224, late: 170, absent: 106 },
  { date: "2024-04-23", present: 138, late: 230, absent: 132 },
  { date: "2024-04-24", present: 387, late: 290, absent: 123 },
  { date: "2024-04-25", present: 215, late: 250, absent: 135 },
  { date: "2024-04-26", present: 75, late: 130, absent: 95 },
  { date: "2024-04-27", present: 383, late: 420, absent: 97 },
  { date: "2024-04-28", present: 122, late: 180, absent: 98 },
  { date: "2024-04-29", present: 315, late: 240, absent: 145 },
  { date: "2024-04-30", present: 454, late: 380, absent: 166 },
]

const chartConfig = {
  present: {
    label: "Present",
    color: "var(--color-green)",
  },
  late: {
    label: "Late",
    color: "var(--color-yellow)",
  },
  absent: {
    label: "Absent",
    color: "var(--color-red)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  // Map timeRange to human-readable label
  const rangeLabel = {
    "90d": "last 3 months",
    "30d": "last 30 days",
    "7d": "last 7 days",
  }[timeRange]

  // Dynamically use latest date in data
  const referenceDate = new Date(chartData[chartData.length - 1].date)

  let daysToSubtract = 90
  if (timeRange === "30d") daysToSubtract = 30
  if (timeRange === "7d") daysToSubtract = 7

  const startDate = new Date(referenceDate)
  startDate.setDate(startDate.getDate() - daysToSubtract)

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Student Attendance Chart</CardTitle>
          <CardDescription>Showing total visitors for the {rangeLabel}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
            <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-green)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-green)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillLate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-yellow)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-yellow)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillAbsent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-red)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-red)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="present"
              type="natural"
              fill="url(#fillPresent)"
              stroke="var(--color-green)"
              stackId="a"
            />
            <Area
              dataKey="late"
              type="natural"
              fill="url(#fillLate)"
              stroke="var(--color-yellow)"
              stackId="a"
            />
            <Area
              dataKey="absent"
              type="natural"
              fill="url(#fillAbsent)"
              stroke="var(--color-red)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
