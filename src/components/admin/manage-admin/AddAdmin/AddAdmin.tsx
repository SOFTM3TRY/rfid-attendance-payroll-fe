"use client";

import { useTeacherForm } from "@/hooks/useAdminForm";
import Step2 from "@/components/admin/manage-admin/AddAdmin/Step2PersonalInfo";
import Step3 from "@/components/admin/manage-admin/AddAdmin/Step3AdditionalInfo";
import Step4 from "@/components/admin/manage-admin/AddAdmin/Step4Review";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  UserRoundPlus,
  ChevronsRight,
  ChevronsLeft,
  CircleX,
  CircleCheck,
  UserLock,
  ContactRound,
  ScanEye,
  Send,
  Loader2,
} from "lucide-react";
import { useEffect } from "react";

export default function AddAdmin() {
  const {
    step,
    setStep,
    open,
    setOpen,
    loading,
    errors,
    handlePrevStep,
    handleNextStep,
    handleSubmit,
    setErrors,
    formData,
    setFormData,
  } = useTeacherForm();

  useEffect(() => {
    if (formData === null) {
      setStep(1);
    }
  }, [formData, setStep]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center text-sm rounded-full"
        >
          <PlusIcon
            strokeWidth={3}
            className="bg-primary rounded-full text-teal-900 p-0.5 size-4"
          />
          Add Admin
        </Button>
      </SheetTrigger>

      <SheetContent
        className="bottom-0 h-[95%] rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader className="text-zinc-900 mb-4">
          <SheetTitle className="flex items-center">
            <UserRoundPlus className="mr-2 w-5 h-5 text-teal-500" />
            Add Admin
          </SheetTitle>
          <SheetDescription>
            Enter details to add a new admin to the system
          </SheetDescription>
        </SheetHeader>

        <Tabs value={`step${step}`} className="w-full p-5">
          <TabsList className="grid w-full grid-cols-3 mb-4 gap-5 h-20">
            <TabsTrigger
              value="step1"
              disabled={step < 1}
              className={`flex items-start justify-start p-3 ${
                step === 1
                  ? "border-2 border-green-500 dark:border-green-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-green-700 dark:text-green-500 flex gap-1 items-center justify-center">
                    <UserLock className="mr-1" /> Basic Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 1{" "}
                    {step > 1 && (
                      <CircleCheck
                        size={20}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="step2"
              disabled={step < 2}
              className={`flex items-start justify-start p-3 ${
                step === 2 ? "border-2 border-sky-500 dark:border-sky-500" : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-yellow-700 dark:text-yellow-500 flex gap-1 items-center justify-center">
                    <ContactRound className="mr-1" /> Additional Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 2{" "}
                    {step > 2 && (
                      <CircleCheck
                        size={20}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="step3"
              disabled={step < 3}
              className={`flex items-start justify-start p-3 ${
                step === 3
                  ? "border-2 border-teal-500 dark:border-teal-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-teal-700 dark:text-teal-500 flex gap-1 items-center justify-center">
                    <ScanEye className="mr-1" /> Review Details
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 3
                  </h1>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step1" className="p-5 mt-5">
            <Step2
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="step2" className="p-5 mt-5">
            <Step3
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
            />
          </TabsContent>

          <TabsContent value="step3" className="p-5 mt-5">
            <Step4
              formData={formData}
              onBack={() => setStep(1)}
              hasData={Object.keys(formData).length > 0}
            />
          </TabsContent>
        </Tabs>

        <SheetFooter className="fixed bottom-5 right-10 mt-10">
          <div className="flex gap-2 justify-end">
            {step > 1 && (
              <Button
                onClick={handlePrevStep}
                disabled={loading}
                className="w-40"
              >
                <ChevronsLeft />
                Back
              </Button>
            )}

            <div>
              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="w-40"
                  disabled={loading}
                >
                  Next <ChevronsRight />
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    await handleSubmit();
                    setStep(1);
                  }}
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
                      Submit <Send className="ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>

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