
import { HeaderItem } from "./HeaderItem";
import Logo from "./Logo";
import Searchbar from "./Searchbar";

export const Header = () => {

  return (
    <header className="bg-space-cadet h-20 flex justify-between items-center">
      <Logo />
      <Searchbar />
      <div>
        <ul className="flex text-mint-cream">
          <HeaderItem text="Login" linkTo="/login" />
          <HeaderItem text="Register" linkTo="/register" />
        </ul>
      </div>
    </header>
  );
};

export default Header;
