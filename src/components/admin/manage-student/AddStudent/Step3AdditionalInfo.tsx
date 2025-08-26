// components/AddStudent/Step3AdditionalInfo.tsx
import FormInput from "@/components/admin/manage-student/AddStudent/FormInput";

type Props = {
  formData: any;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  loading: boolean;
};

const Step3AdditionalInfo = ({ formData, errors, onChange, loading }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
      <FormInput id="last_school_attend" label="Last School Attended" value={formData.last_school_attend} error={errors.last_school_attend} onChange={onChange} disabled={loading} />
      <FormInput id="street" label="Street" value={formData.street} error={errors.street} onChange={onChange} disabled={loading} />
      <FormInput id="barangay" label="Barangay" value={formData.barangay} error={errors.barangay} onChange={onChange} disabled={loading} />
      <FormInput id="city" label="City" value={formData.city} error={errors.city} onChange={onChange} disabled={loading} />
      <FormInput id="province" label="Province" value={formData.province} error={errors.province} onChange={onChange} disabled={loading} />
      <FormInput id="guardian_first_name" label="Guardian First Name" value={formData.guardian_first_name} error={errors.guardian_first_name} onChange={onChange} disabled={loading} />
      <FormInput id="guardian_middle_name" label="Guardian Middle Name" value={formData.guardian_middle_name} error={errors.guardian_middle_name} onChange={onChange} disabled={loading} />
      <FormInput id="guardian_last_name" label="Guardian Last Name" value={formData.guardian_last_name} error={errors.guardian_last_name} onChange={onChange} disabled={loading} />
      <FormInput id="guardian_employment" label="Guardian Employment" value={formData.guardian_employment} error={errors.guardian_employment} onChange={onChange} disabled={loading} />
      <FormInput id="guardian_contact" label="Guardian Contact" value={formData.guardian_contact} error={errors.guardian_contact} onChange={onChange} disabled={loading} />
      <FormInput id="guardian_email" label="Guardian Email" value={formData.guardian_email} error={errors.guardian_email} onChange={onChange} disabled={loading} />
    </div>
  );
};

export default Step3AdditionalInfo;
