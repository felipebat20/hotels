import type { Amenity } from "./AmenityInterface"

export default interface HotelInterface {
  address: {
    city: string
    district: string
    street: string
    number: string
  }

  amenities: Amenity[]
  deals: null
  description: string
  favorite: boolean
  hasAgreement: boolean
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  id: number
  images: string[]
  name: string
  nonRefundable: null
  price: number
  roomsQuantity: number
  stars: string
  thumb: string
}
