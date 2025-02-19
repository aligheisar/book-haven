import Menu from "./menu/Menu";
import MenuItem from "./menu/MenuItem";
import MenuSeparator from "./menu/MenuSeparator";

let BookDetailsMenu = ({
  isOwner,
  editMode,
  enterEditMode,
  exitEditMode,
  deleteBook,
  copyBookLink,
  copyUserLink,
}) => {
  return (
    <Menu className="absolute -right-10 top-[52px]">
      {isOwner && (
        <>
          {editMode ? (
            <>
              <MenuItem fn={() => exitEditMode(true)}>Confirm Changes</MenuItem>
              <MenuItem fn={() => exitEditMode(false)}>Cancel Changes</MenuItem>
            </>
          ) : (
            <>
              <MenuItem fn={enterEditMode}>Edit</MenuItem>
              <MenuItem fn={deleteBook}>Delete</MenuItem>
            </>
          )}
          <MenuSeparator />
        </>
      )}
      <MenuItem fn={copyBookLink}>Copy Link</MenuItem>
      <MenuItem fn={copyUserLink}>Copy Author Link</MenuItem>
    </Menu>
  );
};

export default BookDetailsMenu;
