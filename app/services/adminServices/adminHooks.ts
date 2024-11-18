/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { loginUserAPI, registerUserAPI } from "./adminService";
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
