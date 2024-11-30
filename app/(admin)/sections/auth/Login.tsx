/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { LoginFormValues, loginSchema } from "../../forms/loginValidation";
import Input from "@/app/global/components/input";
import Button from "@/app/global/components/button";
import { useLogin } from "@/app/services/adminServices/adminHooks";
import { useRouter } from "next/navigation";
import AppSpinner from "../../components/AppSpinner";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res?.statusCode === "SUCCESS") {
          toast.success(res?.message);
          setTimeout(() => {
            router.push("/admin");
          }, 150);
        } else {
          toast.error(res?.error);
        }
      },
    });
  };

  if (isPending) {
    return <AppSpinner />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md md:ml-auto max-md:mx-auto font-medium w-full text-secondary"
    >
      <h3 className="text-3xl font-extrabold mb-8 max-md:text-center bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
        Sign In
      </h3>
      <div>
        <Input
          label="email"
          placeholder="Email"
          autoComplete="off"
          {...register("email")}
          errors={errors.email && errors.email.message}
        />
      </div>
      <div className="relative flex items-center">
        <Input
          label="password"
          placeholder="Password"
          autoComplete="off"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          errors={errors.password && errors.password.message}
        />
        <div
          className="absolute right-5 cursor-pointer ml-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      </div>

      <div>
        <Button text="Login" />
      </div>
    </form>
  );
};

export default Login;
