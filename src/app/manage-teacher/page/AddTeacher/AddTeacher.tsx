import { useTeacherForm } from "@/hooks/useTeacherForm";
import Step1 from "@/app/manage-teacher/page/AddTeacher/Step1PrimaryInfo";
import Step2 from "@/app/manage-teacher/page/AddTeacher/Step2PersonalInfo";
import Step3 from "@/app/manage-teacher/page/AddTeacher/Step3AdditionalInfo";
import Step4 from "@/app/manage-teacher/page/AddTeacher/Step4Review";
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
  ShieldUser,
  CircleCheck,
  UserLock,
  ContactRound,
  ScanEye,
  Send,
  Loader2,
  Contact,
} from "lucide-react";

import { useEffect } from "react";

export default function AddTeacher() {
  const {
    step,
    setStep,
    open,
    setOpen,
    loading,
    errors,
    handlePrevStep,
    handleSubmit,
    setErrors,
    formData,
    setFormData,
  } = useTeacherForm();

  useEffect(() => {
    if (formData === null) {
      setStep(1);
    }
  }, [formData]);

  const isEmailValid = (email: string) => {
    return email.endsWith("@gmail.com") && email.length > "@gmail.com".length;
  };

  const handleNextStep = () => {
    // STEP 2 VALIDATIONS
    if (step === 1) {
      // --- Required fields ---
      const requiredFields = ["grade", "section", "school_year"];

      for (const field of requiredFields) {
        if (!formData[field]) {
          setErrors((prev: any) => ({
            ...prev,
            [field]: "This field is required.",
          }));
          return; // Stop moving forward
        }
      }
    }
    // STEP 2 VALIDATIONS
    if (step === 2) {
      // --- Required fields ---
      const requiredFields = [
        "first_name",
        "last_name",
        "gender",
        "birth_place",
        "birth_date",
        "email",
        "contact_no",
      ];

      for (const field of requiredFields) {
        if (!formData[field]) {
          setErrors((prev: any) => ({
            ...prev,
            [field]: "This field is required.",
          }));
          return; // Stop moving forward
        }
      }

      // --- Email validation ---
      if (!isEmailValid(formData.email)) {
        setErrors((prev: any) => ({
          ...prev,
          email: "Email must end with @gmail.com",
        }));
        return; // Stop moving forward
      }

      // --- Birthdate / Age Validation (Must be 18+) ---
      if (!formData.birth_date) {
        setErrors((prev: any) => ({
          ...prev,
          birth_date: "Birth date is required.",
        }));
        return;
      }

      const today = new Date();
      const birth = new Date(formData.birth_date);

      if (isNaN(birth.getTime())) {
        setErrors((prev: any) => ({
          ...prev,
          birth_date: "Invalid birth date.",
        }));
        return;
      }

      const age =
        today.getFullYear() -
        birth.getFullYear() -
        (today <
        new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
          ? 1
          : 0);

      if (age < 18) {
        setErrors((prev: any) => ({
          ...prev,
          birth_date: "Age must be 18 or above.",
        }));
        return; // Stop moving forward
      }
    }

    // // STEP 3 VALIDATIONS
    // if (step === 3) {
    //   // --- Required fields ---
    //   const requiredFields = [
    //     "region",
    //     "province",
    //     "city",
    //     "barangay",
    //     "street",
    //     "emergency_fname",
    //     "emergency_lname",
    //     "emergency_relation",
    //     "emergency_contact",
    //   ];

    //   for (const field of requiredFields) {
    //     if (!formData[field]) {
    //       setErrors((prev: any) => ({
    //         ...prev,
    //         [field]: "This field is required.",
    //       }));
    //       return; // Stop moving forward
    //     }
    //   }
    // }

    // Move to next step
    setStep(step + 1);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center justify-center text-sm  rounded-full"
        >
          <PlusIcon
            strokeWidth={3}
            className="bg-primary rounded-full text-teal-900 p-0.5 size-4"
          />
          Add Teacher
        </Button>
      </SheetTrigger>

      <SheetContent
        className="bottom-0 h-[95%] rounded-t-md overflow-y-auto p-3"
        side="bottom"
      >
        <SheetHeader className="text-zinc-900 mb-4">
          <SheetTitle className="flex items-center">
            <UserRoundPlus className="mr-1 size-5 text-teal-500" />
            Add Teacher
          </SheetTitle>
          <SheetDescription className="text-sm">
            Enter details to add a new teacher to the system
          </SheetDescription>
        </SheetHeader>

        <Tabs value={`step${step}`} className="w-full p-5 rounded-xl">
          <TabsList className="grid w-full grid-cols-4 mb-4 gap-5 h-20 bg-accent/20">
            <TabsTrigger
              value="step1"
              disabled={step < 1}
              className={`flex items-start justify-start p-3 ${
                step === 1
                  ? "border-2 border-blue-500 dark:border-blue-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-blue-700 dark:text-blue-500 flex gap-1 items-center justify-center">
                    <ShieldUser className="mr-1" /> Primary Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 1{" "}
                    {step !== 1 && (
                      <CircleCheck
                        size={50}
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
                step === 2
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
                    Step 2{" "}
                    {step !== 1 && step !== 2 && (
                      <CircleCheck
                        size={50}
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
                step === 3 ? "border-2 border-sky-500 dark:border-sky-500" : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-yellow-700 dark:text-yellow-500 flex gap-1 items-center justify-center">
                    <ContactRound className="mr-1" /> Additional Information
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 3{" "}
                    {step !== 1 && step !== 2 && step !== 3 && (
                      <CircleCheck
                        size={50}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>

            <TabsTrigger
              value="step4"
              disabled={step < 4}
              className={`flex items-start justify-start p-3 ${
                step === 4
                  ? "border-2 border-teal-500 dark:border-teal-500"
                  : ""
              }`}
            >
              <div className="flex gap-2">
                <div className="text-start">
                  <small className="text-sm text-teal-700 dark:text-teal-500 flex gap-1 items-center justify-center">
                    <ScanEye className="mr-1" /> Review Student details -{" "}
                    <small>Last Step</small>
                  </small>
                  <h1 className="text-lg font-semibold ml-0 flex items-center justify-start">
                    Step 4{" "}
                    {step !== 1 && step !== 2 && step !== 3 && step !== 4 && (
                      <CircleCheck
                        size={50}
                        strokeWidth={2}
                        className="ml-1 text-green-500"
                      />
                    )}
                  </h1>
                </div>
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step1" className="mt-5">
            <Step1
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="step2" className="mt-5">
            <Step2
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="step3" className="mt-5">
            <Step3
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              loading={loading}
            />
          </TabsContent>
          <TabsContent value="step4" className="mt-5">
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
                className="rounded-full"
                size="sm"
                variant="destructive"
              >
                <ChevronsLeft className="size-3" />
                Back
              </Button>
            )}
            <div>
              {step < 4 ? (
                <Button
                  onClick={handleNextStep}
                  className="rounded-full"
                  disabled={loading}
                  size="sm"
                >
                  Next <ChevronsRight />
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleSubmit().then(() => setStep(1));
                  }}
                  className="rounded-full"
                  disabled={loading}
                  size="sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin size-3" size={18} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit <Send className="size-3" />
                    </>
                  )}
                </Button>
              )}
            </div>
            <SheetClose asChild>
              <Button
                variant="outline"
                className="rounded-full"
                disabled={loading}
                size="sm"
              >
                <CircleX className="size-3" />
                Cancel
              </Button>
            </SheetClose>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
