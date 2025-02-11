import DashboardSection from "../components/DashboardSection";
import AccountInformation from "../components/AccountInformation";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/ui/Button.tsx";
import { Add, Refresh } from "../components/ui/Icons";
import { Link } from "react-router-dom";
import UserBooks from "../components/UserBooks";
import { GetUser } from "../context/UserContext";

let Dashboard = () => {
  let { fetchUserBooks } = GetUser();

  return (
    <section className="flex h-full w-full items-start justify-center gap-4 pt-6">
      <DashboardSection className="max-w-[380px] shrink-0">
        <SectionTitle>Account Information</SectionTitle>
        <AccountInformation />
      </DashboardSection>
      <DashboardSection className="flex-1">
        <div className="flex items-center justify-between">
          <SectionTitle className="text-start">Your Books</SectionTitle>
          <div className="flex items-center gap-2">
            <span
              onClick={fetchUserBooks}
              className="rounded-sm fill-secondary-text p-2 hover:bg-text/5"
            >
              <Refresh size={16} inher />
            </span>
            <Link to="/new-book">
              <Button varient="outlined" Icon={<Add inher size="18" />}>
                Add Book
              </Button>
            </Link>
          </div>
        </div>
        <UserBooks />
      </DashboardSection>
    </section>
  );
};

export default Dashboard;
