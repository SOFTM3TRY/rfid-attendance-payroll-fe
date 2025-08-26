// components/AddStudent/Step4Review.tsx
import { ShieldUser, UserLock } from "lucide-react";

type Props = {
  formData: any;
};

const Step4Review = ({ formData }: Props) => {
  return (
    <div className="p-4 rounded-md text-sm overflow-auto max-h-auto">
      <pre className="whitespace-pre-wrap hidden">
        {JSON.stringify(formData, null, 2)}
      </pre>

      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-blue-700 dark:text-blue-500">
          <ShieldUser className="mr-2" />
          Primary Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">LRN : </span>
            <span className="text-sm font-light">{formData.lrn}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Grade : </span>
            <span className="text-sm font-light">{formData.grade}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Section : </span>
            <span className="text-sm font-light">{formData.section}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">School Year : </span>
            <span className="text-sm font-light">{formData.school_year}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mt-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-green-700 dark:text-green-500">
          <UserLock className="mr-2" />
          Personal Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">First Name : </span>
            <span className="text-sm font-light">{formData.first_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Middle Name : </span>
            <span className="text-sm font-light">{formData.middle_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Last Name : </span>
            <span className="text-sm font-light">{formData.last_name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Suffix : </span>
            <span className="text-sm font-light">{formData.suffix}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Role : </span>
            <span className="text-sm font-light">{formData.role}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Gender : </span>
            <span className="text-sm font-light">{formData.gender}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Address : </span>
            <span className="text-sm font-light">{formData.address}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Student Status : </span>
            <span className="text-sm font-light">
              {formData.student_status}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-md p-5 mt-5 mb-10">
        <span className="text-lg font-semibold mb-5 flex items-center text-yellow-700 dark:text-yellow-500">
          <UserLock className="mr-2" />
          Personal Information
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Last School Attended:{" "}
            </span>
            <span className="text-sm font-light">
              {formData.last_school_attend}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Street: </span>
            <span className="text-sm font-light">{formData.street}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Barangay: </span>
            <span className="text-sm font-light">{formData.barangay}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">City: </span>
            <span className="text-sm font-light">{formData.city}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Province: </span>
            <span className="text-sm font-light">{formData.province}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian First Name: </span>
            <span className="text-sm font-light">
              {formData.guardian_first_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              Guardian Middle Name:{" "}
            </span>
            <span className="text-sm font-light">
              {formData.guardian_middle_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Last Name: </span>
            <span className="text-sm font-light">
              {formData.guardian_last_name}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Employment: </span>
            <span className="text-sm font-light">
              {formData.guardian_employment}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Contact: </span>
            <span className="text-sm font-light">
              {formData.guardian_contact}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Guardian Email: </span>
            <span className="text-sm font-light">
              {formData.guardian_email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Review;
