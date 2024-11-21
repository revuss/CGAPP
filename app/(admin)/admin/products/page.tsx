"use client";
import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "@/app/global/components/button";
import ProductAdd from "./ProductAdd";
import ProductsMain from "./ProductsMain";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="min-h-screen justify-center overflow-visible items-center p-2 rounded-lg-auto ">
      <div className="w-full flex justify-between">
        <PageHeader
          title="Products Page"
          description="View and manage product details, including images, descriptions, and tags for each item in the catalog."
        />
        <Button
          text="Add Product"
          buttonStyle="max-w-[200px]"
          onClick={handleOpen}
        />
      </div>
      <ProductsMain />

      {open && <ProductAdd closeMe={handleClose} />}
    </div>
  );
};

export default Page;
