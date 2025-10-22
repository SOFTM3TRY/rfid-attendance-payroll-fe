"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useTeacherDetails } from "@/hooks/useTeacher";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/teacher-sidebar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useClientOnly } from "@/hooks/useClientOnly";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { User } from "lucide-react";

import TeacherStudentTable from "./student-table";

import { Button } from "@/components/ui/button";

export default function ManageStudent() {
    const isClient = useClientOnly();
    const { token } = useAuth();

    // Fetch user details with token
    const {
        data: userDetails,
        isLoading: isLoadingUserDetails,
        error: userError,
    } = useUserDetails(token as string);

    // Extract id from userDetails to fetch teacher details
    const teacherId = userDetails?.data?.id ?? null;

    // Fetch teacher details with token and teacherId
    const {
        data: teacherDetails,
        isLoading: isLoadingTeacher,
        error: teacherError,
    } = useTeacherDetails(token as string, { id: teacherId });

    if (!isClient) {
        // Wait until client-only rendering to avoid hydration mismatch
        return null;
    }

    if (isLoadingUserDetails || isLoadingTeacher) return <Loader />;

    if (userError) return <div>Error loading user details: {String(userError)}</div>;
    if (teacherError) return <div>Error loading teacher details: {String(teacherError)}</div>;

    return (
        <ProtectedRoute role="2">
            <SidebarProvider style={{ height: "100vh", width: "100%" }}>
                <AppSidebar />
                <main className="w-full h-auto">
                    <Navbar />
                    <div className="p-5">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-medium flex">
                                <User className="mr-2 w-6 h-6 text-teal-500" />
                                Manage Advisory Class
                            </h1>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/admin/dashboard">
                                            Dashboard
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/admin/manage-teacher">
                                            Manage Advisory Class
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>


                        <div className="p-5">
                            {/* <h1 className="text-2xl font-bold mb-4">Manage Advisory Class</h1>

                            <section className="mb-10">
                                <h2 className="text-xl font-semibold mb-2">User Details JSON</h2>
                                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm max-h-64 overflow-auto">
                                    {JSON.stringify(userDetails, null, 2)}
                                </pre>
                            </section> */}

                            <div className="mt-10 flex justify-between items-center">
                                <div className="flex items-center justify-between gap-10">
                                    <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                                        Grade: {userDetails?.data?.additional_info?.grade === "1"
                                            ? "Grade One"
                                            : userDetails?.data?.additional_info?.grade === "2"
                                                ? "Grade Two"
                                                : userDetails?.data?.additional_info?.grade === "3"
                                                    ? "Grade Three"
                                                    : userDetails?.data?.additional_info?.grade === "4"
                                                        ? "Grade Four"
                                                        : userDetails?.data?.additional_info?.grade === "5"
                                                            ? "Grade Five"
                                                            : userDetails?.data?.additional_info?.grade === "6"
                                                                ? "Grade Six"
                                                                : "N/A"}
                                    </span>
                                    <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                                        Section: {userDetails?.data?.additional_info?.section}
                                    </span>
                                    <span className="uppercase font-medium text-sm px-3 h-6 flex items-center justify-center rounded-full bg-green-200 shadow text-green-900 dark:bg-green-100 dark:text-green-800">
                                        School Year: {userDetails?.data?.additional_info?.school_year}
                                    </span>
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(`/teacher/manage-student/sf2/${teacherId}`, "_blank")}
                                >
                                    Generate SF2
                                </Button>
                            </div>
                            <div className="mt-10">
                                <TeacherStudentTable students={teacherDetails?.data?.students || []} />
                            </div>

                            {/* <section>
                                <h2 className="text-xl font-semibold mb-2">Teacher Details JSON</h2>
                                {teacherDetails ? (
                                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm max-h-64 overflow-auto">
                                        {JSON.stringify(teacherDetails, null, 2)}
                                    </pre>
                                ) : (
                                    <p>No teacher details found for ID: {teacherId}</p>
                                )}
                            </section> */}
                        </div>
                        <Footer />
                    </div>
                </main>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
