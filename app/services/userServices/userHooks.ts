import { useMutation } from "@tanstack/react-query";
import { userVisit } from "./userServices";

export function useUserVisit() {
  const mutation = useMutation({
    mutationFn: userVisit,
  });

  return mutation;
}
