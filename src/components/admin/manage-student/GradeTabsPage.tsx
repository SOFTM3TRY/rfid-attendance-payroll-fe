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
  grade_id: string;
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
    1: GradeOneTable,
    2: GradeTwoTable,
  3: GradeThreeTable,
   4: GradeFourTable,
  5: GradeFiveTable,
6: GradeSixTable,
  };

  // Filter the data by grade, filters, and search
   const getFilteredData = (grade_id: any) => {
     
    
    const filteredData = baseData.filter((row) => {
     const gradeMatch = String(row.grade_id) === String(grade_id);
      const sectionMatch = selectedFilters.length === 0 || selectedFilters.includes(String(row.section));
      const statusMatch = selectedStatus.length === 0 || selectedStatus.includes(row.status);
      const fullName = `${row.first_name} ${row.middle_name || ''} ${row.last_name}`;
      const searchMatch = search === "" ||
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        row.lrn.includes(search);
   
      
      return gradeMatch && sectionMatch && statusMatch && searchMatch;
    });
    
    console.log(`Filtered Data for Grade ${grade_id}:`, filteredData);
    
    return filteredData;
  };

   const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 })); // reset page on search change
  };

  React.useEffect(() => {
    if (GradesData?.data && !selectedGrade) {
      setSelectedGrade(GradesData.data[0]?.id); // Set initial grade to the first available grade
    }
  }, [GradesData, selectedGrade]);
  console.log("Selected Grade:", selectedGrade);  

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
                value={grade.id}
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-700"
              >
                <GraduationCap
                  className={`mr-1 h-4 w-4 ${
                    grade.id === 1
                      ? "text-green-500 dark:text-green-300"
                      : grade.id ===2
                      ? "text-orange-500 dark:text-orange-300"
                      : grade.id ===3
                      ? "text-indigo-500 dark:text-indigo-300"
                      : grade.id ===4
                      ? "text-blue-500 dark:text-blue-300"
                      : grade.id === 5
                      ? "text-red-500 dark:text-red-300"
                      : grade.id ===6
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
          const TableComponent = gradeComponents[grade.id];

          return (
            <TabsContent key={grade.id} value={grade.id}>
              <TableComponent
                columns={columns}
                data={getFilteredData(grade.id).slice(
                  pagination.pageIndex * pagination.pageSize,
                  (pagination.pageIndex + 1) * pagination.pageSize
                )}
                pagination={pagination}
                setPagination={setPagination}
                totalRows={getFilteredData(grade.id).length}
              />
            </TabsContent>
          );
        })}
      </Tabs>
    </main>
  );
};

