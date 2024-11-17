import { z } from "zod";

export const careerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Mobile number must be at least 10 digits." }),
});

export type CareerFormValues = z.infer<typeof careerSchema>;
