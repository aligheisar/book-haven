import DashbordSection from "../Components/DashbordSection";
import UserInformation from "../Components/UserInformation";
import SectionTitle from "../Components/SectionTitle";

let Dashbord = () => {
  return (
    <section className="flex h-full w-full items-start justify-center gap-4 pt-6">
      <DashbordSection>
        <SectionTitle>Account Information</SectionTitle>
        <UserInformation />
      </DashbordSection>
      <DashbordSection className="max-w-none flex-1">
        <SectionTitle className="text-start">Your Books</SectionTitle>
      </DashbordSection>
    </section>
  );
};

export default Dashbord;
