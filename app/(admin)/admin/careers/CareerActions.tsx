/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/app/global/components/button";
import { useState } from "react";
import CareersDelete from "./CareerDelete";

const CareersAction = ({ infoData, refetch }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        text="Delete"
        buttonStyle="py-1"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete
      </Button>
      {open && (
        <CareersDelete
          closeMe={() => {
            setOpen(false);
          }}
          userId={infoData.id}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default CareersAction;
