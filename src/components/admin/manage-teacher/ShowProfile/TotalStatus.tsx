import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";

export const TotalStatus: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5">
      <Card className="border border-green-600 dark:border-green-500">
        <CardHeader>
          <CardTitle>Total Present</CardTitle>
          <CardDescription>
            {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>

      <Card className="border border-yellow-600 dark:border-yellow-500">
        <CardHeader>
          <CardTitle>Total Late</CardTitle>
          <CardDescription>
            {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>

      <Card className="border border-red-600 dark:border-red-500">
        <CardHeader>
          <CardTitle>Total Absent</CardTitle>
          <CardDescription>
            {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">0</p>
        </CardContent>
      </Card>
    </div>
  )
}
