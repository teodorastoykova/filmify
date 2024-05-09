import { describe, it, expect } from "vitest";
import TvSeries from "../../src/models/TvSeries";


describe('TvSeries Constructor', () => {
    it('Valid arguments', () =>{
        const tvSeries = new TvSeries(
            123,
            "The Shawshank Redemption",
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
            "1994-09-23",
            9.3,
            9,
            90,
            ["Castle Rock Entertainment", "Warner Bros."]
        );

        expect(tvSeries.id).toEqual(123);
        expect(tvSeries.title).toEqual("The Shawshank Redemption")
        expect(tvSeries.overview).toEqual("Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.");
        expect(tvSeries.posterPath).toEqual("/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg");
        expect(tvSeries.releaseDate).toEqual("1994-09-23");
        expect(tvSeries.voteAverage).toEqual(9.3);
        expect(tvSeries.seasons).toEqual(9);
        expect(tvSeries.episodes).toEqual(90);
        expect(tvSeries.productionCompanies).toEqual(["Castle Rock Entertainment", "Warner Bros."]);
    })

    it('Properties are set to undefined when not provided', () =>{
        const tvSeries = new TvSeries(
            1,
        )
        expect(tvSeries.id).toEqual(1);
        expect(tvSeries.title).toBeUndefined();
        expect(tvSeries.overview).toBeUndefined();
        expect(tvSeries.posterPath).toBeUndefined();
        expect(tvSeries.releaseDate).toBeUndefined();
        expect(tvSeries.voteAverage).toBeUndefined();
        expect(tvSeries.seasons).toBeUndefined();
        expect(tvSeries.episodes).toBeUndefined();
        expect(tvSeries.productionCompanies).toBeUndefined();
    });
    

    it('Properties are set corectly when only some are provided', () =>{
        const tvSeries = new TvSeries(
            123,
            "The Shawshank Redemption",
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        );
        expect(tvSeries.id).toEqual(123);
        expect(tvSeries.title).toEqual("The Shawshank Redemption");
        expect(tvSeries.overview).toEqual("Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.")
        expect(tvSeries.posterPath).toBeUndefined();
        expect(tvSeries.releaseDate).toBeUndefined();
        expect(tvSeries.voteAverage).toBeUndefined();
        expect(tvSeries.seasons).toBeUndefined();
        expect(tvSeries.episodes).toBeUndefined();
        expect(tvSeries.productionCompanies).toBeUndefined();
    })

})