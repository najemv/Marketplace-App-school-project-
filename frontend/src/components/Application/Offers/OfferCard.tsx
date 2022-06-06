import {Link} from "react-router-dom";
import {OfferPreview} from "../../../types";
import offerPhoto from '../../../../../backend/static/offer-photos/default-image.png';



export const OfferCard = ({id, title, price, place, author, photos, finished}: OfferPreview) => {
  const formatPrice = function (amount: number): string {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "€";
  };
  const formattedPrice = formatPrice(price);
  let mainImage = photos?.at(0)?.path;
  if (mainImage === undefined) {
    mainImage = offerPhoto;
  }

  return (
    <li className="hover:bg-gray-200 h-48 w-full flex flex-row 2xl:w-1/2">
      <Link to={`/offer/${id}-${title.toLowerCase()}`} className="m-5 flex w-full">
        <div className="lg:w-60 flex justify-start">
          <img className="object-contain" src={mainImage} alt="Offer's image"/>
        </div>
        <div className="ml-2 lg:ml-0 w-full flex flex-col items-end lg:items-start lg:flex-row lg:justify-between">
        <div className="lg:ml-3 lg:w-2/6 flex flex-col lg:flex-none justify-start items-end lg:items-start lg:min-w-max">
          <h1 className="whitespace-nowrap lg:text-3xl">{title}</h1>
          <p className="whitespace-nowrap lg:text-1xl">{place}</p>
          <p className="whitespace-nowrap lg:text-1xl">{author.nickname.toString().toUpperCase()}</p>
        </div>
        <div className="lg:w-3/6 justify-end flex lg:justify-self-end">
          <p className="lg:text-3xl lg:ml-3 text-medium-candy-apple-red font-bold">{formattedPrice}</p>
        </div>
        </div>
      </Link>
    </li>
  );
};

export default OfferCard;
