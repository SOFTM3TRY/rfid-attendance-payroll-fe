import { GetSectionsByGrade, GetAllSections, CreateSection, EditSection, getSectionById } from "@/services/Section_service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export const useSection = (token: string | null, gradeId: string) => {
  return useQuery({
    queryKey: ['sections-by-grade', gradeId],
    queryFn: () => GetSectionsByGrade(token as string, gradeId),
    enabled: !!token && !!gradeId,  
    staleTime: 1000 * 60 * 5,
  });
};

export const useAllSections = (token: string | null) => {
  return useQuery({
    queryKey: ['get-all-sections'],
    queryFn: () => GetAllSections(token as string),
    enabled: !!token,  
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, data }: { token: string; data: any }) =>
      CreateSection(token, data),
    onSuccess: () => {
      toast.success("Grade created successfully");
      queryClient.invalidateQueries({ queryKey: ["get-all-sections"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create new grade");
      }
    },
  });
};

export const useGetSectionById = (token: string | null, gradeId: string) => {
  return useQuery({
    queryKey: ["section-by-id", gradeId],
    queryFn: () => getSectionById(token as string, gradeId),
    enabled: !!token && !!gradeId,
    staleTime: 1000 * 60 * 5,
  });
};


export const  useEditSection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, id, data }: { token: string; id: string; data: any }) =>
      EditSection(token, id, data),
    onSuccess: () => {
      toast.success("Grade updated successfully");
      queryClient.invalidateQueries({ queryKey: ["get-all-sections"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update grade");
      }
    },
  });
};