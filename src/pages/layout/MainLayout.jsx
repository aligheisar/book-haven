import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";

let MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="h-full overflow-y-auto bg-background">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
