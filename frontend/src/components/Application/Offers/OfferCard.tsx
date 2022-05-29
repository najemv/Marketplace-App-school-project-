import { Link } from "react-router-dom";
import { OfferPreview } from "../../../types";



export const OfferCard = ({id, title, price, place, author, photos, finished}: OfferPreview) => {
  return (
    <Link to={`/offer/${id}-${title.toLowerCase()}`} className="m-5 bg-gray-200">
      <h1>{title}</h1>
      <p>{price}€, {place}</p>
      <Link to={`/user/${author.nickname}`}>
        <p>{author.nickname}</p>  
      </Link>
    </Link>
  );
};

export default OfferCard;