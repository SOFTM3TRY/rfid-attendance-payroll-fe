"use client";

import * as React from "react";
import { useState, useEffect } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, GraduationCap, Search } from "lucide-react";

import { ManageGradeTable } from "@/components/admin/manage-system/ManageGradeTable";
import { ManageSectionTable } from "@/components/admin/manage-system/ManageSectionTable";

import { FiltersDropdown } from "@/components/admin/manage-student/FiltersDropdown";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { FiltersDropdownStatus } from "@/components/admin/manage-student/FiltersDropdownStatus";

import { Input } from "@/components/ui/input";

import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";

export default function SystemTabPage() {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const { token } = useAuth();
  const { data: GradesData, isLoading: isLoadingGradesData } = useGrade(token as string);

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
          <TabsList className="flex-wrap gap-3 bg-zinc-100 dark:bg-zinc-900">
            <TabsTrigger key="1" value="1" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700">
              <GraduationCap className="mr-1 h-4 w-4 text-green-500 dark:text-green-300" />
              Manage Grades
            </TabsTrigger>
            <TabsTrigger key="2" value="2" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700">
              <GraduationCap className="mr-1 h-4 w-4 text-orange-500 dark:text-orange-300" />
              Manage Sections
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Filters and Search */}
        <div className="my-5 flex flex-wrap gap-4 justify-between items-center">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          <div className="relative max-w-md w-80">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Grade Level or Description..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
            />
          </div>

          <div className="flex gap-2">
            <FiltersDropdownStatus
              selectedFilters={selectedStatus}
              setSelectedFilters={(filters) => {
                setSelectedStatus(filters);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
            />
  {/* @ts-ignore */}
            <FiltersDropdown
              selectedFilters={selectedFilters}
              setSelectedFilters={(filters) => {
                setSelectedFilters(filters);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
            />
          </div>
        </div>

        {/* Tabs Content */}
        <TabsContent key="1" value="1">
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
