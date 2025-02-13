import FormBookImage from "./ui/FormBookImage";
import EditableBookInformation from "./EditableBookInformation";

let EditableBookDetails = ({ data }) => {
  return (
    <>
      <FormBookImage className="h-full" url={data.url} />
      <EditableBookInformation data={data} />
    </>
  );
};

export default EditableBookDetails;
