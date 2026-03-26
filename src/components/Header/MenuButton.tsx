import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

export const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
  );
};
