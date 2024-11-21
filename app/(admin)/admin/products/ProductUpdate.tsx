import Button from "@/app/global/components/button";
import Input from "@/app/global/components/input";
import { useUpdateProduct } from "@/app/services/adminServices/adminHooks";
import { Controller, useForm } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ProductUpdate = ({ closeMe, userDetails }: any) => {
  const fetchDataOptions = {
    pageIndex: 0,
    pageSize: 5,
    sortCol: "",
    sortOrder: "",
  };

  const { mutate } = useUpdateProduct(fetchDataOptions);

  const onSubmit = (data: any) => {
    const sendData = {
      id: userDetails.id,
      productName: data.productName,
      productDescription: data.productDescription,
      tagLine: data.tagLine,
      imageUrl: data.imageUrl,
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
      productDescription: userDetails.productDescription,
      productName: userDetails.productName,
      imageUrl: userDetails.imageUrl,
      tagLine: userDetails.tagLine,
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
              <p className="font-semibold ml-1">Product Name</p>

              <Controller
                name="productName"
                control={control}
                rules={{ required: "Product name required" }}
                render={({ field }) => (
                  <Input
                    label="product name"
                    placeholder="Product Name"
                    {...field}
                    errors={
                      errors.productName && String(errors.productName.message)
                    }
                  />
                )}
              />
            </div>
            <div>
              <p className="font-semibold ml-1">Product Description</p>

              <Controller
                name="productDescription"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    type="text"
                    placeholder="Name"
                    label="name"
                    {...field}
                    errors={
                      errors.productDescription &&
                      String(errors.productDescription.message)
                    }
                  />
                )}
              />
            </div>
            <div>
              <p className="font-semibold ml-1">Product Image</p>

              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Image URL"
                    label="Image URL"
                    {...field}
                    errors={errors.imageUrl && String(errors.imageUrl.message)}
                  />
                )}
              />
            </div>
            <div>
              <p className="font-semibold ml-1">Product TagLine</p>
              <Controller
                name="tagLine"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Tag line"
                    placeholder="TagLine"
                    {...field}
                    errors={errors.tagLine && String(errors.tagLine.message)}
                  />
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

export default ProductUpdate;
