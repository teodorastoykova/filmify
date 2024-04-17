/* eslint-disable react/prop-types */
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { TextField, Grid } from "@mui/material";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const handleSearchIconClick = () => {
    setIsSearchClicked(!isSearchClicked);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      goToSearchResults();
    }
  };

  const goToSearchResults = () => {
    if (searchValue.trim() !== '') {
      navigate(`/browse?query=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <>
      <Grid item>
        {isSearchClicked && (
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        )}
      </Grid>
      <Grid item>
        <IconButton onClick={handleSearchIconClick}>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <NotificationsNoneIcon />
        </IconButton>
      </Grid>
    </>
  );
};

export default SearchBar;
