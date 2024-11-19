import { logoutUserAPI } from "@/app/services/adminServices/adminService";
import { useRouter } from "next/navigation";

const NavTop = () => {
  const router = useRouter();

  const clickLogout = async () => {
    try {
      await logoutUserAPI();
      router.push("/login");
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
      {/* {isPending && <Appspinner />} */}
    </div>
  );
};

export default NavTop;
