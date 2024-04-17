/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/common/Home";
import About from "./components/public/About";
import TopRatedMovies from "./components/movies/TopRatedMovies";
import TopRatedTvSeries from "./components/tvSeries/TopRatedTvSeries";
import MovieDetails from "./components/movies/MovieDetails";
import TvSeriesDetails from "./components/tvSeries/TvSeriesDetails";
import Login from "./components/public/Login";
import SignUp from "./components/public/SignUp";
import Browse from "./components/common/Browse"
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/movies/top_rated" element={<TopRatedMovies />} />
        <Route path="/series/top_rated" element={<TopRatedTvSeries />} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/series/:seriesId" element={<TvSeriesDetails />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
