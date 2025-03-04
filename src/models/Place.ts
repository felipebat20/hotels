import type { PlaceInterface } from 'src/interfaces/PlaceInterface';

export class Place {
  readonly name: string
  readonly state: {
    name: string
    shortname: string
  }

  readonly placeId: number

  constructor(data: PlaceInterface) {
    this.name = data.name
    this.state = data.state
    this.placeId = data.placeId
  }
}