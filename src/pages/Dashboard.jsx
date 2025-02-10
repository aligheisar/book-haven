import DashboardSection from "../components/DashboardSection";
import AccountInformation from "../components/AccountInformation";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/ui/Button.tsx";
import { Add } from "../components/ui/Icons";
import { Link } from "react-router-dom";
import UserBooks from "../components/UserBooks";

let Dashboard = () => {
  return (
    <section className="flex h-full w-full items-start justify-center gap-4 pt-6">
      <DashboardSection>
        <SectionTitle>Account Information</SectionTitle>
        <AccountInformation />
      </DashboardSection>
      <DashboardSection className="max-w-none flex-1">
        <div className="flex items-center justify-between">
          <SectionTitle className="text-start">Your Books</SectionTitle>
          <Link to="/new-book">
            <Button varient="outlined" Icon={<Add inher size="18" />}>
              Add Book
            </Button>
          </Link>
        </div>
        <UserBooks />
      </DashboardSection>
    </section>
  );
};

export default Dashboard;
