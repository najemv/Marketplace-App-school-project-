
import { HeaderItem } from "./HeaderItem";
import Logo from "./Logo";
import Searchbar from "./Searchbar";

export const Header = () => {
  
  return (
    <header className="bg-orange-400 h-30 flex justify-between items-center">
      <Logo />
      <Searchbar />
      <div>
        <ul className="flex">
          <HeaderItem text="Login" linkTo="/login" />
          <HeaderItem text="Register" linkTo="/register" />
        </ul>
      </div>
    </header>
  );
};

export default Header;