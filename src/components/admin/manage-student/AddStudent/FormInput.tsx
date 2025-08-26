// components/AddStudent/FormInput.tsx

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
  isDropdown?: boolean;
  options?: string[];
};

const FormInput = ({
  id,
  label,
  value,
  error,
  onChange,
  disabled = false,
  isDropdown = false,
  options = [],
}: Props) => {
  const isLRN = id === "lrn";

  const handleLRNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");
    if (onlyNumbers.length <= 12) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: onlyNumbers,
          name: "lrn",
        },
      });
    }
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor={id}>
        <span className="text-red-500 mr-[-0.3rem]">*</span>
        {label}
      </Label>

      {isDropdown ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`border rounded-sm px-3 py-1 dark:bg-zinc-900 ${
            error ? "border-red-500" : ""
          }`}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <Input
          id={id}
          name={id}
          type={isLRN ? "text" : "text"}
          inputMode={isLRN ? "numeric" : undefined}
          pattern={isLRN ? "\\d{12}" : undefined}
          placeholder={isLRN ? "Enter 12-digit LRN" : `Enter ${label}`}
          maxLength={isLRN ? 12 : undefined}
          value={value}
          onChange={isLRN ? handleLRNChange : onChange}
          className={error ? "border border-red-500" : ""}
          disabled={disabled}
        />
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
