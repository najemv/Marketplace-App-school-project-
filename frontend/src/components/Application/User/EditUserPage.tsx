import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";
import { loginDataAtom } from "../../../state/atom";
import { User } from "../../../types";
import fetcher from "../../../utils/fetcher";
import Info from "../Misc/Info";
import Navigation from "../Offers/Navigation/Navigation";
import Edit from "./EditUser";

export const EditUserPage = () => {
  const navigate = useNavigate();
  const {name} = useParams();
  const [loginData, setLoginData] = useRecoilState(loginDataAtom);

  const {data, error} = useSWR(`http://localhost:4000/user/${name}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const user: User = data.data;

  if (!loginData.isLoggedIn) {
    return <Info message="You must be logged in to perform this action" />;
  }

  if (loginData.nickname != user.nickname) {
    return <Info message="You can't edit other profiles" />;
  }

  return (
    <div>
      <Edit {...user}/>
    </div>
  );
};

export default EditUserPage;
