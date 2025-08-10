import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    
    <ProtectedRoute role="2">
      <div className="p-3">
        <h1 className="text-xl">Teacher Dashboard</h1>
      </div>
    </ProtectedRoute>
  );
}