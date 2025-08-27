import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default function ShowAttendanceHistory({ open, setOpen, row }: { open: boolean, setOpen: (open: boolean) => void, row: any }) {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-full rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader>
          <SheetTitle>Attendance History</SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <pre className="whitespace-pre-wrap">{JSON.stringify(row.original, null, 2)}</pre>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}