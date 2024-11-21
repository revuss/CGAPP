/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteVisitorsAPI,
  loginUserAPI,
  registerUserAPI,
} from "./adminService";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RegisterInterface {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface LoginInterface {
  email: string;
  password: string;
}
export function useRegister() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegisterInterface) => {
      return await registerUserAPI(data);
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError && err.response) {
        toast.error(err.response.data.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
      router.push("/register");
    },
  });

  return { mutate, isPending };
}

export function useLogin() {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginInterface) => {
      return loginUserAPI(data);
    },
    onError: (err: any) => {
      if (err) {
        toast.error(err?.error || "An error occurred");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
      router.push("/login");
    },
  });

  return { mutate, isPending };
}

export function useDeleteVisitors(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteVisitorsAPI(id);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Record Deleted");
        queryClient.invalidateQueries({
          queryKey: ["visitorsData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.error || "Visitor not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}
