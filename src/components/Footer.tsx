import Logo from "../assets/Pizza-logo.png";

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-[#e2e2e2]">
      <div className="container flex flex-col items-center justify-center leading-none my-2">
        <img src={Logo} alt="Pizza Logo" className="w-16 rounded-full" />
        <p className="text-[24px] font-semibold my-1">Pizza Slice</p>
        <p className="text-[#8f8f8f] my-1">Best pizza in the world!</p>
      </div>
    </footer>
  );
};
