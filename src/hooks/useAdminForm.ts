import { useAuth } from "@/context/AuthContext";
import { CreateStudent } from "@/services/Student_service";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStudentDetails } from "./useStudentDetails";

export function useAdminForm() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = useAuth();
  const { refetch: refetchStudent } = useStudentDetails(token as string);
  const [formData, setFormData] = useState<any>({
    employeeNumber: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    role: "teacher",
    gender: "",
    birth_place: "",
    birth_date: "",
    teacher_status: "",
    personal_email: "",
    contact_number: "",
    street: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    emergency_fname: "",
    emergency_mname: "",
    emergency_lname: "",
    emergency_contact: "",
  });

  const stepFieldsMap: Record<number, string[]> = {
    1: ["employeeNumber"],
    2: [
      "first_name", "middle_name", "last_name", "suffix", "role", "gender",
      "birth_place", "birth_date", "student_status", "personal_email", "contact_number"
    ],
    3: [
      "region", "province", "city", "barangay", "street",
      "emergency_fname", "emergency_mname", "emergency_lname", "emergency_contact"
    ],
  };

  const validateStep = () => {
    const requiredFields = stepFieldsMap[step] || [];
    const newErrors: Record<string, string> = {};
    requiredFields.forEach(field => {
      if (
        !formData[field]?.trim() &&
        !["middle_name", "suffix", "role", "emergency_mname"].includes(field)
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
   const response = await CreateStudent(token as any, formData);
   toast.success("Student created successfully");
   refetchStudent();
   setOpen(false);
   } catch (error) {
    console.log(error);
   }
    setTimeout(() => setLoading(false), 1000);
  };

  return {
    step, setStep, open, setOpen, loading, errors, setErrors,
    handlePrevStep, handleNextStep, handleSubmit,
    formData, setFormData
  };
}