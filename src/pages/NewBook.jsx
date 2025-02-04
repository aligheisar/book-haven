import SectionTitle from "../Components/SectionTitle";
import GenreInput from "../Components/ui/GenreInput";
import Button from "../Components/ui/Button.tsx";
import FormInput from "../Components/ui/FormInput";
import FormTextarea from "../Components/ui/FormTextarea";
import FormBookImage from "../Components/ui/FormBookImage";
import { GetNewBook } from "../Context/NewBookContex.jsx";

let NewBook = () => {
  let { formData, handleFileChange, handleFormChange, image } = GetNewBook();

  return (
    <section className="flex h-full items-center">
      <section className="flex flex-col gap-4 rounded-xl bg-surface px-3 py-4">
        <SectionTitle>New Book</SectionTitle>
        <form className="flex flex-col gap-4">
          <div className="flex gap-3">
            <FormBookImage handleFileChange={handleFileChange} url={image} />
            <div>
              <FormInput
                label="Title"
                placeholder="Enter book title"
                name="title"
                onChange={handleFormChange}
                value={formData.title.value}
                error={formData.title.error}
              />
              <FormTextarea
                label="Description"
                placeholder="Enter description"
                name="description"
                onChange={handleFormChange}
                value={formData.description.value}
                error={formData.description.error}
              />
              <FormInput
                label="Price"
                placeholder="Enter Price"
                name="price"
                type="number"
                onChange={handleFormChange}
                value={formData.price.value}
                error={formData.price.error}
              />
              <GenreInput />
            </div>
          </div>
          <Button varient="dim" className="rounded-md">
            Submit
          </Button>
        </form>
      </section>
    </section>
  );
};

export default NewBook;
