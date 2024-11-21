/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductAPI,
  deleteCareerAPI,
  deleteContactAPI,
  deleteProductAPI,
  deleteUserAPI,
  deleteVisitorsAPI,
  loginUserAPI,
  registerUserAPI,
  updateProductAPI,
  updaterUserAPI,
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
    mutationFn: async (id: string) => {
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

export function useDeleteCareers(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteCareerAPI(id);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Record Deleted");
        queryClient.invalidateQueries({
          queryKey: ["careersData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.error || "Career not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}

export function useDeleteContacts(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteContactAPI(id);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Record Deleted");
        queryClient.invalidateQueries({
          queryKey: ["contactData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.error || "Contacts not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}

export function useUpdateUser(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await updaterUserAPI(data);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Record Updated");
        queryClient.invalidateQueries({
          queryKey: ["usersData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.details || "User not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}

export function useDeleteUser(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return await deleteUserAPI(id);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Record Deleted");
        queryClient.invalidateQueries({
          queryKey: ["usersData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.error || "User not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}

export function useCreateProduct(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await createProductAPI(data);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Product Added");
        queryClient.invalidateQueries({
          queryKey: ["productsData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.details || "Product not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}

export function useDeleteProduct(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await deleteProductAPI(data);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Product Deleted");
        queryClient.invalidateQueries({
          queryKey: ["productsData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.error || "Product not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}

export function useUpdateProduct(fetchDataOptions: any) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      return await updateProductAPI(data);
    },
    onSuccess: (res: any) => {
      if (res.statusCode === "SUCCESS") {
        toast.success(res?.message || "Product Updated");
        queryClient.invalidateQueries({
          queryKey: ["productsData", fetchDataOptions],
        });
      } else {
        toast.error(res?.error || "An unexpected error occurred");
      }
    },
    onError: (err: any) => {
      if (err.statusCode === "FAILED") {
        toast.error(err?.details || "Product not found");
      } else {
        toast.error(err?.error || "An unexpected error occurred");
      }
    },
  });
  return { mutate };
}
