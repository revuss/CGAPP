import dynamic from "next/dynamic";

const Authenticate = dynamic(() => import("../components/Authenticate"));
const Register = dynamic(() => import("../sections/auth/Register"));
function page() {
  return (
    <div className="select-none">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <Authenticate
            header="Trusted Solutions for Advanced Wound Care"
            description="Create an account to manage essential information, coordinate care
          seamlessly, and access cutting-edge wound therapy tools that drive
          effective healing and recovery."
            linkNavigate="login"
            redirectText="Already have an account"
            linkText="Login In"
          />
          <Register />
        </div>
      </div>
    </div>
  );
}

export default page;
