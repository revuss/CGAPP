import { logoutUserAPI } from "@/app/services/adminServices/adminService";

const NavTop = () => {
  const clickLogout = async () => {
    try {
      await logoutUserAPI();
      window.location.reload();
    } catch (error) {
      console.error("Error during call:", error);
    }
  };

  return (
    <div className="flex justify-between w-full font-semibold text-white">
      <span className="  border-none"> Admin</span>
      <p className="cursor-pointer" onClick={clickLogout}>
        Logout
      </p>
    </div>
  );
};

export default NavTop;
