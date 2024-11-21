import PageHeader from "../../components/PageHeader";
import CareersMain from "./CareerMain";

const Page = () => {
  return (
    <div className="min-h-screen justify-center overflow-visible items-center p-2 rounded-lg-auto ">
      <div className="w-full flex justify-between">
        <PageHeader
          title="Career Page"
          description="Review applications, and oversee recruitment to build and grow the team."
        />
      </div>
      <CareersMain />
    </div>
  );
};

export default Page;
