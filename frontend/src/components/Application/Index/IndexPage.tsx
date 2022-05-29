import { Link } from "react-router-dom";

export const IndexPage = () => {

  return (
    <div>
      WELCOME TO OUR APP
      <Link to="/offers">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Zobrazit nabídky
        </button>
      </Link>
      
    </div>
  );
};

export default IndexPage;