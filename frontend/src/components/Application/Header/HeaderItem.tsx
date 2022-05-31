import {Link} from "react-router-dom";

interface HeaderItemProps {
  text: string;
  linkTo: string
}

export const HeaderItem = ({text, linkTo}: HeaderItemProps) => {
  return (
    <li className="p-5 mr-5 mt-5 mb-5">
      <Link to={linkTo}>
        {text}
      </Link>
    </li>
  );
};

export default HeaderItem;
