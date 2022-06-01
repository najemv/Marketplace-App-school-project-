import {Link} from "react-router-dom";
import {OfferPreview} from "../../../types";
import offerPhoto from '../../../../../backend/static/offer-photos/default-image.png';



export const OfferCard = ({id, title, price, place, author, photos, finished}: OfferPreview) => {
  const formatPrice = function (amount: number): string {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "€";
  };
  const formattedPrice = formatPrice(price);
  const mainImage = photos?.at(0)?.path;

  return (
    <li className="hover:bg-gray-200 h-48 w-full flex flex-row">
      <Link to={`/offer/${id}-${title.toLowerCase()}`} className="m-5 flex w-full">
        <div className="w-1/6 flex justify-center">
          <img className="h-36" src={'http://localhost:4000/static/offer-photos/'+ mainImage} alt="Offer's image"/>
        </div>
        <div className="ml-3 w-2/6 justify-start">
          <h1 className="text-3xl">{title}</h1>
          <p className="text-1xl">{place}</p>
          <p className="text-1xl">{author.nickname.toString().toUpperCase()}</p>
        </div>
        <div className="w-3/6 justify-end flex">
          <p className="text-3xl text-medium-candy-apple-red font-bold">{formattedPrice}</p>
        </div>
      </Link>
    </li>
  );
};

export default OfferCard;
