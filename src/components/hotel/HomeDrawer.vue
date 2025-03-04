<template>
  <q-card-section class="q-pb-none">
    <div class="row justify-between full-width items-center">
      <div class="q-ma-none q-mb-sm row items-center q-gutter-x-sm">
        {{ rating.toFixed(1) }}

        <q-rating
          v-model="rating"
          readonly
          size="18px"
          :max="5"
          color="yellow-7"
        />
      </div>
    </div>

    <p class="text-h4 q-mb-none two-lines-truncate">
      {{ hotel.name }}
    </p>

    <p class="text-grey-6 q-mb-none">
      {{ hotel.address.fullAddress }}
    </p>
  </q-card-section>

  <q-card-section>
    <q-carousel
      v-model="slide"
      :autoplay="9999"
      animated
      arrows
      class="no-scroll"
      control-color="white"
      control-text-color="grey"
      control-type="regular"
      height="512px"
      infinite
      navigation-icon="radio_button_unchecked"
    >
      <q-carousel-slide
        v-for="(image, index) in hotel.images"
        :key="index"
        :name="index"
        class="q-pa-none"
        style="height: 512px"
      >
        <q-img
          :src="image"
          spinner-color="primary"
          fit="cover"
          height="512px"
          class="full-width"
          no-native-menu
        />
      </q-carousel-slide>

      <template v-slot:control>
        <div class="image-counter text-white q-px-md q-py-xs">
          {{ slide + 1 }}/{{ hotel.images.length }}
        </div>
      </template>
    </q-carousel>
  </q-card-section>

  <q-card-section v-if="hotel.amenities.length">
    <p class="text-h5">
      Facilidades do hotel
    </p>

    <q-separator />

    <div class="q-my-lg grid">
      <span
        v-for="amenity in getAmenities"
        class="text-grey-6 row justify-start items-center q-pb-sm"
        :key="amenity.key"
      >
        <q-icon
          :name="amenity.icon"
          size="sm"
          class="q-mr-xs"
        />

        {{ amenity.label }}
      </span>
    </div>

    <div
      v-if="hotel.amenities.length > 4"
      class="row justify-center q-mb-lg"
    >
      <q-btn
        rounded
        no-caps
        color="primary"
        outline
        @click="toggleFacilities"
      >
        {{ show_facilities ? 'Mostrar menos facilidades' : 'Mostrar todas as facilidades' }}
      </q-btn>
    </div>

    <q-separator />
  </q-card-section>

  <q-card-section v-if="hotel.description">
    <p class="text-h5">
      Conheça um pouco mais
    </p>

    <p class="text-grey-6">
      {{ hotel.description }}
    </p>
  </q-card-section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

const { hotel } = defineProps<{
  hotel: HotelInterface;
}>();

const rating = ref(+hotel.stars);
const slide = ref(0);
const show_facilities = ref(false);
const amenities_icons = {
  AIR_CONDITIONING: 'ac_unit',
  AUDITORIUM: 'vertical_shades_closed',
  BREAKFAST: 'breakfast_dining',
  FITNESS_CENTER: 'fitness_center',
  LAUNDRY: 'local_laundry_service',
  MASSAGE: 'spa',
  MEETING_ROOM: 'meeting_room',
  PARKING: 'local_parking',
  PETS: 'pets',
  PLAY_GROUND: 'mood',
  POOL: 'pool',
  PUB: 'sports_bar',
  RECEPTION_24_HOURS: 'timer',
  RESTAURANT: 'restaurant',
  ROOM_SERVICE: 'room_service',
  ROOM_TV: 'tv',
  SAFE: 'lock',
  SPA: 'self_improvement',
  STAGE: 'vertical_shades',
  STEAM_ROOM: 'hot_tub',
  TRANSFER: 'cases',
  WI_FI: 'wifi',
}

const getAmenities = computed(() => {
  return hotel.amenities.map((amenity) => {
    return {
      key: amenity.key,
      label: amenity.label,
      icon: amenities_icons[amenity.key],
    };
  }).filter((_, index) => {
    return index < 4 || show_facilities.value;
  });
});

const toggleFacilities = () => {
  show_facilities.value = ! show_facilities.value;
}
</script>


<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: space-between;
}
</style>