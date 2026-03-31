import Carousel from "react-bootstrap/Carousel";
import Pizza from "../../assets/Pizza-promo.png";
import Cake from "../../assets/Cake-promo.jpg";
import Soda from "../../assets/Soda-promo.jpg";
import { Link } from "react-router-dom";

export const CarouselElement = () => {
  return (
    <div className="container">
      <Carousel>
        <Carousel.Item>
          <img
            src={Pizza}
            alt="Pizza"
            className="w-full h-125 object-cover rounded-2xl"
          />
          <Carousel.Caption className="flex flex-col items-center gap-4">
            <p className="text-[50px] font-bold my-0 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              The tastiest pizza around!
            </p>
            <Link
              to="/pizza"
              style={{ textDecoration: "none" }}
              className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] mb-4 py-2 px-4 rounded cursor-pointer transition-colors"
            >
              Choose now
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Cake}
            alt="Cake"
            className="w-full h-125 object-cover rounded-2xl"
          />
          <Carousel.Caption className="flex flex-col items-center gap-4">
            <p className="text-[50px] font-bold my-0 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              Indulge in something sweet!
            </p>
            <Link
              to="/desserts"
              style={{ textDecoration: "none" }}
              className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] mb-4 py-2 px-4 rounded cursor-pointer transition-colors"
            >
              Choose now
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={Soda}
            alt="Soda"
            className="w-full h-125 object-cover rounded-2xl"
          />
          <Carousel.Caption className="flex flex-col items-center gap-4">
            <p className="text-[50px] font-bold my-0 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
              Drinks to go with your pizza!
            </p>
            <Link
              to="/drinks"
              style={{ textDecoration: "none" }}
              className="bg-[#f07e20] hover:bg-[#ffa734] text-white text-[16px] mb-4 py-2 px-4 rounded cursor-pointer transition-colors"
            >
              Choose now
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
