import dynamic from "next/dynamic";

const Authenticate = dynamic(() => import("../components/Authenticate"));
const Login = dynamic(() => import("../sections/auth/Login"));
const page = () => {
  return (
    <div className="select-none">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <Authenticate
            header="Trusted Solutions for Advanced Wound Care"
            description=" Sign in to access, update, and manage critical information.
          Streamline care coordination and ensure top-tier therapies with
          our innovative wound care solutions."
            redirectText="New to Our Platform"
            linkNavigate="register"
            linkText="Register"
          />
          <Login />
        </div>
      </div>
    </div>
  );
};

export default page;
