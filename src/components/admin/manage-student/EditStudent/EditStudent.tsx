import { useStudentForm } from "@/hooks/useStudentForm";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  UserRoundPlus,
  ChevronsRight,
  ChevronsLeft,
  CircleX,
  ShieldUser,
  CircleCheck,
  UserLock,
  ContactRound,
  ScanEye,
  Send,
  Loader2,
  User,
} from "lucide-react";

export default function EditStudent({ open, setOpen, row }: { open: boolean, setOpen: (open: boolean) => void, row: any }) {
  const {
    step, setStep, loading, errors,
    handlePrevStep, handleNextStep, handleSubmit, setErrors,
    formData, setFormData
  } = useStudentForm();

  const data = row?.original || {}; // ✅ Extract data from row

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        className="bottom-0 h-[95%] rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader className="text-zinc-900 mb-4">
          <SheetTitle className="flex items-center">
            <User className="mr-2 w-5 h-5 text-teal-500" />
            Edit Student Profile
          </SheetTitle>
          <SheetDescription>
            Enter details to edit the student profile.
          </SheetDescription>
        </SheetHeader>

        {/* ✅ Display student data */}
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(data, null, 2)}
        </pre>

        {/* Steps or form content can go here (Step1, Step2, etc.) */}

        <SheetFooter className="fixed bottom-5 right-10 mt-10">
          <div className="flex gap-2 justify-end">
            <Button
              onClick={handleSubmit}
              className="w-40"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Processing...
                </>
              ) : (
                <>
                  Update <Send className="ml-2" />
                </>
              )}
            </Button>
            <SheetClose asChild>
              <Button variant="ghost" className="w-40" disabled={loading}>
                <CircleX />
                Cancel
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
