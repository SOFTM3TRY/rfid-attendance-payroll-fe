import { useStudentForm } from "@/hooks/useStudentForm";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Eye,
  User,
  UserCheck,
  UserX,
  CircleX,
  Loader2,
  Send,
  Printer
} from "lucide-react";

import SplitText from "@/components/animata/text/split-text";

export default function ShowTeacherClass({
  open,
  setOpen,
  row,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: any;
}) {
  const data = row.original || {};
  const fullName = [
    data.last_name,
    data.first_name,
    data.middle_name,
    data.suffix,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3 overflow-x-hidden"
        side="bottom"
      >
        <SheetHeader>
          <SheetDescription className="flex items-center text-center text-md">
            <User className="mr-1 w-4 h-4 text-teal-500" />
            Class
            <span
              className={`text-xs ml-2 w-20 h-5 flex shadow items-center justify-center rounded-full font-medium ${
                data.status == 1
                  ? "bg-green-200 text-green-900 dark:bg-green-100 dark:text-green-800"
                  : "bg-red-200 text-red-900 dark:bg-red-100 dark:text-red-800"
              }`}
            >
              {data.status == 1 ? "Active" : "Inactive"}
              <span className="ml-1">
                {data.status == 1 ? (
                  <UserCheck className="w-4 h-4 text-green-800" />
                ) : (
                  <UserX className="w-4 h-4 text-red-800" />
                )}
              </span>
            </span>
          </SheetDescription>
          <SheetTitle className="uppercase">{fullName}</SheetTitle>
          <SheetDescription>S.Y : {data.school_year}</SheetDescription>
        </SheetHeader>

        <SplitText
          text="Young Generation Academy"
          className="absolute top-15 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />

        <SheetFooter className="fixed bottom-5 right-5">
          <div className="flex items-center justify-end gap-5">
            {data.rfid_uid && (
              <Button
                onClick={() => window.print()}
                className="w-40"
              >
                <Printer  className="mr-0"/> Print
              </Button>
            )}
            <SheetClose asChild>
              <Button
                className="w-40"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                <CircleX /> Close
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

