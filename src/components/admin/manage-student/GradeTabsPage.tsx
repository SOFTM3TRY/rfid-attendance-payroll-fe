"use client";

import * as React from "react";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusIcon, GraduationCap, Search } from "lucide-react";

import { GradeOneTable } from "@/components/admin/manage-student/GradeOneTable";
import { GradeTwoTable } from "@/components/admin/manage-student/GradeTwoTable";
import { GradeThreeTable } from "@/components/admin/manage-student/GradeThreeTable";
import { GradeFourTable } from "@/components/admin/manage-student/GradeFourTable";
import { GradeFiveTable } from "@/components/admin/manage-student/GradeFiveTable";
import { GradeSixTable } from "@/components/admin/manage-student/GradeSixTable";

import { columns } from "@/components/admin/manage-student/columns";
import { FiltersDropdown } from "@/components/admin/manage-student/FiltersDropdown";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { FiltersDropdownStatus } from "@/components/admin/manage-student/FiltersDropdownStatus";

import { Input } from "@/components/ui/input";

import  AddStudent  from "@/components/admin/manage-student/AddStudent/AddStudent";

import { useStudentDetails } from "@/hooks/useStudentDetails";
import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";
 

 
 
interface Section {
  Grade: string;
  Section: string;
  FullName: string;
  status: string;
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  grade: string;
  section: string;
  lrn: string;
  
}
 

export default function GradeTabsPage() {

    const [selectedGrade, setSelectedGrade] = useState<string | null>(null); // Initialize the selectedGrade
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const { token } = useAuth();
  const { data: studentDetails, isLoading: isLoadingStudent, isError } = useStudentDetails(token as string);
  const { data: GradesData, isLoading: isLoadingGradesData } = useGrade(token as string);

  console.log("All Grades:", GradesData);
  console.log("Student Details:", studentDetails);

  // Pagination state here
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const baseData: Section[] = Array.isArray(studentDetails?.data) ? studentDetails?.data : [];
  console.log("Base Data:", baseData);


  const gradeComponents: Record<string, React.ElementType> = {
    "Grade One": GradeOneTable,
    "Grade Two": GradeTwoTable,
    "Grade Three": GradeThreeTable,
    "Grade Four": GradeFourTable,
    "Grade Five": GradeFiveTable,
    "Grade Six": GradeSixTable,
  };

  // Filter the data by grade, filters, and search
   const getFilteredData = (grade: string) => {
     
    
    const filteredData = baseData.filter((row) => {
      const gradeMatch = row.grade === grade;
      const sectionMatch = selectedFilters.length === 0 || selectedFilters.includes(String(row.section));
      const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(row.status);
      const fullName = `${row.first_name} ${row.middle_name || ''} ${row.last_name}`;
      const searchMatch = search === "" ||
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        row.lrn.includes(search);
   
      
      return gradeMatch && sectionMatch && statusMatch && searchMatch;
    });
    
    
    
    return filteredData;
  };

   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 })); // reset page on search change
  };

  React.useEffect(() => {
    if (GradesData?.data && !selectedGrade) {
      setSelectedGrade(GradesData.data[0]?.grade_level); // Set initial grade to the first available grade
    }
  }, [GradesData, selectedGrade]);

  return (
    <main>
      <Tabs
        value={selectedGrade || ""}
        onValueChange={(value) => {
          setSelectedGrade(value);
          setPagination((p) => ({ ...p, pageIndex: 0 })); // reset page when grade changes
        }}
      >
        <div className="flex justify-between mb-3">
          <TabsList className="flex-wrap gap-3 bg-zinc-100 dark:bg-zinc-900">
            {GradesData?.data.map((grade: any) => (
              <TabsTrigger
                key={grade.id}
                value={grade.grade_level}
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700"
              >
                <GraduationCap
                  className={`mr-1 h-4 w-4 ${
                    grade.grade_level === "Grade One"
                      ? "text-green-500 dark:text-green-300"
                      : grade.grade_level === "Grade Two"
                      ? "text-orange-500 dark:text-orange-300"
                      : grade.grade_level === "Grade Three"
                      ? "text-indigo-500 dark:text-indigo-300"
                      : grade.grade_level === "Grade Four"
                      ? "text-blue-500 dark:text-blue-300"
                      : grade.grade_level === "Grade Five"
                      ? "text-red-500 dark:text-red-300"
                      : grade.grade_level === "Grade Six"
                      ? "text-yellow-500 dark:text-yellow-300"
                      : ""
                  }`}
                />
                {grade.grade_level}
              </TabsTrigger>
            ))}
          </TabsList>

          <AddStudent />
        </div>

        {/* Header Actions */}
        <div className="my-5 flex flex-wrap gap-4 justify-between items-center">
          <FilterTable pagination={pagination} setPagination={setPagination} />

          {/* Search */}
          <div className="relative max-w-md w-80">
            <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Search Full Name or LRN..."
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

        {GradesData?.data.map((grade: any) => {
          const TableComponent = gradeComponents[grade.grade_level];

          return (
            <TabsContent key={grade.id} value={grade.grade_level}>
              <TableComponent
                columns={columns}
                data={getFilteredData(grade.grade_level).slice(
                  pagination.pageIndex * pagination.pageSize,
                  (pagination.pageIndex + 1) * pagination.pageSize
                )}
                pagination={pagination}
                setPagination={setPagination}
                totalRows={getFilteredData(grade.grade_level).length}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
};

