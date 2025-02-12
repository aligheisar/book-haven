import { Loading } from "./ui/Icons";

let BooksLoading = () => {
  return (
    <section className="flex items-center justify-center gap-1 fill-secondary-text text-secondary-text">
      <Loading inher className="animate-spin" size={24} />
      <p>Loading Books</p>
    </section>
  );
};

export default BooksLoading;
