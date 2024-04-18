/* eslint-disable react/prop-types */
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/common/Home";
import About from "./components/public/About";
import MovieDetails from "./components/movies/MovieDetails";
import TvSeriesDetails from "./components/tvSeries/TvSeriesDetails";
import Login from "./components/public/Login";
import SignUp from "./components/public/SignUp";
import Browse from "./components/common/Browse"
import WatchList from "./components/common/WatchList";
import TopRated from "./components/common/TopRatedList";
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top_rated" element={<TopRated />} />
        <Route path="/my_watch_list" element={<WatchList/>} />
        <Route path="/movies/:movieId" element={<MovieDetails />} />
        <Route path="/series/:seriesId" element={<TvSeriesDetails />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
