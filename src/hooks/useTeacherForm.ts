import { useAuth } from "@/context/AuthContext";
import { CreateTeacher } from "@/services/Teacher_service";
import { useState } from "react";
import toast from "react-hot-toast";
import { useStudentDetails } from "./useStudentDetails";

export function useTeacherForm() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = useAuth();
  const { refetch: refetchStudent } = useStudentDetails(token as string);
  const [formData, setFormData] = useState<any>({
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
  });

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
      const response = await CreateTeacher(token as any, formData);
      toast.success("Teacher created successfully");
      refetchStudent();
      setOpen(false);
      setFormData({
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
      });
    } catch (error) {
      console.error(error);
      // @ts-ignore
      const { data } = error.response;
      setErrors({ ...errors, ...data.errors });
      toast.error(data.message);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  return {
    step, setStep, open, setOpen, loading, errors, setErrors,
    handlePrevStep, handleNextStep, handleSubmit,
    formData, setFormData
  };
}

