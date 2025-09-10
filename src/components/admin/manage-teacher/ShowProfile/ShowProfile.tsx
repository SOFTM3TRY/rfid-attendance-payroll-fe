// // ShowProfile.tsx
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { User, UserCheck, UserX, CircleX } from "lucide-react";

// import PrimaryInfo from "@/components/admin/manage-teacher/ShowProfile/PrimaryInfoStudent";
// import BasicInfo from "@/components/admin/manage-teacher/ShowProfile/BasicInfo";
// import AddressInfo from "@/components/admin/manage-teacher/ShowProfile/AddressInfo";
// import GuardianInfo from "@/components/admin/manage-teacher/ShowProfile/GuardianInfo";

// import { TotalStatus } from "@/components/admin/manage-teacher/ShowProfile/TotalStatus";

// import { useTeacherDetails } from "@/hooks/useTeacher";

// import SplitText from "@/components/animata/text/split-text";

// export default function ShowProfile({
//   open,
//   setOpen,
//   row,
//   trigger,
// }: {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   row: any;
//   trigger?: React.ReactNode;
// }) {
//   const data = row.original || {};
//   const fullName = [
//     data.last_name,
//     data.first_name,
//     data.middle_name,
//     data.suffix,
//   ]
//     .filter(Boolean)
//     .join(" ");

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
//       <SheetContent
//         className="bottom-0 h-full rounded-t-md overflow-y-auto p-3"
//         side="bottom"
//       >
//         <SheetHeader>
//           <SheetDescription className="flex items-center text-center text-md">
//             <User className="mr-1 w-4 h-4 text-teal-500" />
//             Student Profile
//             <span
//               className={`text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
//                 data.status == 1
//                   ? "bg-green-200 text-green-900 dark:bg-green-100 dark:text-green-800"
//                   : "bg-red-200 text-red-900 dark:bg-red-100 dark:text-red-800"
//               }`}
//             >
//               {data.status == 1 ? "Active" : "Inactive"}
//               <span className="ml-1">
//                 {data.status == 1 ? (
//                   <UserCheck className="w-4 h-4 text-green-800" />
//                 ) : (
//                   <UserX className="w-4 h-4 text-red-800" />
//                 )}
//               </span>
//             </span>
//           </SheetDescription>
//           <SheetTitle className="uppercase">{fullName}</SheetTitle>
//           <SheetDescription>S.Y : {data.school_year}</SheetDescription>
//         </SheetHeader>
        
//         <SplitText
//           text="Young Generation Academy"
//           className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//         />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 p-5">
//           {/* Avatar + Primary */}
//           <div className="col-span-1 rounded-md">
//             <PrimaryInfo data={data} fullName={fullName} />

//             <BasicInfo data={data} />
//             <AddressInfo data={data.additional_info || {}} />
//             <GuardianInfo data={data.additional_info || {}} />
//           </div>
//           <div className="col-span-1 md:col-span-2 rounded-md h-full bg-zinc-100 dark:bg-zinc-900 p-5">
//             <div className="sticky top-0 z-500">
//               <span className="text-lg font-medium shadow-lg flex items-center bg-zinc-200 dark:bg-zinc-800 py-2 px-3 rounded-full">
//                 <User className="w-8 h-8 text-white p-1 mr-2 bg-teal-500 rounded-full" />{" "}
//                 Student <span className="text-teal-500 mx-2">{fullName}</span>{" "}
//                 Attendance S.Y {data.school_year}
//               </span>
//             </div>
//             <div className="mt-10">
//               <TotalStatus />
//             </div>

//             <div className="p-5">
//               <Attendance lrn={data.lrn} grade={data.grade_id} />
//             </div>
//           </div>
//         </div>

//         <SheetFooter className="fixed bottom-5 right-5">
//           <SheetClose asChild>
//             <Button
//               className="w-40"
//               variant="outline"
//               onClick={() => setOpen(false)}
//             >
//               <CircleX /> Close
//             </Button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleX, User, Code2 } from "lucide-react";
import { useTeacherDetails } from "@/hooks/useTeacher";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function ShowProfile({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
}) {
  const id = row.original.id;
  const { token } = useAuth();
  const [showJson, setShowJson] = useState(false);

  const { data, isLoading, error } = useTeacherDetails(token, { id });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="h-full overflow-y-auto p-6" side="bottom">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-teal-500" />
            Teacher Details
          </SheetTitle>
        </SheetHeader>

        {isLoading && <p>Loading teacher details...</p>}
        {error && <p className="text-red-500">Error loading teacher data.</p>}

        {data && (
          <div className="mt-4 space-y-6 text-sm">
            <div>
              <h3 className="font-semibold text-teal-600 mb-1">Full Name</h3>
              <p>{`${data.last_name}, ${data.first_name} ${data.middle_name || ""} ${data.suffix || ""}`}</p>
            </div>

            {/* Example of showing grade/section */}
            <div>
              <h3 className="font-semibold text-teal-600 mb-1">Grade & Section</h3>
              <p>{`Grade ${data.grade_id} - Section ${data.section}`}</p>
            </div>

            {/* Toggle JSON */}
            <div>
              <Button variant="ghost" className="text-xs" onClick={() => setShowJson(!showJson)}>
                <Code2 className="w-4 h-4" /> {showJson ? "Hide JSON" : "Show JSON"}
              </Button>
              {showJson && (
                <pre className="mt-2 p-3 bg-gray-100 text-xs overflow-x-auto rounded">
                  {JSON.stringify(data, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}

        <SheetFooter className="mt-10">
          <SheetClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              <CircleX className="mr-2" /> Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
