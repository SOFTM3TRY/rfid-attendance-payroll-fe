import { useAuth } from "@/context/AuthContext";
import { CreateStudent } from "@/services/Student_service";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useStudentDetails } from "./useStudentDetails";

export function useStudentForm() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = useAuth();
  const { refetch: refetchStudent } = useStudentDetails(token as string);

  const [formData, setFormData] = useState<any>({
    lrn: "",
    grade: "",
    section: "",
    school_year: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    role: "student",
    email: "",
    gender: "",
    birth_place: "",
    birth_date: "",
    student_status: "active",
    last_school_attend: "",
    street: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    relationship: "",
    guardian_first_name: "",
    guardian_middle_name: "",
    guardian_last_name: "",
    guardian_occupation: "",
    guardian_contact: "",
    guardian_email: "",
  });

  // 🔹 Automatically generate email when first_name or last_name changes
  useEffect(() => {
    const { first_name, last_name } = formData;
    if (first_name && last_name) {
      const email = `${first_name.toLowerCase()}${last_name.toLowerCase()}@yga.edu.ph`;
      setFormData((prev: any) => ({ ...prev, email }));
    }
  }, [formData.first_name, formData.last_name]);

  const stepFieldsMap: Record<number, string[]> = {
    1: ["lrn", "grade", "section", "school_year"],
    2: [
      "first_name", "middle_name", "last_name", "suffix", "role", "email", "gender",
      "birth_place", "birth_date", "student_status", "last_school_attend"
    ],
    3: [
      "region", "province", "city", "barangay", "street",
      "guardian_first_name", "guardian_middle_name", "guardian_last_name",
      "guardian_occupation", "guardian_contact", "guardian_email", "relationship"
    ],
  };

  const validateStep = () => {
    const requiredFields = stepFieldsMap[step] || [];
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      const value = formData[field];
      if (
        typeof value === "string" &&
        !value.trim() &&
        !["middle_name", "suffix", "guardian_middle_name", "student_status"].includes(field)
      ) {
        newErrors[field] = `${field.replace(/_/g, " ")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const isEmailValid = (guardian_email: string) => {
    return guardian_email.endsWith("@gmail.com") && guardian_email.length > "@gmail.com".length;
  };

  const handleNextStep = () => {
    if (step === 3) {
      // Check Step2 email
      if (!isEmailValid(formData.guardian_email)) {
        setErrors((prev: any) => ({
          ...prev,
          email: "Email must end with @gmail.com",
        }));
        return; // Stop moving forward
      }
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await CreateStudent(token as any, formData);
      toast.success("Student created successfully");
      setFormData({
        lrn: "",
        grade: "",
        section: "",
        school_year: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        role: "student",
        email: "",
        gender: "",
        birth_place: "",
        birth_date: "",
        student_status: "",
        last_school_attend: "",
        street: "",
        region: "",
        province: "",
        city: "",
        barangay: "",
        relationship: "",
        guardian_first_name: "",
        guardian_middle_name: "",
        guardian_last_name: "",
        guardian_occupation: "",
        guardian_contact: "",
        guardian_email: "",
      });
      refetchStudent();
      setOpen(false);
    } catch (error: any) {
      const { response: { data: { message } } } = error;
      toast.error(message);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return {
    step, setStep, open, setOpen, loading, errors, setErrors,
    handlePrevStep, handleNextStep, handleSubmit,
    formData, setFormData
  };
}
