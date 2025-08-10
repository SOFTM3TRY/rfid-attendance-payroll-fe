"use client";
export default function Page() {
 const handleGoBack = () => {
    window.history.go(-2);  
}
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <p className="mb-6">You do not have permission to view this page.</p>
        <button onClick={handleGoBack} className="text-blue-500 hover:underline">
          Go back to Home
        </button>
      </div>
    </div>
  );
}