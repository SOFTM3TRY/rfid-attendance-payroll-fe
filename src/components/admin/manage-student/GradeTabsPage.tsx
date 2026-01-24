"use client";

import * as React from "react";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GraduationCap, Search, Table2 } from "lucide-react";

import { StudentTable } from "@/components/admin/manage-student/StudentTable";

import { columns } from "@/components/admin/manage-student/columns";
import { FiltersDropdown } from "@/components/admin/manage-student/FiltersDropdown";
import { FilterTable } from "@/components/admin/manage-student/Filtertable";
import { FiltersDropdownStatus } from "@/components/admin/manage-student/FiltersDropdownStatus";

import { Input } from "@/components/ui/input";

import AddStudent from "@/components/admin/manage-student/AddStudent/AddStudent";
import EditStudent from "@/components/admin/manage-student/EditStudent/EditStudent";

import {
  useStudentDetails,
  useChangeStudentStatus,
} from "@/hooks/useStudentDetails";
import { useAuth } from "@/context/AuthContext";
import { useGrade } from "@/hooks/useGrade";
import { Student } from "@/types/Student";
import { RefreshButton } from "@/components/relaod-table";
import { id } from "date-fns/locale";

export default function GradeTabsPage() {
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null); // Initialize the selectedGrade
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );
  const { token } = useAuth();

  const { mutate: changeStatus, isPending: isChangingStatus } =
    useChangeStudentStatus();

  const handleStatusChange = (studentId: string) => {
    if (!token) return;
    changeStatus({ token: token as string, id: studentId });
  };

  const {
    data: studentDetails,
    isLoading: isLoadingStudent,
    isError,
  } = useStudentDetails(token as string);
  const { data: GradesData, isLoading: isLoadingGradesData } = useGrade(
    token as string,
  );

  // Pagination state here
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const baseData: Student[] = Array.isArray(studentDetails?.data)
    ? studentDetails?.data
    : [];

  // Get filtered data WITHOUT applying section filter yet
  const filteredDataWithoutSectionFilter = React.useMemo(() => {
    return baseData.filter((row) => {
      const gradeMatch = String(row.grade_id) === String(selectedGrade);
      const statusMatch =
        selectedStatus.length === 0 || selectedStatus.includes(row.status);
      const fullName = `${row.first_name} ${row.middle_name || ""} ${
        row.last_name
      }`;
      const searchMatch =
        search === "" ||
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        row.lrn.includes(search);

      return gradeMatch && statusMatch && searchMatch;
    });
  }, [baseData, selectedGrade, selectedStatus, search]);

  // Now derive sectionTypes from the above filtered data
  const sectionTypes = React.useMemo(() => {
    const sectionsSet = new Set(
      filteredDataWithoutSectionFilter
        .map((row) => row.section?.section_name.trim())
        .filter(Boolean),
    );
    return Array.from(sectionsSet);
  }, [filteredDataWithoutSectionFilter]);

  // Filter the data by grade, filters, and search
  const getFilteredData = (grade_id: any) => {
    return baseData.filter((row) => {
      const gradeMatch = String(row.grade_id) === String(grade_id);
      const sectionMatch =
        selectedFilters.length === 0 ||
        selectedFilters.includes(row.section?.section_name.trim());
      const statusMatch =
        selectedStatus.length === 0 || selectedStatus.includes(row.status);
      const fullName = `${row.first_name} ${row.middle_name || ""} ${
        row.last_name
      }`;
      const searchMatch =
        search === "" ||
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        row.lrn.includes(search);

      return gradeMatch && sectionMatch && statusMatch && searchMatch;
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 })); // reset page on search change
  };

  const handleEdit = (id: string) => {
    setSelectedTeacherId(id);
    setEditOpen(true);
  };

  React.useEffect(() => {
    if (GradesData?.data && !selectedGrade) {
      setSelectedGrade(GradesData.data[0]?.id); // Set initial grade to the first available grade
    }
  }, [GradesData, selectedGrade]);

  return (
    <main>
      <Tabs
        value={selectedGrade || ""}
        onValueChange={(value) => {
          setSelectedGrade(value);
          setSelectedFilters([]); // Reset section filters
          setSelectedStatus([]); // Reset status filters (optional)
          setPagination((p) => ({ ...p, pageIndex: 0 }));
        }}
      >
        <div className="flex justify-between items-center mb-3">
          <TabsList className="flex-wrap gap-3 h-auto text-muted-foreground bg-accent/50">
            {GradesData?.data.map((grade: any) => (
              <TabsTrigger
                key={grade.id}
                value={grade.id}
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-primary/10 text-xs"
              >
                <GraduationCap className={`size-4 text-muted-foreground`} />
                {grade.grade_level}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div
          className="flex justify-between items-center my-5
        "
        >
          <div className="flex justify-between items-center">
            <p className="flex items-center gap-1 text-sm">
              <Table2 className="size-4 text-violet-500" />
              Students Table
            </p>
          </div>
          <AddStudent />
        </div>

        <div className="bg-accent/10 p-5 rounded-lg ">
          {/* Header Actions */}
          <div className="mb-10 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="relative max-w-md w-80">
                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search Full Name or LRN..."
                  value={search}
                  onChange={handleFilterChange}
                />
              </div>

              <RefreshButton
                isLoading={isLoadingStudent}
                onClick={studentDetails}
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
                setSelectedFilters={setSelectedFilters}
                sectionTypes={sectionTypes}
              />
              <FilterTable
                pagination={pagination}
                setPagination={setPagination}
              />
            </div>
          </div>

          {GradesData?.data.map((grade: any) => {
            const rows = getFilteredData(grade.id);

            return (
              <TabsContent key={grade.id} value={grade.id} className="roune-lg">
                <StudentTable
                  columns={columns({
                    onEdit: (teacherId: string) => {
                      setSelectedTeacherId(teacherId);
                      setEditOpen(true);
                    },
                    onChangeStatus: (studentId: string) => handleStatusChange(studentId),
                  })}
                  data={rows.slice(
                    pagination.pageIndex * pagination.pageSize,
                    (pagination.pageIndex + 1) * pagination.pageSize,
                  )}
                  pagination={pagination}
                  setPagination={setPagination}
                  totalRows={rows.length}
                />

                {selectedTeacherId && (
                  <EditStudent
                    open={editOpen}
                    setOpen={setEditOpen}
                    id={selectedTeacherId}
                  />
                )}
              </TabsContent>
            );
          })}
        </div>
      </Tabs>
    </main>
  );
}
