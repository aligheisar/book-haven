import DashbordSection from "../Components/DashbordSection";
import AccountInformation from "../Components/AccountInformation";
import SectionTitle from "../Components/SectionTitle";
import Button from "../Components/ui/Button.tsx";
import { Add } from "../Components/ui/Icons";
import { Link } from "react-router-dom";
import UserBooks from "../Components/UserBooks";

let Dashbord = () => {
  return (
    <section className="flex h-full w-full items-start justify-center gap-4 pt-6">
      <DashbordSection>
        <SectionTitle>Account Information</SectionTitle>
        <AccountInformation />
      </DashbordSection>
      <DashbordSection className="max-w-none flex-1">
        <div className="flex items-center justify-between">
          <SectionTitle className="text-start">Your Books</SectionTitle>
          <Link to="/new-book">
            <Button varient="outlined" Icon={<Add inher size="18" />}>
              Add Book
            </Button>
          </Link>
        </div>
        <UserBooks />
      </DashbordSection>
    </section>
  );
};

export default Dashbord;
