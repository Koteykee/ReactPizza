import Logo from "../assets/Pizza-logo.png";

export const Footer = () => {
  return (
    <footer className="w-full p-10 border-t border-[#e2e2e2]">
      <div className="container h-18 flex flex-col items-center justify-center">
        <img src={Logo} alt="Pizza Logo" className="w-20 rounded-full" />
        <p>Pizza Slice</p>
        <p className="text-[#8f8f8f]">Best pizza in the world!</p>
      </div>
    </footer>
  );
};
