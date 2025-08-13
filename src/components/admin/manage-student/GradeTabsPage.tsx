"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FiltersDropdown } from "@/components/admin/manage-student/FiltersDropdown";
import { Button } from "@/components/ui/button";
import { GradeTable } from "@/components/admin/manage-student/GradeTable";
import { columns, Section } from "@/components/admin/manage-student/columns";
import { PlusIcon, GraduationCap  } from "lucide-react";

const grades = [
  "Grade One",
  "Grade Two",
  "Grade Three",
  "Grade Four",
  "Grade Five",
  "Grade Six",
];

const baseData: Section[] = [
  {
    LRN: "1234567890",
    FullName: "John Doe",
    Grade: "Grade One",
    Section: 1,
    status: "Active",
  },
  {
    LRN: "0123456789",
    FullName: "Jane Doe",
    Grade: "Grade Two",
    Section: 2,
    status: "Inactive",
  },
  {
    LRN: "9876543210",
    FullName: "Bob Smith",
    Grade: "Grade Three",
    Section: 3,
    status: "Active",
  },
  {
    LRN: "5432109876",
    FullName: "Alice Johnson",
    Grade: "Grade Four",
    Section: 4,
    status: "Inactive",
  },
];

export default function GradeTabsPage() {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredData = baseData.filter((row) =>
    selectedFilters.length === 0
      ? true
      : selectedFilters.includes(`${row.Grade} ${row.Section}`)
  );

  return (
    <main className="">
      <Tabs value={selectedGrade} onValueChange={setSelectedGrade}>
        <div className="flex justify-between mb-3">
          <TabsList className="flex-wrap gap-3">
            {grades.map((grade) => (
              <TabsTrigger key={grade} value={grade}>
                <GraduationCap />{grade}
              </TabsTrigger>
            ))}
          </TabsList>

          <Button variant="outline" className="flex items-center gap-2">
            <PlusIcon className="w-4 h-4" />
            Add Student
          </Button>
        </div>

        <div className="flex justify-between mb-5 mt-5">
          <FiltersDropdown
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </div>

        {grades.map((grade) => (
          <TabsContent key={grade} value={grade}>
            <GradeTable columns={columns} data={filteredData} />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

