import {Link, useNavigate, useParams} from "react-router-dom";
import SimpleImageSlider from 'react-simple-image-slider';
import useSWR from "swr";
import {Offer} from "../../../types";
import fetcher from "../../../utils/fetcher";
import backArrow from '../../../../public/assets/left-arrow.svg';
import offerPhoto from '../../../../../backend/static/offer-photos/default-image.png';
import '../../../../public/assets/imageSlider.css'


export const OfferPage = () => {
  const {id} = useParams();
  const offer_id = parseInt(id!);
  const {data, error} = useSWR(`http://localhost:4000/offer/${offer_id}`, fetcher);
  const navigate = useNavigate();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const offer: Offer = data.data;
  const mainImage = offer.photos.at(0)?.path;
  const images = offer.photos.map(x => 'http://localhost:4000/static/offer-photos/' + x.path);

  const formatPrice = function (amount: number): string {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "€";
  };
  const formattedPrice = formatPrice(offer.price);

  return (
    <div className="m-5 flex">
      <div className="w-full">
        <div onClick={() => navigate(-1)} className="h-8 w-8 ring ring-space-cadet rounded mb-2 hover:bg-gray-400">
          <img src={backArrow} alt="Return button"/>
        </div>
        <div className="m-6 flex">
          <div className="w-3/4 mr-3">
            <h1 className="text-5xl mb-3">{offer.title}</h1>
            <SimpleImageSlider
              width={900}
              height={500}
              images={images}
              showBullets={true}
              showNavs={true}
            />
          </div>
          <div className="w-1/4">
            <div className="text-1xl">
              <p className="text-3xl text-medium-candy-apple-red font-bold">{formattedPrice}</p>
              <p>Town: {offer.place}</p>
              <Link to={`/user/${offer.author.nickname}`}>
                <p className="hover:text-medium-candy-apple-red">Created
                  by: {offer.author.nickname.toString().toUpperCase()}</p>
              </Link>

              <p>{offer.description}</p>
              <p>Created at: {offer.createdAt.toString()}</p>

            </div>
            <button
              className="btn mt-10 inline-block px-6 py-2 border-2 border-imperial-red text-imperial-red font-medium text-3xl leading-tight uppercase rounded hover:bg-medium-candy-apple-red focus:text-mint-cream hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
