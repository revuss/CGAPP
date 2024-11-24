import Button from "@/app/global/components/button";
import { useState } from "react";
import VisitorDelete from "./VisitorDelete";

/* eslint-disable @typescript-eslint/no-explicit-any */
const VisitorAction = ({ infoData }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        text="Delete"
        buttonStyle="py-1 px-4"
        onClick={() => {
          setOpen(true);
        }}
      >
        Delete
      </Button>
      {open && (
        <VisitorDelete
          closeMe={() => {
            setOpen(false);
          }}
          userId={infoData.id}
        />
      )}
    </>
  );
};

export default VisitorAction;
