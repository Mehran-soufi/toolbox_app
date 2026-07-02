import ThemeToggle from "../shared/theme-toggle";

import logo from "../../assets/logo/logo.png";
import Image from "next/image";

function Header() {
  return (
    <header className="w-full px-1 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-x-1">
        {/* Logo */}
        <Image src={logo} alt="logo" width={50} height={50} />
        <p>جعبه ابزار</p>
      </div>
      <div className="flex items-center">
        {/* Button */}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
