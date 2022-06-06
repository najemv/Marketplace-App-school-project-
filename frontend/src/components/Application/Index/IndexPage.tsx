import Navigation from "../Offers/Navigation/Navigation";
import ListOfOffers from "../Offers/ListOfOffers";

export const IndexPage = () => {

  return (
    <div className="flex flex-col lg:flex-row">
      <Navigation />
      <ListOfOffers />
    </div>
  );
};

export default IndexPage;
