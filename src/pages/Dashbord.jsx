import DashbordSection from "../Components/DashbordSection";
import UserInformation from "../Components/UserInformation";
import SectionTitle from "../Components/SectionTitle";

let Dashbord = () => {
  return (
    <section className="flex h-full w-full flex-col items-center gap-4 pt-6">
      <DashbordSection>
        <SectionTitle>Account Information</SectionTitle>
        <UserInformation />
      </DashbordSection>
      {/* <DashbordSection>SOME OTHER INFO</DashbordSection> */}
    </section>
  );
};

export default Dashbord;
