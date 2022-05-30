import {Route, Routes} from "react-router-dom";
import ListOfOffers from "./ListOfOffers";
import Navigation from "./Navigation/Navigation";

export const OffersPage = () => {

  return (
    <div className="flex ">
      <Navigation/>
      <Routes>
        <Route path="/" element={<ListOfOffers/>}/>
        <Route path="/:id" element={<ListOfOffers/>}/>
      </Routes>

    </div>
  );
};

export default OffersPage;
