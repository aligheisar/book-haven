import { useState } from "react";
import { GetNewBook } from "../context/NewBookContext";
import { validateNewBookInputs } from "../util/validate";
import GenreInput from "../components/ui/GenreInput";
import Button from "../components/ui/Button.tsx";
import FormInput from "../components/ui/FormInput";
import FormTextarea from "../components/ui/FormTextarea";
import FormBookImage from "../components/ui/FormBookImage";
import SectionTitle from "../components/SectionTitle";
import FloatingSpinner from "../components/FloatingSpinner";

let NewBook = () => {
  let {
    handleFileChange,
    handleRemoveFile,
    image,
    handleFormSubmit,
    uploading,
  } = GetNewBook();

  const [formData, setFormData] = useState({
    title: { value: "", error: null },
    description: { value: "", error: null },
    price: { value: 0, error: null },
  });

  let handleFormChange = (e) => {
    let { name, value } = e.target;

    let error = validateNewBookInputs(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: { error, value },
    }));
  };

  return (
    <section className="flex h-full w-full items-center justify-center">
      {uploading && <FloatingSpinner title="uploading" />}
      <section className="flex w-full max-w-[720px] flex-col gap-4 rounded-xl bg-surface px-3 py-4">
        <SectionTitle>New Book</SectionTitle>
        <form
          onSubmit={(e) => handleFormSubmit(e, formData)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-1 gap-3">
            <FormBookImage
              handleRemoveFile={handleRemoveFile}
              handleFileChange={handleFileChange}
              url={image}
            />
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
