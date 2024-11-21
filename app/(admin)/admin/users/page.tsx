import PageHeader from "../../components/PageHeader";
import UserMain from "./UserMain";

const page = () => {
  return (
    <div className="min-h-screen justify-center overflow-visible items-center p-2 rounded-lg-auto ">
      <div className="w-full flex justify-between">
        <PageHeader
          title="User Page"
          description="View and manage user profiles, update account details, and monitor account statuses."
        />
      </div>
      <UserMain />
    </div>
  );
};

export default page;
