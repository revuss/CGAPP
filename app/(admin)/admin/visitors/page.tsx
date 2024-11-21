import PageHeader from "../../components/PageHeader";
import VisitorMain from "./VisitorMain";

function page() {
  return (
    <div className="min-h-screen justify-center overflow-visible items-center p-2 rounded-lg-auto ">
      <div className="w-full flex justify-between">
        <PageHeader
          title="Visitors Page"
          description=" Manage visitor records with options to view and delete entries as
        needed."
        />
      </div>
      <VisitorMain />
    </div>
  );
}

export default page;
