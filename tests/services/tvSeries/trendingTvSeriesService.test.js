import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import TvSeries from "../../../src/models/TvSeries";
import getTrendingTvSeries from "../../../src/services/TvSeries/TrendingTvSeriesService";

vi.mock('axios')


describe('getTrendingTvSeries', async()=>{
    it('Successlly fetches data', async()=>{
        const mockResponse = {
            data: {
              results: [
                { id: 1, name: "Tv series 1", poster_path: "/poster1.jpg" },
                { id: 2, name: "Tv series 2", poster_path: "/poster2.jpg" },
              ],
            },
          };
      
          axios.get.mockResolvedValue(mockResponse);
      
          const tvSeries = await getTrendingTvSeries();
      
          expect(tvSeries).toEqual([
            new TvSeries(1, "Tv series 1", undefined, "/poster1.jpg"),
            new TvSeries(2, "Tv series 2", undefined, "/poster2.jpg"),  
          ]);
    })
    it('Failes to fetch data', async()=>{
        const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(()=>{});

        axios.get.mockRejectedValue(new Error('Failed'));

        await expect(getTrendingTvSeries()).rejects.toThrow('Failed')
        expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to get the trending TV Series", expect.any(Error))
    })
})