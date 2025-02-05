import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

let MainLayout = () => {
  return (
    <div className="flex h-full flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto bg-background px-11">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
