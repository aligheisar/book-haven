import DashbordSection from "../Components/DashbordSection";
import UserInformation from "../Components/UserInformation";
import { GetAuth } from "../Context/AuthContext";

let Dashbord = () => {
  let { user } = GetAuth();

  return (
    <section className="flex h-full w-full flex-col items-center gap-2 pt-6">
      <DashbordSection>
        <h1 className="font-serif text-2xl text-secondary-text">
          Account Information
        </h1>
        <UserInformation />
      </DashbordSection>
      <DashbordSection>SOME OTHER INFO</DashbordSection>
    </section>
  );
};

export default Dashbord;
