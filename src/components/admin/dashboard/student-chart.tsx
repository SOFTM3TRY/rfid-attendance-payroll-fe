"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useAuth } from "@/context/AuthContext";
import { useAttendanceChart } from "@/hooks/useAttendance";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  present: { label: "Present", color: "var(--color-green)" },
  late: { label: "Late", color: "var(--color-yellow)" },
  absent: { label: "Absent", color: "var(--color-red)" },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const { token } = useAuth();
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d");

  const { data, isLoading, isFetching } = useAttendanceChart(token, timeRange);

  const chartData = Array.isArray(data?.data) ? data.data : [];

  const rangeLabel =
    { "90d": "last 3 months", "30d": "last 30 days", "7d": "last 7 days" }[
      timeRange
    ];

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Student Attendance Chart</CardTitle>
          <CardDescription>
            Showing attendance for the {rangeLabel}{" "}
            {(isLoading || isFetching) && "• Loading..."}
          </CardDescription>
        </div>

        <Select value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillPresent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-green)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-green)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillLate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-yellow)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-yellow)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillAbsent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-red)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-red)"
                  stopOpacity={0.1}
                />
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
  );
}
