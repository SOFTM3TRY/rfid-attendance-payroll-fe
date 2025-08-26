// components/AddStudent/Step2PersonalInfo.tsx
import FormInput from "@/components/admin/manage-student/AddStudent/FormInput";

type Props = {
  formData: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  loading: boolean;
};

const suffixOptions = ["Jr.", "Sr.", "I", "II", "III", "IV", "V"];

const Step2PersonalInfo = ({ formData, errors, onChange, loading }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <FormInput id="first_name" label="First Name" value={formData.first_name} error={errors.first_name} onChange={onChange} disabled={loading} />
      <FormInput id="middle_name" label="Middle Name" value={formData.middle_name} error={errors.middle_name} onChange={onChange} disabled={loading} />
      <FormInput id="last_name" label="Last Name" value={formData.last_name} error={errors.last_name} onChange={onChange} disabled={loading} />
      <FormInput id="suffix" label="Suffix" value={formData.suffix} error={errors.suffix} onChange={onChange} disabled={loading} isDropdown options={suffixOptions} />
      <FormInput id="role" label="Role" value={formData.role} error={errors.role} onChange={onChange} disabled={loading} />
      <FormInput id="gender" label="Gender" value={formData.gender} error={errors.gender} onChange={onChange} disabled={loading} />
      <FormInput id="address" label="Address" value={formData.address} error={errors.address} onChange={onChange} disabled={loading} />
      <FormInput id="student_status" label="Student Status" value={formData.student_status} error={errors.student_status} onChange={onChange} disabled={loading} />
    </div>
  );
};

export default Step2PersonalInfo;
