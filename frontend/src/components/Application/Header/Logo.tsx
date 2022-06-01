import {Link} from "react-router-dom";
import logo from '../../../../public/assets/new-logo.png';


export const Logo = () => {
  return (
    <Link to="/">
      <img className="h-16 lg:mb-2 lg:ml-3 lg:mr-4" alt="Server's logo" src={logo}/>
    </Link>
  );
};

export default Logo;
