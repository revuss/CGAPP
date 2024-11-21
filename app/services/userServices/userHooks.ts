import { useMutation } from "@tanstack/react-query";
import { addCareerAPI, addContactAPI, userVisit } from "./userServices";
import { AxiosError } from "axios";
import { toast } from "sonner";

export function useVisit() {
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await userVisit();
    },
    onError: (err: unknown) => {
      if (err instanceof AxiosError && err.response) {
        console.log(err);
      } else {
        console.log(err);
      }
    },
  });
  return { mutate };
}

export function useAddContact() {
  const { mutate } = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phoneNumber: string;
      message: string;
    }) => {
      return await addContactAPI(data);
    },
    onError: (err: any) => {
      toast.info(err?.message || "An unexpected error occurred");
    },
  });

  return { mutate };
}

export function useAddCareers() {
  const { mutate } = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phoneNumber: string;
    }) => {
      return await addCareerAPI(data);
    },
    onError: (err: any) => {
      toast.info(err?.message || "An unexpected error occurred");
    },
  });

  return { mutate };
}
