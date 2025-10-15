// hooks/useTeacherForm.ts
import { useAuth } from "@/context/AuthContext";
import { CreateTeacher } from "@/services/Teacher_service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAllTeachers } from "./useTeacher";

export function useTeacherForm(existingData: any = null) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = useAuth();
  const { refetch: refetchTeachers } = useAllTeachers(token as string);

  const defaultFormData = {
    grade: "",
    section: "",
    school_year: "",
    status: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    suffix: "",
    contact_no: "",
    email: "",
    role_id: "2",
    birth_date: "",
    birth_place: "",
    gender: "",
    province: "",
    city: "",
    barangay: "",
    street: "",
    emergency_contact: "",
    emergency_fname: "",
    emergency_lname: "",
    emergency_mname: "",
  };

  const [formData, setFormData] = useState<any>(defaultFormData);

  // Prefill form for editing
  useEffect(() => {
    if (existingData) {
      const flatData = {
        ...existingData,
        ...existingData?.additional_info,
      };
      setFormData((prev: any) => ({
        ...prev,
        ...flatData,
      }));
    }
  }, [existingData]);

  const stepFieldsMap: Record<number, string[]> = {
    1: ["grade", "section", "school_year"],
    2: [
      "first_name", "middle_name", "last_name", "suffix", "contact_no", "email", "role_id",
      "birth_place", "birth_date", "gender", "status",
    ],
    3: [
      "province", "city", "barangay", "street",
      "emergency_fname", "emergency_mname", "emergency_lname", "emergency_contact"
    ],
  };

  const validateStep = () => {
    const requiredFields = stepFieldsMap[step] || [];
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      if (
        !formData[field]?.toString().trim() &&
        !["middle_name", "suffix", "role_id", "emergency_mname"].includes(field)
      ) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep() && step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (existingData?.id) {
        // await UpdateTeacher(token as string, existingData.id, formData);
        toast.success("Teacher updated successfully");
      } else {
        await CreateTeacher(token as string, formData);
        toast.success("Teacher created successfully");
      }

      refetchTeachers();
      setOpen(false);

      // Reset only if creating
      if (!existingData) {
        setFormData(defaultFormData);
      }

    } catch (error: any) {
      const { data } = error.response || {};
      setErrors({ ...errors, ...data?.errors });
      toast.error(data?.message || "An error occurred");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return {
    step, setStep,
    open, setOpen,
    loading,
    errors, setErrors,
    handlePrevStep, handleNextStep,
    handleSubmit,
    formData, setFormData,
  };
}
