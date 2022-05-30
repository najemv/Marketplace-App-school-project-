import { Link } from "react-router-dom";

interface CategoryCardProps {
  id: number;
  name: string;
};

export const CategoryCard = ({id, name}: CategoryCardProps) => {
  const goToLink = id != 0 ? `${id}-${name}` : "";
  return (
    <Link to={`/offers/${goToLink}`}>
    <li className="m-2 bg-imperial-red hover:bg-medium-candy-apple-red rounded-2xl text-center font-medium px-5 py-2 text-base">
        {name.toUpperCase()}
    </li>
    </Link>
  );
};

export default CategoryCard;
