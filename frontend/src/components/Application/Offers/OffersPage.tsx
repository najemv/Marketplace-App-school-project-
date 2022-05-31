import {Route, Routes} from "react-router-dom";
import CreateOffer from "./CreateOffer";
import ListOfOffers from "./ListOfOffers";
import Navigation from "./Navigation/Navigation";

export const OffersPage = () => {

  return (
    <div className="flex ">
      <Navigation/>
      <Routes>
        <Route path="/:id" element={<ListOfOffers/>}/>
        <Route path="/" element={<ListOfOffers/>}/>
      </Routes>

    </div>
  );
};

export default OffersPage;
