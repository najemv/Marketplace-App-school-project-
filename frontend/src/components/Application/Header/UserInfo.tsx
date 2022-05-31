import {Link} from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useSWR from "swr";
import { loginDataAtom } from "../../../state/atom";
import { User } from "../../../types";
import fetcher from "../../../utils/fetcher";
import userPhoto from '../../../../../backend/static/user-photos/default-avatar-profile-icon.jpg';
import { PopupMenu } from "./PopupMenu";

interface UserInfoProps {
  nickname: string;
}

export const UserInfo = ({nickname}: UserInfoProps) => {
  const {data, error} = useSWR(`http://localhost:4000/user/${nickname}`, fetcher);
  const setLoginData = useSetRecoilState(loginDataAtom);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  
  const user: User = data.data;

  const logOut = () => {
    setLoginData({
      isLoggedIn: false,
      nickname: "",
      password: ""
    });
  };

  return (

    <li className="p-5 mr-5 mt-5 mb-5">
      <PopupMenu element={<img
        src={userPhoto}
        alt="Profile picture"
        className="h-10"
      />}>
        <Link to={`/user/${user.nickname}`}>
          <button>Show profile</button>
        </Link>
        <button onClick={logOut}>
          Logout
        </button>
      </PopupMenu>
    </li>
  )
}

export default UserInfo;