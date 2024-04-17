/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import SearchBar from "./SearchBar";

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleMoviesClick = () => {
    navigate("/movies/top_rated");
  };

  const handleTvSeriesClick = () => {
    navigate("/series/top_rated");
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("guest_session_id");
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
          <Button onClick={handleMoviesClick}>Movies</Button>
          <Button onClick={handleTvSeriesClick}>TV Series</Button>
          <Button onClick={handleLogOutClick}>Log Out</Button>
        </Grid>
        <SearchBar />
      </Grid>
    </>
  );
};

export default Header;
