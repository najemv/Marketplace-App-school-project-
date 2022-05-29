import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Index from "./Index/IndexPage";
import OffersPage from "./Offers/OffersPage";
import OfferPage from "./Offers/OfferPage";
import UserPage from "./User/UserPage";

export const ApplicationPage = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="offers/*" element={<OffersPage />}/>
        <Route path='user/:name' element={<UserPage />} />
        <Route path='offer/:id' element={<OfferPage />} />
        <Route path='/' element={<Index/>} />
      </Routes>
    </div>
  );
};

export default ApplicationPage;