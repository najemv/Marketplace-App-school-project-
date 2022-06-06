import {Link} from "react-router-dom";

interface HeaderItemProps {
  text: string;
  linkTo: string
}

export const HeaderItem = ({text, linkTo}: HeaderItemProps) => {
  return (
    <li className="lg:p-5 mr-5 lg:mt-6 lg:mb-5">
      <Link to={linkTo}>
        {text}
      </Link>
    </li>
  );
};

export default HeaderItem;
