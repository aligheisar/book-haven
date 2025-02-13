import { GetBookDetails } from "../context/BookDetailsContext";
import { GetUser } from "../context/UserContext";
import Menu from "./menu/Menu";
import MenuItem from "./menu/MenuItem";
import MenuSeparator from "./menu/MenuSeparator";

let BookDetailsMenu = () => {
  let { data } = GetBookDetails();
  let { user } = GetUser();

  return (
    <Menu className="absolute -right-10 top-[52px]">
      {data.user.username === user?.username && (
        <>
          <MenuItem fn={() => console.log("Edit")}>Edit</MenuItem>
          <MenuItem fn={() => console.log("Delete")}>Delete</MenuItem>
          <MenuSeparator />
        </>
      )}
      <MenuItem fn={() => {}}>Copy Link</MenuItem>
      <MenuItem fn={() => console.log("copy author link")}>
        Copy Author Link
      </MenuItem>
    </Menu>
  );
};

export default BookDetailsMenu;
