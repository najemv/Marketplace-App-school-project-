import { useParams } from "react-router-dom";
import useSWR from "swr";
import { User } from "../../../types";
import fetcher from "../../../utils/fetcher";
import OfferCard from "../Offers/OfferCard";

export const UserPage = () => {
  const {name} = useParams();
  console.log(name);
  const { data, error } = useSWR(`http://localhost:4000/user/${name}`, fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const user: User = data.data;
  return (
    <div>
      <p>Nickname: {user.nickname}</p>
      <p>Email: {user.email}</p>
      <p>Registered: {user.createdAt.toString()}</p>
      <p>Popis: {user.description}</p>
      <p>Offers:</p>
      {user.offers.map((offer) => <OfferCard key={offer.id} {...offer} />)}
    </div>
  );
};


export default UserPage;