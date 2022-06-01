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
        src={'http://localhost:4000/static/user-photos/'+user.profilePicture}
        alt="Profile picture"
        className="h-10 rounded-full"
      />}>
        <div className="h-10 px-3 border-2 border-medium-candy-apple-red hover:bg-medium-candy-apple-red">
          <Link className="h-9  flex items-center" to={`/user/${user.nickname}`}>
            <button className="text-xl w-max">Show profile</button>
          </Link>
        </div>
        <div className="h-10 px-3 border-2 border-medium-candy-apple-red hover:bg-medium-candy-apple-red">
          <button className="h-9 text-xl flex items-center" onClick={logOut}>
            Logout
          </button>
        </div>
      </PopupMenu>
    </li>
  )
}

export default UserInfo;
