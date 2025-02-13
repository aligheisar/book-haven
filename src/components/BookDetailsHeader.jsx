import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeBook } from "../supabase/books";
import { GetModal, MODAL_NAMES } from "../context/ModalContext";
import { GetNotifi } from "../context/NotifiContext";
import BookDetailsMenu from "./BookDetailsMenu";
import BookInformation from "./BookInformation";
import BookImage from "./BookImage";
import EditableBookDetails from "./EditableBookDetails";
import FloatingSpinner from "./FloatingSpinner";

let BookDetailsHeader = ({ data, isOwner }) => {
  let { addNotif } = GetNotifi();
  let { openModal } = GetModal();

  let navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [isPending, setIsPending] = useState(false);

  let handleEnterEditMode = () => {
    setEditMode(true);
  };

  let handleExitEditMode = () => {
    setEditMode(false);
  };

  let handleDeleteBook = async () => {
    openModal(MODAL_NAMES.CONFIRMATION, {
      onClose: async (result) => {
        if (result) {
          setIsPending(true);
          try {
            await removeBook(data.title);

            addNotif({
              type: "success",
              title: "Book deleted",
              desc: "your book was deleted successfully",
            });

            navigate("/dashboard");
          } catch (error) {
            addNotif({
              type: "danger",
              title: "Faild to remove",
              desc: "something happend, book was not deleted",
            });
          } finally {
            setIsPending(false);
          }
        }
      },
      title: "Are you sure !",
      desc: "if you confirm this you book going to remove for ever",
    });
  };

  let handleCopyBookLink = () => {
    let link = window.location.href;
    try {
      window.navigator.clipboard.writeText(link);

      addNotif({
        type: "success",
        title: "Link Copied",
        desc: "Book link was successfully copied to your clipboard",
      });
    } catch (error) {
      addNotif({
        type: "Faild",
        title: "Can't Copy",
        desc: "there is an error happening",
      });
    }
  };

  let handleCopyUserLink = () => {
    let link = window.location.href;
    let authorLink = link.split("/");
    authorLink.pop();
    authorLink = authorLink.join("/");
    try {
      window.navigator.clipboard.writeText(authorLink);

      addNotif({
        type: "success",
        title: "Link Copied",
        desc: "author link was successfully copied to your clipboard",
      });
    } catch (error) {
      addNotif({
        type: "Faild",
        title: "Can't Copy",
        desc: "there is an error happening",
      });
    }
  };

  return (
    <>
      {isPending && <FloatingSpinner title="Pending" />}
      <header className="relative mx-auto flex h-96 w-fit gap-6 py-7">
        <BookDetailsMenu
          editMode={editMode}
          enterEditMode={handleEnterEditMode}
          exitEditMode={handleExitEditMode}
          deleteBook={handleDeleteBook}
          copyBookLink={handleCopyBookLink}
          copyUserLink={handleCopyUserLink}
          isOwner={isOwner}
        />
        {editMode ? (
          <EditableBookDetails data={data} />
        ) : (
          <>
            <BookImage url={data.imageUrl} />
            <BookInformation data={data} />
          </>
        )}
      </header>
    </>
  );
};

export default BookDetailsHeader;
