import { Link } from "react-router-dom";



export const CreateOfferButton = () => {

  return (
    <li className="p-5 mr-5 mt-5 mb-5">
      <Link to="/offer/create">
        Přidat nabídku
      </Link>
    </li>
  );
};