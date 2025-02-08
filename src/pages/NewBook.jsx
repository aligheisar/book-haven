import SectionTitle from "../Components/SectionTitle";
import GenreInput from "../Components/ui/GenreInput";
import Button from "../Components/ui/Button.tsx";
import FormInput from "../Components/ui/FormInput";
import FormTextarea from "../Components/ui/FormTextarea";
import FormBookImage from "../Components/ui/FormBookImage";
import Uploading from "../Components/Uploading";
import { GetNewBook } from "../Context/NewBookContext";

let NewBook = () => {
  let {
    formData,
    handleFileChange,
    handleFormChange,
    handleFormSubmit,
    image,
    uploading,
  } = GetNewBook();

  return (
    <section className="flex h-full w-full items-center justify-center">
      {uploading && <Uploading />}
      <section className="flex w-full max-w-[720px] flex-col gap-4 rounded-xl bg-surface px-3 py-4">
        <SectionTitle>New Book</SectionTitle>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="flex flex-1 gap-3">
            <FormBookImage handleFileChange={handleFileChange} url={image} />
            <div className="flex flex-1 flex-col gap-2">
              <FormInput
                label="Title"
                placeholder="Enter book title"
                name="title"
                onChange={handleFormChange}
                value={formData.title.value}
                error={formData.title.error}
              />
              <div className="flex h-[231px] gap-2">
                <div className="flex shrink-0 flex-col gap-1">
                  <FormTextarea
                    className="flex-1"
                    inputClassName="flex-1"
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
                </div>
                <GenreInput />
              </div>
            </div>
          </div>
          <Button disabled={uploading} varient="dim" className="rounded-md">
            Submit
          </Button>
        </form>
      </section>
    </section>
  );
};

export default NewBook;
