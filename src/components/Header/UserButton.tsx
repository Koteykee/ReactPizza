import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import {
  Login as LoginIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useAuthStore } from "../../stores/useAuthStore";
import { AuthModals, type AuthMode } from "../Modal/AuthModals";

export const UserButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const logout = useAuthStore((state) => state.logout);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mr-2">
      <IconButton onClick={handleClick}>
        {currentUserId !== null ? (
          <AccountCircleIcon sx={{ fontSize: 32 }} />
        ) : (
          <LoginIcon sx={{ fontSize: 32 }} />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        disableScrollLock
      >
        {!currentUserId ? (
          <div>
            <MenuItem
              onClick={() => {
                setAuthMode("login");
                handleClose();
              }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={() => {
                setAuthMode("register");
                handleClose();
              }}
            >
              Register
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem component={Link} to="/profile" onClick={handleClose}>
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </div>
        )}
      </Menu>
      <AuthModals mode={authMode} onClose={() => setAuthMode(null)} />
    </div>
  );
};
