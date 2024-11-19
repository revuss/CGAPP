import { useMutation } from "@tanstack/react-query";
import { userVisit } from "./userServices";
import { AxiosError } from "axios";

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
