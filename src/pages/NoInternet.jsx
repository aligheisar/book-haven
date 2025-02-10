import Title from "../components/ui/Title";

let NoInternet = () => {
  return (
    <main className="grid h-full w-full -translate-y-12 place-content-center gap-4 text-center">
      <Title>No Internet</Title>
      <p className="text-lg text-secondary-text opacity-80">
        please check your internet Connection
      </p>
    </main>
  );
};

export default NoInternet;
