import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import serverAddress from "../../../serverAddress";
import { loginDataAtom } from "../../../state/atom";
import Info from "../Misc/Info";


export const CreateOffer = () => {
  const loginData = useRecoilValue(loginDataAtom);
  const navigate = useNavigate();

  if (!loginData.isLoggedIn) {
    return <Info message="You must be logged in to perform this action" />;
  }

  const onSubmit = async (data: any) => {
    const createdOffer = await axios.post(`${serverAddress}/offer`, data);
    navigate(`/offer/${createdOffer.data.id}`, {replace: true});
  };

  return (
    <div>TODO</div>
  );
};

export default CreateOffer;