import { defineStore } from 'pinia';

import type { HotelWithPlaces, HotelInterface } from 'src/interfaces/HotelInterface';

import hotels_data from 'src/data/hotel.json';


export const useHotelsStore = defineStore('hotels', {
  state: () => ({
    hotels: [] as HotelInterface[],
    control_flow: {
      sortBy: '',
      name: '',
      placeId: '',
      request_pending: false,
      page: 1,
      has_next_page: true,
    },
  }),

  getters: { getHotels: (state) => state.hotels, },
  actions: {
    async fetchHotels({
      placeId,
      sortBy,
      page = 1,
      name
    }: {
        placeId?: number | string
        page?: number
        name?: string
        sortBy?: string
    }) {
      const all_hotels = [...hotels_data] as HotelWithPlaces[];

      try {
        let filtered_hotels = all_hotels.find((hotel) => hotel.placeId === placeId)?.hotels ||
          all_hotels.flatMap((hotel) => hotel.hotels) || [];


        if (! filtered_hotels.length) {
          this.control_flow.has_next_page = false;

          return this.hotels = [];
        }

        if (name) {
          filtered_hotels = filtered_hotels.filter((hotel) =>
            hotel.name.toLowerCase().includes(name.toLowerCase()),
          )
        }

        if (sortBy === 'best_rated') {
          filtered_hotels = filtered_hotels.sort((a, b) => +b.stars - +a.stars);
        }

        const paginated_hotels = filtered_hotels.slice((page - 1) * 10, page * 10);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.control_flow.has_next_page = paginated_hotels.length >= 10;
        if (page === 1) {
          return this.hotels = paginated_hotels;
        }

        return this.hotels = [...this.hotels, ...paginated_hotels] as HotelInterface[];
      } catch (error) {
        return error;
      }
    }
  },
})