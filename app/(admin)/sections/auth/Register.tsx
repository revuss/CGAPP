"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  RegisterFormValues,
  registerSchema,
} from "../../forms/registerValidation";
import Input from "@/app/global/components/input";
import {
  handleNoSpacesInput,
  handleNumericInput,
} from "@/app/global/util/validations";
import Button from "@/app/global/components/button";

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const onSubmit = (data: RegisterFormValues) => {};
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md md:ml-auto max-md:mx-auto font-medium w-full text-secondary"
    >
      <h3 className="text-3xl font-extrabold mb-8 max-md:text-center bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
        Register
      </h3>
      <div>
        <Input
          label="name"
          placeholder="Name"
          {...register("name")}
          autoComplete="off"
          errors={errors.name && errors.name.message}
        />
      </div>
      <div>
        <Input
          label="email"
          placeholder="Email"
          {...register("email")}
          autoComplete="off"
          errors={errors.email && errors.email.message}
        />
      </div>
      <div>
        <Input
          label="MobileNumber"
          placeholder="Mobile Number"
          maxLength={10}
          {...register("phoneNumber")}
          autoComplete="off"
          onChange={(e) => handleNumericInput(e, "phoneNumber", setValue)}
          errors={errors.phoneNumber && errors.phoneNumber.message}
        />
      </div>

      <div className="relative flex items-center">
        <Input
          {...register("password")}
          label="Password"
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          autoComplete="off"
          onChange={(e) => handleNoSpacesInput(e, "password", setValue)}
          errors={errors.password && errors.password.message}
        />
        <div
          className="absolute right-5 cursor-pointer ml-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>

      <div className="relative flex items-center">
        <Input
          {...register("confirmPassword")}
          label="Confirm Password"
          placeholder="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          autoComplete="off"
          onChange={(e) => handleNoSpacesInput(e, "confirmPassword", setValue)}
          errors={errors.confirmPassword && errors.confirmPassword.message}
        />
        <div
          className="absolute right-5 cursor-pointer ml-2"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>
      <div>
        <Button text="Register" />
      </div>
    </form>
  );
};

export default Register;
