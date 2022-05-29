import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { Offer } from "../../../types";
import fetcher from "../../../utils/fetcher";

export const OfferPage = () => {
  const {id} = useParams();
  const offer_id = parseInt(id!);
  const { data, error } = useSWR(`http://localhost:4000/offer/${offer_id}`, fetcher);
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const offer: Offer = data.data;

  
  return (
    <div>
      <h1>{offer.title}</h1>
      <p>{offer.price}€</p>
      <p>{offer.place}</p>
      <Link to={`/user/${offer.author.nickname}`}>
        <p>{offer.author.nickname}</p>  
      </Link>
      
      <p>{offer.description}</p>
      <p>Created at: {offer.createdAt.toString()}</p>
    </div>
  );
};

export default OfferPage;