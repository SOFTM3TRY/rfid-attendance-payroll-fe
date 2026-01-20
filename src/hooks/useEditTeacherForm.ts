// import { useAuth } from "@/context/AuthContext";
// import { UpdateStudent } from "@/services/Student_service";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useTeacherDetails } from "./useTeacher";

// export function useEditTeacherForm(existingData?: any) {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const { token } = useAuth();
//   const { refetch: refetchTeacher } = useTeacherDetails(token as string, { id: existingData?.id });

//   const defaultData = {
//     lrn: "",
//     grade: "",
//     section: "",
//     school_year: "",
//     first_name: "",
//     middle_name: "",
//     last_name: "",
//     suffix: "",
//     role: "student",
//     gender: "",
//     birth_place: "",
//     birth_date: "",
//     student_status: "",
//     last_school_attend: "",
//     street: "",
//     region: "",
//     province: "",
//     city: "",
//     barangay: "",
//     relationship: "",
//     guardian_first_name: "",
//     guardian_middle_name: "",
//     guardian_last_name: "",
//     guardian_occupation: "",
//     guardian_contact: "",
//     guardian_email: "",
//   };

//   const [formData, setFormData] = useState<any>(defaultData);

//   //Prefill form with existing data (edit mode)
//   useEffect(() => {
//     if (existingData) {
//       const flatData = {
//         ...existingData,
//         ...existingData.additional_info,
//       };
//       setFormData((prev: any) => ({ ...prev, ...flatData }));
//     }
//   }, [existingData]);

//   const stepFieldsMap: Record<number, string[]> = {
//     1: ["lrn", "grade", "section", "school_year"],
//     2: [
//       "first_name", "middle_name", "last_name", "suffix", "role", "gender",
//       "birth_place", "birth_date", "student_status", "last_school_attend"
//     ],
//     3: [
//       "region", "province", "city", "barangay", "street",
//       "guardian_first_name", "guardian_middle_name", "guardian_last_name",
//       "guardian_occupation", "guardian_contact", "guardian_email", "relationship"
//     ],
//   };

//   const validateStep = () => {
//     const requiredFields = stepFieldsMap[step] || [];
//     const newErrors: Record<string, string> = {};
//     requiredFields.forEach(field => {
//       if (
//         !formData[field]?.trim() &&
//         !["middle_name", "suffix", "role", "guardian_middle_name"].includes(field)
//       ) {
//         newErrors[field] = `${field.replace(/_/g, " ")} is required`;
//       }
//     });
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleNextStep = () => {
//     if (validateStep() && step < 4) setStep(step + 1);
//   };

//   const handlePrevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSubmit = async () => {
//     if (!existingData?.id) return;

//     setLoading(true);
//     try {
//       await UpdateStudent(token as string, existingData.id, formData);
//       toast.success("Student updated successfully");
//       refetchTeacher();
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to update student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     step, setStep,
//     loading,
//     errors, setErrors,
//     handlePrevStep, handleNextStep,
//     handleSubmit,
//     formData, setFormData,
//   };
// }
