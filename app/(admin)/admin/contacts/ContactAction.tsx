/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@/app/global/components/button";
import React, { useState } from "react";
import ContactDelete from "./ContactDelete";

const ContactAction = ({ infoData }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        text="Delete"
        buttonStyle="py-1"
        onClick={() => {
          console.log(infoData);
          setOpen(true);
        }}
      >
        Delete
      </Button>
      {open && (
        <ContactDelete
          closeMe={() => {
            setOpen(false);
          }}
          userId={infoData.id}
        />
      )}
    </>
  );
};

export default ContactAction;
