export default class TvSeries {
    constructor(id, title, overview, posterPath, releaseDate, voteAverage, seasons, episodes, productionCompanies) {
      this.id = id;
      if (title) this.title = title;
      if (overview) this.overview = overview;
      if (posterPath) this.posterPath = posterPath;
      if (releaseDate) this.releaseDate = releaseDate;
      if (voteAverage) this.voteAverage = voteAverage;
      if (seasons) this.seasons = seasons;
      if (episodes) this.episodes = episodes;
      if (productionCompanies) this.productionCompanies = productionCompanies;
    }
  }