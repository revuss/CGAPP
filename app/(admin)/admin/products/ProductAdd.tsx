import Button from "@/app/global/components/button";
import Input from "@/app/global/components/input";
import { useCreateProduct } from "@/app/services/adminServices/adminHooks";
import { Controller, useForm, SubmitHandler } from "react-hook-form";

interface ProductFormValues {
  productName: string;
  productDescription: string;
  tagLine: string;
  imageUrl: string;
}

interface ProductAddProps {
  closeMe: () => void;
}

const ProductAdd: React.FC<ProductAddProps> = ({ closeMe }) => {
  const fetchDataOptions = {
    pageIndex: 0,
    pageSize: 5,
    sortCol: "",
    sortOrder: "",
  };

  const { mutate } = useCreateProduct(fetchDataOptions);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      productName: "",
      productDescription: "",
      tagLine: "",
      imageUrl: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    const sendData = {
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
              <label className="font-semibold ml-1">Product Name</label>
              <Controller
                name="productName"
                control={control}
                rules={{ required: "Product name is required" }}
                render={({ field }) => (
                  <Input
                    label="Product Name"
                    placeholder="Enter product name"
                    {...field}
                    errors={errors.productName?.message}
                  />
                )}
              />
            </div>
            <div>
              <label className="font-semibold ml-1">Product Description</label>
              <Controller
                name="productDescription"
                control={control}
                rules={{ required: "Product description is required" }}
                render={({ field }) => (
                  <Input
                    label="Product description"
                    placeholder="Enter product description"
                    {...field}
                    errors={errors.productDescription?.message}
                  />
                )}
              />
            </div>
            <div>
              <label className="font-semibold ml-1">Product Image</label>
              <Controller
                name="imageUrl"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Product Image"
                    placeholder="Enter image URL"
                    {...field}
                    errors={errors.imageUrl?.message}
                  />
                )}
              />
            </div>
            <div>
              <label className="font-semibold ml-1">Product Tag Line</label>
              <Controller
                name="tagLine"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Product Tag"
                    placeholder="Enter tag line"
                    {...field}
                    errors={errors.tagLine?.message}
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

export default ProductAdd;
