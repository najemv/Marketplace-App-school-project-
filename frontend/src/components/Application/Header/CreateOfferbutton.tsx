import { Link } from "react-router-dom";



export const CreateOfferButton = () => {

  return (
    <li className="lg:p-5 mr-5 lg:mt-5 lg:mb-5">
      <Link to="/offer/create">
        Přidat nabídku
      </Link>
    </li>
  );
};
