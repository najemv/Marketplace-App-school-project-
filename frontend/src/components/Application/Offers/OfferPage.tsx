import {Link, useNavigate, useParams} from "react-router-dom";
import SimpleImageSlider from 'react-simple-image-slider';
import useSWR from "swr";
import {Offer} from "../../../types";
import fetcher from "../../../utils/fetcher";
import backArrow from '../../../../public/assets/left-arrow.svg';
import offerPhoto from '../../../../../backend/static/offer-photos/default-image.png';
import userPhoto from '../../../../../backend/static/user-photos/default-avatar-profile-icon.jpg';
import '../../../../public/assets/imageSlider.css'


export const OfferPage = () => {
  const {id} = useParams();
  const offer_id = parseInt(id!);
  const {data, error} = useSWR(`http://localhost:4000/offer/${offer_id}`, fetcher);
  const navigate = useNavigate();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const offer: Offer = data.data;
  let mainImage = offer.photos.at(0)?.path;
  let images = offer.photos.map(x => x.path);
  if (mainImage === undefined) {
    mainImage = offerPhoto;
    images.push(offerPhoto);
  }

  const authorPhoto = (offer.author.profilePicture) ? offer.author.profilePicture : userPhoto;

  const formatPrice = function (amount: number): string {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") + "€";
  };
  const formattedPrice = formatPrice(offer.price);

  const prettyDate = new Date(offer.createdAt).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  return (
    <div className="m-5 flex">
      <div className="w-full">
        <div onClick={() => navigate(-1)} className="h-8 w-8 ring ring-space-cadet rounded mb-2 hover:bg-gray-400">
          <img src={backArrow} alt="Return button"/>
        </div>
        <div className="m-6 flex flex-wrap">
          <div className="mr-3">
            <h1 className="text-5xl mb-3">{offer.title}</h1>
            <div className="hidden lg:block">
            <SimpleImageSlider
              width={800}
              height={500}
              images={images}
              showBullets={true}
              showNavs={false}
            />
            </div>
            <div className="lg:hidden">
              <img src={mainImage} alt="offer image" />
            </div>
          </div>
          <div className="lg:w-1/4">
            <div className="text-1xl">
              <p>Place: {offer.place}</p>
              <Link to={`/user/${offer.author.nickname}`}>
                <p
                  className="hover:text-medium-candy-apple-red"
                >
                  By:
                  <img
                    className="w-5 inline mx-2 rounded-full"
                    src={authorPhoto}
                    alt="Author's prfile picture"
                  />
                  {offer.author.nickname.toString().toUpperCase()}</p>
              </Link>

              <p>Created at: {prettyDate}</p>
              <div>
                <p className="lg:text-2xl text-xl">Description:</p>
                <p>{offer.description}</p>
              </div>
              <p className="text-3xl text-medium-candy-apple-red font-bold my-5">{formattedPrice}</p>
            </div>
            
            {offer.finished &&
              <div className="text-3xl text-medium-candy-apple-red">
                  SOLD
              </div>
            }
            {!offer.finished &&
              <a href={`mailto:${offer.author.email}`}>
                <button
                className="btn mt-10 inline-block px-6 py-2 border-2 border-imperial-red text-imperial-red font-medium text-3xl leading-tight uppercase rounded hover:bg-medium-candy-apple-red focus:text-mint-cream hover:bg-opacity-10 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">
                Contact me
                </button>
              </a>
              
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
