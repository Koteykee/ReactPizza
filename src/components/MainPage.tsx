import Carousel from "react-bootstrap/Carousel";
import Pizza from "../assets/Pizza-promo.png";
import Cake from "../assets/Cake-promo.jpg";
import Soda from "../assets/Soda-promo.jpg";

export const MainPage = () => {
  return (
    <div className="container">
      <Carousel>
        <Carousel.Item>
          <img
            src={Pizza}
            alt="Pizza"
            className="w-full h-125 object-cover rounded-2xl"
          />
          <Carousel.Caption>
            <p className="text-[50px] font-bold [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              The tastiest pizza around!
            </p>
            <button className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] mb-4 py-2 px-4 rounded cursor-pointer transition-colors">
              Choose now
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Cake}
            alt="Cake"
            className="w-full h-125 object-cover rounded-2xl"
          />
          <Carousel.Caption>
            <p className="text-[50px] font-bold [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              Indulge in something sweet!
            </p>
            <button className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] mb-4 py-2 px-4 rounded cursor-pointer transition-colors">
              Choose now
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Soda}
            alt="Soda"
            className="w-full h-125 object-cover rounded-2xl"
          />
          <Carousel.Caption>
            <p className="text-[50px] font-bold [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              Drinks to go with your pizza!
            </p>
            <button className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] mb-4 py-2 px-4 rounded cursor-pointer transition-colors">
              Choose now
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
