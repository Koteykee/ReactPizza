import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Search as SearchIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

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
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.2, 1, 1, 0),
    width: "100%",
  },
}));

export const SearchBar = () => {
  return (
    <Search>
      <div
        className="flex items-center border border-gray-300 rounded overflow-hidden w-60 
                min-[992px]:w-80 
                min-[1200px]:w-120"
      >
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
  );
};
