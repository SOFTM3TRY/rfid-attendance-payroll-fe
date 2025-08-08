"use client";

import { useState, useMemo } from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Footer } from "@/components/footer";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { EmailTable } from "@/components/admin/email/email-table";

const allEmails = Array.from({ length: 50 }).map((_, i) => ({
  id: String(i + 1),
  sender: `user${i + 1}@example.com`,
  subject: `Subject ${i + 1}`,
  date: `2025-08-${(i + 1).toString().padStart(2, "0")}`,
  isRead: i % 2 === 0,
}));

export default function Inbox() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredEmails = useMemo(() => {
    return allEmails
      .filter((email) =>
        email.subject.toLowerCase().includes(search.toLowerCase())
      )
      .filter((email) => {
        if (filter === "read") return email.isRead;
        if (filter === "unread") return !email.isRead;
        return true;
      });
  }, [search, filter]);

  const paginatedEmails = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredEmails.slice(start, start + pageSize);
  }, [filteredEmails, page]);

  return (
    <ProtectedRoute>
      <SidebarProvider style={{ height: "100vh", width: "100%" }}>
        <AppSidebar />
        <main className="w-full h-auto">
          <Navbar />

          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">Email</h1>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin/dashboard">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Email</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="p-5 h-full mt-5">
              <EmailTable
                emails={paginatedEmails}
                page={page}
                onPageChange={setPage}
                search={search}
                onSearch={setSearch}
                filter={filter}
                onFilter={setFilter}
                totalEmails={filteredEmails.length}
                pageSize={pageSize}
              />
            </div>
          </div>

          <Footer />
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
