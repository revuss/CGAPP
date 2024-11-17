import { SlideFromRight } from "@/app/global/components/animations";
import Button from "@/app/global/components/button";
import Input from "@/app/global/components/input";
import { CareerFormValues, careerSchema } from "../../form/careerValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleNumericInput } from "@/app/global/util/validations";

function CareerForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: CareerFormValues) => {
    console.log(data);
    // mutate(data, {
    //   onSuccess: (res) => {
    //     if (res?.statusCode === "SUCCESS") {
    //       toast.success(res?.message || "Your career form has been submitted!");
    //     }
    //   },
    // });
  };

  return (
    <form
      className="md:w-[60%] w-[80%] space-y-2 my-10 items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SlideFromRight>
        <Input
          label="name"
          placeholder="Enter Your Name"
          autoComplete="off"
          {...register("name")}
          errors={errors.name && errors.name.message}
        />
      </SlideFromRight>
      <SlideFromRight>
        <Input
          label="Email"
          placeholder="Enter Your Mail"
          autoComplete="off"
          {...register("email")}
          errors={errors.email && errors.email.message}
        />
      </SlideFromRight>

      <SlideFromRight>
        <Input
          label="phoneNumber"
          placeholder="Enter Your Mobile Number"
          {...register("phoneNumber")}
          autoComplete="off"
          onChange={(e) => handleNumericInput(e, "phoneNumber", setValue)}
          errors={errors.phoneNumber && errors.phoneNumber.message}
        />
      </SlideFromRight>

      <SlideFromRight>
        <Button text="Apply" type="submit" />
      </SlideFromRight>
    </form>
  );
}

export default CareerForm;
