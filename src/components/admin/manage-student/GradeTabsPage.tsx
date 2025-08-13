"use client";

import * as React from "react";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, GraduationCap } from "lucide-react";

import { GradeOneTable } from "@/components/admin/manage-student/GradeOneTable";
import { GradeTwoTable } from "@/components/admin/manage-student/GradeTwoTable";
import { GradeThreeTable } from "@/components/admin/manage-student/GradeThreeTable";
import { GradeFourTable } from "@/components/admin/manage-student/GradeFourTable";
import { GradeFiveTable } from "@/components/admin/manage-student/GradeFiveTable";
import { GradeSixTable } from "@/components/admin/manage-student/GradeSixTable";

import { columns, Section } from "@/components/admin/manage-student/columns";
import { FiltersDropdown } from "@/components/admin/manage-student/FiltersDropdown";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { FiltersDropdownStatus } from "@/components/admin/manage-student/FiltersDropdownStatus";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const grades = [
  "Grade One",
  "Grade Two",
  "Grade Three",
  "Grade Four",
  "Grade Five",
  "Grade Six",
];

const baseData: Section[] = Array.from({ length: 120 }).map((_, i) => ({
  LRN: `${i + 123456789000}`,
  FullName: `Student ${i + 1}`,
  Grade: grades[Math.floor(i / 20)],
  Section: (i % 4) + 1,
  status: i % 2 === 0 ? "Active" : "Inactive",
}));

export default function GradeTabsPage() {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  // Pagination state here (shared with FilterTable and table components)
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Filter the data by grade, filters, and search
  const getFilteredData = (grade: string) =>
    baseData.filter(
      (row) =>
        row.Grade === grade &&
        (selectedFilters.length === 0 ||
          selectedFilters.includes(String(row.Section))) &&
        (selectedStatus.length === 0 || selectedStatus.includes(row.status)) &&
        (search === "" ||
          row.FullName.toLowerCase().includes(search.toLowerCase()))
    );

  const gradeComponents: Record<string, React.ElementType> = {
    "Grade One": GradeOneTable,
    "Grade Two": GradeTwoTable,
    "Grade Three": GradeThreeTable,
    "Grade Four": GradeFourTable,
    "Grade Five": GradeFiveTable,
    "Grade Six": GradeSixTable,
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 })); // reset page on search change
  };

  return (
    <main>
      <Tabs
        value={selectedGrade}
        onValueChange={(value) => {
          setSelectedGrade(value);
          setPagination((p) => ({ ...p, pageIndex: 0 })); // reset page when grade changes
        }}
      >
        <div className="flex justify-between mb-3">
          <TabsList className="flex-wrap gap-3">
            {grades.map((grade) => (
              <TabsTrigger key={grade} value={grade}>
                <GraduationCap className="mr-1 h-4 w-4" />
                {grade}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button variant="outline" className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Add Student
          </Button>
        </div>

        {/* Header Actions */}
        <div className="my-5 flex flex-wrap gap-4 justify-between items-center">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          {/* Search */}
          <div className="relative max-w-md w-80">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Filter by Full Name..."
              value={search}
              onChange={handleFilterChange}
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
            <FiltersDropdown
              selectedFilters={selectedFilters}
              setSelectedFilters={(filters) => {
                setSelectedFilters(filters);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
            />
          </div>
        </div>

        {grades.map((grade) => {
          const TableComponent = gradeComponents[grade];

          return (
            <TabsContent key={grade} value={grade}>
              <TableComponent
                columns={columns}
                data={getFilteredData(grade).slice(
                  pagination.pageIndex * pagination.pageSize,
                  (pagination.pageIndex + 1) * pagination.pageSize
                )}
                pagination={pagination}
                setPagination={setPagination}
                totalRows={getFilteredData(grade).length}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
}

