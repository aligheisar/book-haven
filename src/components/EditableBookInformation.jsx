import FormInput from "./ui/FormInput";
import FormTextarea from "./ui/FormTextarea";

let EditableBookInformation = ({ data }) => {
  return (
    <div className="flex max-w-80 flex-col justify-between gap-2 py-3">
      <div className="flex flex-col gap-2">
        <FormInput defaultValue={data.title} />
        <FormTextarea defaultValue={data.description} />

        {/* <GenreInput className="max-h-14" genres={data.genres} /> */}

        <FormInput type="number" defaultValue={data.price} />
      </div>
    </div>
  );
};

export default EditableBookInformation;
