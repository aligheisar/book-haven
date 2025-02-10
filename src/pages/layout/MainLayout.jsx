import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

let MainLayout = () => {
  return (
    <div className="custom-scroll-big flex h-full flex-col overflow-y-auto overflow-x-hidden">
      <Navbar />
      <main className="mb-4 flex-1 bg-background px-11">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
