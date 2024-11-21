/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/app/global/components/button";
import { useState } from "react";
import ProductDelete from "./ProductDelete";
import ProductUpdate from "./ProductUpdate";

const ProductActions = ({ infoData, refetch }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        buttonStyle="min-w-[100px] py-[2.7px]"
        onClick={() => {
          setOpen(true);
        }}
        text="Edit"
      />

      <Button
        buttonStyle="min-w-[100px] py-[2.7px] bg-red-500"
        onClick={() => {
          setDeleteOpen(true);
        }}
        text="Delete"
      />
      {open && (
        <ProductUpdate
          closeMe={() => {
            setOpen(false);
          }}
          userDetails={infoData}
        />
      )}
      {deleteOpen && (
        <ProductDelete
          closeMe={() => {
            setDeleteOpen(false);
          }}
          userId={infoData.id}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ProductActions;
