import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Contact Us - CytoGenesis",
  description:
    "Get in touch with CytoGenesis to learn more about our advanced wound care solutions. We're here to assist with any questions or inquiries.",
  keywords: [
    "Contact CytoGenesis",
    "wound care inquiries",
    "fibroblast therapy questions",
    "customer support",
    "contact wound care specialists",
  ],
};

const ContactMain = dynamic(() => import("../sections/contact/ContactMain"));
function page() {
  return (
    <div>
      <ContactMain />
    </div>
  );
}

export default page;
