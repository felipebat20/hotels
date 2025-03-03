export enum AmenitiesEnum {
  AIR_CONDITIONING = 'ac_unit',
  AUDITORIUM = 'vertical_shades_closed',
  BREAKFAST = 'bakery_dining',
  FITNESS_CENTER = 'fitness_center',
  LAUNDRY = 'local_laundry_service',
  MASSAGE = 'spa',
  MEETING_ROOM = 'meeting_room',
  PARKING = 'local_parking',
  PETS = 'pets',
  PLAY_GROUND = 'mood',
  POOL = 'pool',
  PUB = 'sports_bar',
  RECEPTION_24_HOURS = 'timer',
  RESTAURANT = 'restaurant',
  ROOM_SERVICE = 'room_service',
  ROOM_TV = 'tv',
  SAFE = 'lock',
  SPA = 'self_improvement',
  STAGE = 'vertical_shades',
  STEAM_ROOM = 'hot_tub',
  TRANSFER = 'cases',
  WI_FI = 'wifi',
}

export interface Amenity {
  key: keyof typeof AmenitiesEnum
  label: string
}