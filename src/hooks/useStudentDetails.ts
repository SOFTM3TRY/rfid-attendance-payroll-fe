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