import { defineStore } from 'pinia'

import { Place } from 'src/models/Place'
import type { PlaceInterface } from 'src/interfaces/PlaceInterface'

import placesMock from 'src/data/place.json'

const places = placesMock as PlaceInterface[]

export const usePlacesStore = defineStore('places', {
  state: () => ({ places: [] as Place[] }),
  actions: {
    async fetchPlaces() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        this.places = places.map((place) => new Place(place))
      } catch (error: unknown) {
        return error
      }
    },
  },
})