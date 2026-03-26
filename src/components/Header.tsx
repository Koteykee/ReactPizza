import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { useFavoriteStore } from "../stores/useFavoriteStore";
import { Badge, Chip, IconButton, Button, Menu, MenuItem } from "@mui/material";
import {
  Phone as PhoneIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Logo from "../assets/Pizza-logo.png";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const favoritesCount = useFavoriteStore((state) => state.favorites.length);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <div>
            <Button
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{
                backgroundColor: "#f07e20",
                color: "white",
                fontSize: "16px",
                py: 2,
                px: 4,
                borderRadius: "0.375rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: 145,
                "&:hover": {
                  backgroundColor: "#ffa734",
                },
              }}
            >
              <MenuIcon />
              Menu
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                component={Link}
                to="/pizza"
                onClick={handleClose}
                sx={{ width: 145 }}
              >
                Pizza
              </MenuItem>
              <MenuItem
                component={Link}
                to="/desserts"
                onClick={handleClose}
                sx={{ width: 145 }}
              >
                Desserts
              </MenuItem>
              <MenuItem
                component={Link}
                to="/drinks"
                onClick={handleClose}
                sx={{ width: 145 }}
              >
                Drinks
              </MenuItem>
            </Menu>
          </div>
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            className="flex items-center gap-2 cursor-pointer text-black group"
          >
            <img src={Logo} alt="Pizza Logo" className="w-16 rounded-full" />
            <div className="leading-none">
              <p className="text-[24px] font-semibold my-1 group-hover:underline">
                Pizza Slice
              </p>
              <p className="text-[#8f8f8f] my-1">Best pizza in the world!</p>
            </div>
          </Link>
          <Search>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden w-120">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                sx={{
                  flex: 1,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#f07e20",
                  color: "white",
                  borderRadius: 0,
                  "&:hover": { backgroundColor: "#ffa734" },
                  py: 1,
                  px: 2,
                }}
              >
                Search
              </Button>
            </div>
          </Search>
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
          <Badge badgeContent={0} color="primary" overlap="circular">
            <IconButton>
              <ShoppingCartIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Badge>
        </div>
      </div>
    </nav>
  );
};
