
export default class Movie {
    constructor(id, title, overview, posterPath, releaseDate, voteAverage, productionCompanies) {
      this.id = id;
      if (title) this.title = title;
      if (posterPath) this.posterPath = posterPath;
      if (overview) this.overview = overview;
      if (releaseDate) this.releaseDate = releaseDate;
      if (voteAverage) this.voteAverage = voteAverage;
      if (productionCompanies) this.productionCompanies = productionCompanies;
    }
  }
  