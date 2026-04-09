import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Search as SearchIcon } from "@mui/icons-material";
import LinearProgress from "@mui/material/LinearProgress";
import { fetchProductsByName, type ListItemData } from "../../api/products";

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ListItemData[] | null>(
    null,
  );
  const [searchError, setSearchError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const queryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getResults = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (queryTimeout.current) clearTimeout(queryTimeout.current);

    queryTimeout.current = setTimeout(async () => {
      if (value.trim() !== "") {
        try {
          setLoading(true);
          const result = await fetchProductsByName(value);
          setSearchResults(result);
          setSearchError(false);
        } catch {
          setSearchError(true);
        } finally {
          setLoading(false);
        }
        return;
      }
      setSearchResults(null);
      setLoading(false);
    }, 300);
  };

  const getProduct = () => {
    setSearchResults(null);
    setSearchQuery("");
  };

  useEffect(() => {
    return () => {
      if (queryTimeout.current) clearTimeout(queryTimeout.current);
    };
  }, []);

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
          value={searchQuery}
          onChange={getResults}
          inputProps={{ "aria-label": "search" }}
          sx={{
            flex: 1,
          }}
        />
      </div>
      {loading && (
        <div className="px-0.5 my-1">
          <LinearProgress
            sx={{
              backgroundColor: "#f07e20",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffa734",
              },
            }}
          />
        </div>
      )}
      {searchResults && (
        <ul className="absolute top-full w-full overflow-hidden mt-1 list-none p-0 mx-0">
          {searchError && (
            <p className="text-[20px] bg-white p-2.5">
              Sorry, something went wrong, please try again.
            </p>
          )}
          {!searchError && searchResults.length === 0 && (
            <p className="text-[20px] bg-white p-2.5">No results found.</p>
          )}
          {!searchError &&
            searchResults.map((product) => (
              <li
                key={product.id}
                onClick={getProduct}
                className="bg-white text-xl cursor-pointer"
              >
                <Link
                  to={`/itemPage/${product.id}`}
                  style={{ textDecoration: "none" }}
                  className="p-3 block text-black hover:bg-gray-200 transition"
                >
                  {product.name}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </Search>
  );
};
