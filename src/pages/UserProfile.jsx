import { useParams } from "react-router-dom";

let UserProfile = () => {
  let { username } = useParams();

  return <h1>{username}</h1>;
};

export default UserProfile;
