import {Link} from "react-router-dom";
import logo from '../../../../public/assets/new-logo.png';


export const Logo = () => {
  return (
    <Link to="/">
      <img className="h-16 mb-2 ml-3 mr-4" alt="Server's logo" src={logo}/>
    </Link>
  );
};

export default Logo;
