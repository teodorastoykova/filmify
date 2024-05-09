import { describe, it, expect } from "vitest";
import Movie from "../../src/models/Movie";


describe ('Movie Constructor', () =>{
    it('Valid arguments', () =>{
        const movie = new Movie(
            123,
            "The Shawshank Redemption",
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            "1994-09-23",
            9.3,
            ["Castle Rock Entertainment", "Warner Bros."]
        );

        expect(movie.id).toEqual(123);
        expect(movie.title).toEqual("The Shawshank Redemption");
        expect(movie.overview).toEqual("Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.")
        expect(movie.posterPath).toEqual("/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg");
        expect(movie.releaseDate).toEqual("1994-09-23");
        expect(movie.voteAverage).toEqual(9.3);
        expect(movie.productionCompanies).toEqual(["Castle Rock Entertainment", "Warner Bros."])

    });
    it('Properties are set to undefined when not provided', () =>{
        const movie = new Movie(
            1,
        );
        expect(movie.id).toEqual(1);
        expect(movie.title).toBeUndefined();
        expect(movie.overview).toBeUndefined();
        expect(movie.posterPath).toBeUndefined();
        expect(movie.releaseDate).toBeUndefined();
        expect(movie.voteAverage).toBeUndefined();
        expect(movie.productionCompanies).toBeUndefined();
    });
    it('Provide some properties', () =>{
        const movie = new Movie(
            123,
            "The Shawshank Redemption",
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        );
        expect(movie.id).toEqual(123);
        expect(movie.title).toEqual("The Shawshank Redemption");
        expect(movie.overview).toEqual("Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.")
        expect(movie.posterPath).toBeUndefined();
        expect(movie.releaseDate).toBeUndefined();
        expect(movie.voteAverage).toBeUndefined();
        expect(movie.productionCompanies).toBeUndefined();
    })
})