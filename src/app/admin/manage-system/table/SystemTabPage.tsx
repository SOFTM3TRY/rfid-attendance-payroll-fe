"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusIcon, GraduationCap, CalendarDays, BookText, LayoutPanelTop } from "lucide-react";

import { ManageGradeTable } from "./grade/GradeTable";
import { ManageSectionTable } from "./section/SectionTable";

import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";
import { useAllSections } from "@/hooks/useSection";

export default function SystemTabPage() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const { token } = useAuth();
  const { data: GradesData, isLoading: isLoadingGradesData } = useGrade(token as string);
  const { data: SectionsData, isLoading: isLoadingSectionsData } = useAllSections(token as string);

  useEffect(() => {
    if (GradesData?.data && !selectedTab) {
      setSelectedTab("1");
    }
  }, [GradesData, selectedTab]);

  return (
    <main>
      <Tabs value={selectedTab || ""} onValueChange={setSelectedTab}>
        {/* Tabs Header */}
        <div className="flex justify-between mb-3">
          <TabsList className="flex-wrap gap-3 bg-zinc-100 dark:bg-zinc-900 p-2 h-14">
             <TabsTrigger key="1" value="1" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 text-sm">
              <CalendarDays strokeWidth={2.5} size={22} className="text-violet-500 dark:text-violet-300" />
              Manage Academic Year
            </TabsTrigger>
            <TabsTrigger key="2" value="2" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 text-sm">
              <GraduationCap strokeWidth={2.5} size={22} className="text-green-500 dark:text-green-300" />
              Manage Grades
            </TabsTrigger>
            <TabsTrigger key="3" value="3" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 text-sm">
              <LayoutPanelTop strokeWidth={2.5} size={22} className="text-orange-500 dark:text-orange-300" />
              Manage Sections
            </TabsTrigger>
            <TabsTrigger key="4" value="4" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700 text-sm">
              <BookText strokeWidth={2.5} size={22} className="text-blue-500 dark:text-blue-300" />
              Manage Subjects
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tabs Content */}
        <TabsContent key="2" value="2">
          <ManageGradeTable
            data={GradesData?.data || []}
            pagination={pagination}
            setPagination={setPagination}
            totalRows={GradesData?.data?.length || 0}
            search={search}
            selectedStatus={selectedStatus}
            selectedFilters={selectedFilters}
          />
        </TabsContent>

        <TabsContent key="3" value="3">
          <ManageSectionTable
            data={SectionsData?.data || []}
            pagination={pagination}
            setPagination={setPagination}
            totalRows={GradesData?.data?.length || 0}
            search={search}
            selectedStatus={selectedStatus}
            selectedFilters={selectedFilters}
          />
        </TabsContent>

        {/* <TabsContent key="2" value="2">
          <ManageSectinTable
            data={[]} // Placeholder
            pagination={pagination}
            setPagination={setPagination}
            totalRows={0}
          />
        </TabsContent> */}
      </Tabs>
    </main>
  );
}
