import Button from "@/app/global/components/button";
import Input from "@/app/global/components/input";
import { useUpdateUser } from "@/app/services/adminServices/adminHooks";
import { Controller, useForm } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
const UserUpdate = ({ closeMe, userDetails }: any) => {
  const fetchDataOptions = {
    pageIndex: 0,
    pageSize: 5,
    sortCol: "",
    sortOrder: "",
  };

  const { mutate } = useUpdateUser(fetchDataOptions);

  const onSubmit = (data: any) => {
    const sendData = {
      id: userDetails.id,
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      statusBlocked: data.statusBlocked,
      authorized: data.authorized,
      failedPasswords: parseInt(data.failedPasswords, 10) || 0,
    };
    mutate(sendData);
    setTimeout(() => {
      closeMe();
    }, 1000);
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userDetails.email,
      name: userDetails.name,
      phoneNumber: userDetails.phoneNumber,
      statusBlocked: userDetails.statusBlocked,
      failedPasswords: userDetails.failedPasswords,
      authorized: userDetails.authorized,
    },
  });

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-secondary font-medium"
          >
            <div>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <Input
                    label="email"
                    placeholder="Email"
                    type="email"
                    {...field}
                    errors={errors.email && String(errors.email.message)}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Name"
                    label="name"
                    {...field}
                    errors={errors.name && String(errors.name.message)}
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Phone Number"
                    label="Phone Number"
                    maxLength={10}
                    {...field}
                    errors={
                      errors.phoneNumber && String(errors.phoneNumber.message)
                    }
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="failedPasswords"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Failed Passwords"
                    placeholder="Failed Password Count"
                    type="number"
                    maxLength={1}
                    {...field}
                    errors={
                      errors.failedPasswords &&
                      String(errors.failedPasswords.message)
                    }
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600 text-sm font-medium">
                Status Blocked
              </label>
              <Controller
                name="statusBlocked"
                control={control}
                render={({ field }: any) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`${
                      field.value ? "bg-red-500" : "bg-gray-300"
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    <span
                      className={`${
                        field.value ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </button>
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-600 text-sm font-medium">
                Authorized
              </label>
              <Controller
                name="authorized"
                control={control}
                render={({ field }) => (
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className={`${
                      field.value ? "bg-green-500" : "bg-gray-300"
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    <span
                      className={`${
                        field.value ? "translate-x-6" : "translate-x-1"
                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                    />
                  </button>
                )}
              />
            </div>
            <div className="mt-6 flex justify-end gap-x-4">
              <Button type="button" onClick={closeMe} text="Cancel" />
              <Button type="submit" text="Save Changes" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
