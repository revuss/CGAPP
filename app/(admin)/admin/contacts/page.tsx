import PageHeader from "../../components/PageHeader";
import ContactsMain from "./ContactsMain";

const Page = () => {
  return (
    <div className="min-h-screen justify-center overflow-visible items-center p-2 rounded-lg-auto ">
      <div className="w-full flex justify-between">
        <PageHeader
          title="Contact Page"
          description="Manage contact inquiries and view message details to stay connected with user feedback and requests."
        />
      </div>
      <ContactsMain />
    </div>
  );
};

export default Page;
