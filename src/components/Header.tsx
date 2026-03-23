import Logo from "../assets/Pizza-logo.png";

export const Header = () => {
  return (
    <nav className="w-full border-b border-[#e2e2e2] fixed z-50">
      <div className="container h-18 flex items-center justify-between">
        <img src="" alt="Menu" />
        <div>
          <img src={Logo} alt="Pizza Logo" className="w-20 rounded-full" />
          <div>
            <p>Pizza Slice</p>
            <p className="text-[#8f8f8f]">Best pizza in the world!</p>
          </div>
        </div>
        <button>Category</button>
        <div>SearchBar</div>
        <img src="" alt="Favorite" />
        <img src="" alt="Cart" />
      </div>
    </nav>
  );
};
