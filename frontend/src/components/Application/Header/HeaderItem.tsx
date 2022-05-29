import { Link } from "react-router-dom";

interface HeaderItemProps {
  text: string;
  linkTo: string
}

export const HeaderItem = ({text, linkTo}: HeaderItemProps) => {
  return (
    <li className="p-5 m-5">
      <Link to={linkTo}>
        {text}
      </Link>
    </li>
  )
}