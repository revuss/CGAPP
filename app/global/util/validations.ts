/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormSetValue } from "react-hook-form";

export const handleNumericInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldName: string,
  setValue: UseFormSetValue<any>
) => {
  const numericValue = e.target.value.replace(/[^0-9]/g, "");
  setValue(fieldName, numericValue, { shouldValidate: true });
};

export const handleNoSpacesInput = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldName: string,
  setValue: UseFormSetValue<any>
) => {
  const valueWithoutSpaces = e.target.value.replace(/\s+/g, "");
  setValue(fieldName, valueWithoutSpaces, { shouldValidate: true });
};
