// hooks/useTeacherForm.ts
import { useAuth } from "@/context/AuthContext";
import { CreateTeacher } from "@/services/Teacher_service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAllAdmins } from "./useTeacher";

export function useTeacherForm(existingData: any = null) {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = useAuth();
  const { refetch: refetchTeachers } = useAllAdmins(token as string);

  const defaultFormData = {
    grade: "",
    section: "",
    school_year: "",
    status: "1",
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
    region: "",
  };

  const [formData, setFormData] = useState<any>(defaultFormData);

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

  // ✅ Step 1 = Basic Information
  // ✅ Step 2 = Additional Information
  // ✅ Step 3 = Review only
  const stepFieldsMap: Record<number, string[]> = {
    1: [
      "first_name",
      "last_name",
      "contact_no",
      "email",
      "birth_place",
      "birth_date",
      "gender",
      "status",
    ],
    2: [
      "region",
      "province",
      "city",
      "barangay",
      "street",
      "emergency_fname",
      "emergency_lname",
      "emergency_contact",
    ],
    3: [],
  };

  const optionalFields = [
    "grade",
    "section",
    "school_year",
    "middle_name",
    "suffix",
    "role_id",
    "emergency_mname",
    "birth_place",
    "birth_date",
    "status",
    "emergency_fname",
    "emergency_lname",
    "emergency_contact",
  ];

  const validateStep = () => {
    const requiredFields = stepFieldsMap[step] || [];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = formData[field];

      if (
        !optionalFields.includes(field) &&
        (!value || !value.toString().trim())
      ) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });

    // extra email validation
    if (step === 1 && formData.email) {
      const email = String(formData.email).trim();
      if (
        !email.endsWith("@gmail.com") ||
        email.length <= "@gmail.com".length
      ) {
        newErrors.email = "Email must end with @gmail.com";
      }
    }

    // extra contact validation
    if (step === 1 && formData.contact_no) {
      const contact = String(formData.contact_no).trim();
      if (!/^\+639\d{9}$/.test(contact)) {
        newErrors.contact_no = "Contact number must be valid";
      }
    }

    if (step === 2 && formData.emergency_contact) {
      const emergency = String(formData.emergency_contact).trim();
      if (!/^\+639\d{9}$/.test(emergency)) {
        newErrors.emergency_contact = "Emergency contact must be valid";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep() && step < 3) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
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
      setStep(1);

      if (!existingData) {
        setFormData(defaultFormData);
      }
    } catch (error: any) {
      const { data } = error.response || {};
      setErrors((prev) => ({
        ...prev,
        ...(data?.errors || {}),
      }));
      toast.error(data?.message || "An error occurred");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return {
    step,
    setStep,
    open,
    setOpen,
    loading,
    errors,
    setErrors,
    handlePrevStep,
    handleNextStep,
    handleSubmit,
    formData,
    setFormData,
  };
}
