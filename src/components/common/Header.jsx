/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleTopRatedClick = () => {
    navigate("/top_rated");
  };

  const handleMyWatchListClick = () => {
    navigate("/my_watch_list")
  }
  const handleLogOutClick = () => {
    localStorage.removeItem("sessionId");
    navigate("/login");
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className="title">
          Filmify
        </Grid>
        <Grid item>
          <Button onClick={handleHomeClick}>Home</Button>
          <Button onClick={handleTopRatedClick}>Top Rated</Button>
          <Button onClick={handleMyWatchListClick}>My Watch List</Button>
          <Button onClick={handleLogOutClick}>Log Out</Button>
        </Grid>
        <SearchBar />
      </Grid>
    </>
  );
};

export default Header;
