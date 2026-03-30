"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { WeeklyAttendanceAverage } from "@/types/attendance";

type TeacherAttendanceAnalyticsChartProps = {
  data: WeeklyAttendanceAverage[];
  isLoading?: boolean;
};

export function TeacherAttendanceAnalyticsChart({
  data,
  isLoading = false,
}: TeacherAttendanceAnalyticsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Attendance Averages</CardTitle>
        <CardDescription>
          Backend attendance data grouped by week for teacher monitoring.
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[320px]">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-52" />
            <Skeleton className="h-[240px] w-full" />
          </div>
        ) : data.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="present" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="late" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No attendance analytics available for this section yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
