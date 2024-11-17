import dynamic from "next/dynamic";

const ContactMain = dynamic(() => import("../sections/contact/ContactMain"));
function page() {
  return (
    <div>
      <ContactMain />
    </div>
  );
}

export default page;
