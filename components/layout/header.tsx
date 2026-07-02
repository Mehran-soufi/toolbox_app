import ThemeToggle from "../shared/theme-toggle";

function Header() {
  return (
    <header className="w-full px-1 py-1.5 flex items-center justify-between">
     <div className="flex items-center">
      <ThemeToggle/>
     </div>
    </header>
  );
}

export default Header;
