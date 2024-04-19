/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import MovieDetails from "./components/movies/MovieDetails";
import TvSeriesDetails from "./components/tvSeries/TvSeriesDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Browse from "./pages/Browse";
import WatchList from "./pages/WatchList";
import TopRated from "./pages/TopRatedList";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top_rated" element={<TopRated />} />
        <Route path="/my_watch_list" element={<WatchList />} />
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
