import Navigation from "../Offers/Navigation/Navigation";
import ListOfOffers from "../Offers/ListOfOffers";

export const IndexPage = () => {

  return (
    <div className="flex">
      <Navigation />
      <ListOfOffers />
    </div>
  );
};

export default IndexPage;
