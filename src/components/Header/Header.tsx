import { Link } from "react-router-dom";
import { useFavoriteStore } from "../../stores/useFavoriteStore";
import { useCartStore } from "../../stores/useCartStore";
import { Badge, Chip, IconButton } from "@mui/material";
import {
  Phone as PhoneIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import Logo from "../../assets/Pizza-logo.png";
import { MenuButton } from "./MenuButton";
import { SearchBar } from "./SearchBar";
import { UserButton } from "./UserButton";

export const Header = () => {
  const favoritesCount = useFavoriteStore((state) => state.favorites.length);
  const cartCount = useCartStore((state) =>
    Object.values(state.cart).reduce(
      (acc, curr) => acc + (curr.quantity || 0),
      0,
    ),
  );

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between px-4">
        <Chip
          icon={<PhoneIcon sx={{ fontSize: 22 }} />}
          label="+79990000000"
          sx={{
            backgroundColor: "transparent",
            fontSize: "18px",
          }}
        />
        <p className="text-[16px] leading-8 my-1">
          Work hours: from 10:00 to 22:00
        </p>
      </div>
      <div className="w-full border-y border-[#e2e2e2]">
        <div className="container flex items-center justify-between my-2 px-4">
          <MenuButton />
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2 cursor-pointer text-black group"
          >
            <img src={Logo} alt="Pizza Logo" className="w-16 rounded-full" />
            <div className="leading-none max-[992px]:hidden">
              <p className="text-[24px] font-semibold my-1 group-hover:underline">
                Pizza Slice
              </p>
              <p className="text-[#8f8f8f] my-1">Best pizza in the world!</p>
            </div>
          </Link>
          <SearchBar />
          <Badge
            badgeContent={favoritesCount}
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f07e20",
                color: "white",
              },
            }}
          >
            <IconButton component={Link} to="/favorite">
              <FavoriteIcon sx={{ color: "red", fontSize: 32 }} />
            </IconButton>
          </Badge>
          <Badge
            badgeContent={cartCount}
            overlap="circular"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f07e20",
                color: "white",
              },
            }}
          >
            <IconButton component={Link} to="/cart">
              <ShoppingCartIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Badge>
          <UserButton />
        </div>
      </div>
    </nav>
  );
};
