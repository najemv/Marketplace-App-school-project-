import { Link } from "react-router-dom";


export const Logo = () => {
  return (
    <Link to="/">
      <img className="h-16" alt="Server's logo" src="/assets/logo.png"/>
    </Link>
  );
};

export default Logo;