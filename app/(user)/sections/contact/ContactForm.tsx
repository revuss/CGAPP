"use client";
import Button from "@/app/global/components/button";
import Input from "@/app/global/components/input";
import TextArea from "@/app/global/components/textarea";
import { ContactFormValues, contactSchema } from "../../form/contactValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { handleNumericInput } from "@/app/global/util/validations";
import { useAddContact } from "@/app/services/userServices/userHooks";
import { toast } from "sonner";

function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { mutate } = useAddContact();

  const onSubmit = (data: ContactFormValues) => {
    mutate(data, {
      onSuccess: (res) => {
        if (res.statusCode === "SUCCESS") {
          toast.success(
            res.message || "Message received! We’ll connect with you shortly."
          );
          reset();
        } else {
          toast.info(res?.message);
        }
      },
    });
    console.log(data);
  };

  return (
    <section>
      <h2 className="text-xl py-2 font-bold text-primary bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent"></h2>
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="name"
          placeholder="Name"
          autoComplete="off"
          {...register("name")}
          errors={errors.name && errors.name.message}
        />
        <Input
          label="phonNumber"
          maxLength={10}
          placeholder="Phone Number"
          {...register("phoneNumber")}
          autoComplete="off"
          onChange={(e) => handleNumericInput(e, "phoneNumber", setValue)}
          errors={errors.phoneNumber && errors.phoneNumber.message}
        />
        <Input
          label="email"
          placeholder="Email"
          autoComplete="off"
          {...register("email")}
          errors={errors.email && errors.email.message}
        />
        <TextArea
          label="Message"
          placeholder="Write your message here..."
          id="message"
          autoComplete="off"
          {...register("message")}
          errors={errors.message && errors.message.message}
        />
        <Button text="Submit" type="submit" />
      </form>
    </section>
  );
}

export default ContactForm;
