import {useNavigate, useParams} from "react-router-dom";
import useSWR from "swr";
import {User} from "../../../types";
import fetcher from "../../../utils/fetcher";
import OfferCard from "../Offers/OfferCard";
import backArrow from '../../../../public/assets/left-arrow.svg';
import userPhoto from '../../../../../backend/static/user-photos/default-avatar-profile-icon.jpg';

export const UserPage = () => {
  const navigate = useNavigate();
  const {name} = useParams();
  console.log(name);
  const {data, error} = useSWR(`http://localhost:4000/user/${name}`, fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const user: User = data.data;
  return (
    <div className="m-5 flex">
      <div className="w-1/4">
        <div onClick={() => navigate(-1)} className="h-8 w-8 ring ring-space-cadet rounded mb-2 hover:bg-gray-400">
          <img src={backArrow} alt="Return button"/>
        </div>
        <div>
          <img className="h-52" src={userPhoto} alt="User Photo"/>
          <p>Nickname: {user.nickname.toString().toUpperCase()}</p>
          <p>Email: {user.email}</p>
          <p>Registered: {user.createdAt.toString()}</p>
          <p>Popis: {user.description}</p>
        </div>
      </div>
      <div className="w-3/4">
        <p className="text-2xl">Offers:</p>
        {user.offers.map((offer) => <OfferCard key={offer.id} {...offer} />)}
      </div>
    </div>
  );
};


export default UserPage;
