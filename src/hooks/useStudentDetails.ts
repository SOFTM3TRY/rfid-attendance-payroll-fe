import { toast } from "react-hot-toast";
import {
  UseMutationResult,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CountActiveStudents,
  CountByGradeStudents,
  GetStudentDetails,
  RegisterRFIDToStudent,
  GetStudentDetailsById,
  GetStudentDetailsByLrn,
  EditStudent,
  CountStudentsPerGrade,
  ChangeStudentStatus,
  getStudentAttendanceById,
  UpdateStudentAvatar,
  ChangeStudentPassword,
  CountRegisteredStudents
} from "@/services/Student_service";
import { StdioNull } from "child_process";

export const useStudentDetails = (token: string | null) => {
  return useQuery({
    queryKey: ["student-details"],
    queryFn: () => GetStudentDetails(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCountActiveStudents = (token: string | null) => {
  return useQuery({
    queryKey: ["count-active-students"],
    queryFn: () => CountActiveStudents(token as string),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCountByGradeStudents = (
  token: string | null,
  grade: number,
) => {
  return useQuery({
    queryKey: ["count-by-grade-students", grade],
    queryFn: () => CountByGradeStudents(token as string, grade),
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetStudentDetailsById = (token: string | null, id: any) => {
  return useQuery({
    queryKey: ["get-student-by-id", id],
    queryFn: () => GetStudentDetailsById(token as string, id),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetStudentDetailsByLrn = (
  token: string | null,
  lrn: string,
) => {
  return useQuery({
    queryKey: ["get-student-by-lrn", lrn],
    queryFn: () => GetStudentDetailsByLrn(token as string, lrn),
    enabled: !!token && !!lrn,
  });
};

export const useEditStudnentMutation = (
  token: string | null,
  id: any,
): UseMutationResult<any, Error, any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => EditStudent(token as string, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-details"] });
      toast.success("Student updated successfully");
    },
    onError: () => {
      toast.error("Update failed");
    },
  });
};

export const useCountStudentsPerGrade = (token: string | null) => {
  return useQuery({
    queryKey: ["count-students-per-grade", token],
    enabled: !!token,
    queryFn: async () => {
      if (!token) {
        // ✅ NEVER return undefined
        return { status: false, data: [] };
      }
      return await CountStudentsPerGrade(token);
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useChangeStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id }: { token: string; id: string }) =>
      ChangeStudentStatus(token, id),

    onSuccess: (res) => {
      toast.success(res?.message ?? "Status updated");

      const updatedStudent = res?.data?.student;
      if (updatedStudent) {
        // ✅ Update cached list without refetch delay
        queryClient.setQueryData(["student-details"], (old: any) => {
          if (!old?.data || !Array.isArray(old.data)) return old;

          return {
            ...old,
            data: old.data.map((s: any) =>
              String(s.id) === String(updatedStudent.id) ? updatedStudent : s
            ),
          };
        });
      }

      queryClient.invalidateQueries({ queryKey: ["student-details"] });
    },

    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update status";
      toast.error(msg);
    },
  });
};

export const useGetStudentAttendanceById = (token: string | null, id: any) => {
  return useQuery({
    queryKey: ["get-student-attendance-by-id", id],
    queryFn: () => getStudentAttendanceById(token as string, id),
    enabled: !!token && !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateStudentAvatar = (token: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, avatar }: { id: number; avatar: File }) =>
      UpdateStudentAvatar(token as string, id, avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-details"] });
      toast.success("Student updated successfully");
    },
  });
};

export const useChangeStudentPassword = (token: string | null) => {
  return useMutation({
    mutationFn: ({
      id,
      new_password,
      confirm_password,
    }: {
      id: number;
      new_password: string;
      confirm_password: string;
    }) => ChangeStudentPassword(token as string, id, new_password, confirm_password),
  });
};

export const useGetRegisteredStudent = (token: string | null) => {
  return useQuery({
    queryKey: ["get-registered-student", token],
    enabled: !!token,
    queryFn: async () => {
      if (!token) {
        return { status: false, data: [] };
      }
      return await CountRegisteredStudents(token);
    },
    staleTime: 1000 * 60 * 5,
  });
}
