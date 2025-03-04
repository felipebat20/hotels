<template>
  <q-card class="row no-shadow q-mb-md hotel-card-container">
    <q-card-section class="image-container col-12 col-sm-3 q-pa-none">
      <q-carousel
        v-model="slide"
        infinite
        animated
        arrows
        :autoplay="9999"
        height="250px"
        navigation-icon="radio_button_unchecked"
        control-type="regular"
        control-color="white"
        control-text-color="grey"
        class="custom-border"
      >
        <q-carousel-slide
          v-for="(image, index) in hotel.images"
          :key="image"
          :name="index"
          :img-src="image"
          class="fit"
        />
      </q-carousel>
    </q-card-section>

    <q-card-section class="col-12 col-sm-6">
      <p
        class="text-h5 q-mb-none cursor-pointer"
        @click="handleHotelClick"
      >
        {{ hotel.name }}
      </p>

      <span class="text-grey-6">
        {{ hotel.address.fullAddress }}
      </span>

      <div class="q-ma-none q-mb-sm row items-center q-gutter-x-sm">
        {{ hotel_rating }}

        <q-rating
          v-model="hotel_rating"
          readonly
          size="18px"
          :max="5"
          color="yellow"
        />

        <template v-if="hotel.amenities?.length">
          <q-separator vertical color="grey" />

          <q-icon
            v-for="amenity in getParsedHotelAmenities"
            :key="amenity.key"
            :name="amenity.icon"
            size="xs"
          >
            <q-tooltip class="bg-primary text-bold">
              {{ amenity.label }}
            </q-tooltip>
          </q-icon>
        </template>
      </div>

      <q-chip
        v-if="canRefund"
        color="grey"
        text-color="white"
        class="text-weight-medium"
        square
      >
        Reembolsável
      </q-chip>
    </q-card-section>

    <q-card-section class="col-12 col-sm-3">
      <q-separator vertical color="grey-3" class="custom-separator" />

      <p class="q-mb-xs text-grey-6 text-caption">
        A partir de:
      </p>

      <p class="q-mb-xs">
        R$ <span class="text-h5">
          {{ getHotelPrice }}
        </span>
      </p>

      <p class="q-mb-none text-grey-6 text-caption">
        R${{ getPerNightCurrency }}/noite
      </p>

      <p class="text-grey-7 q-mb-xl text-caption">
        Impostos inclusos
      </p>

      <div class="row">
        <q-btn
          rounded
          no-caps
          color="primary"
          size="md"
          class="col-12 col-sm-auto"
          style="min-width: 140px"
          @click="handleHotelClick"
        >
          Selecionar
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type { HotelInterface } from '@/interfaces/HotelInterface';
import type { Amenity } from '@/interfaces/AmenityInterface';

import { formatCurrency } from '@/utils/format-currency';

const slide = ref(0);
const { hotel } = defineProps<{
  hotel: HotelInterface;
}>();

const emit = defineEmits(['set-selected-hotel']);

const handleHotelClick = () => {
  emit('set-selected-hotel', hotel);
};

const hotel_rating = ref(+hotel.stars);

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

const getParsedHotelAmenities = computed(() => {
  return hotel.amenities?.map((amenity: Amenity) => ({
    key: amenity.key,
    label: amenity.label,
    icon: amenities_icons[amenity.key],
  }));
});

const canRefund = computed(() => {
  return hotel.hasRefundableRoom && ! hotel.nonRefundable;
});

const getHotelPrice = computed(() => {
  return formatCurrency(hotel.price);
});

const getPerNightCurrency = computed(() => {
  return formatCurrency(hotel.price / 3);
});

</script>

<style lang="scss" scoped>
.fit { object-fit: cover; }
.image-container {
  :deep(.q-carousel) {
    .q-panel.scroll { overflow: hidden !important; }
    .q-carousel__prev-arrow--horizontal { left: .5rem; }
    .q-carousel__next-arrow--horizontal { right: .5rem; }
    .q-carousel__arrow {
      button {
        width: 1.125rem;
        height: 1.125rem;
        min-width: unset;
        min-height: unset;

        i { font-size: 1rem; }
      }
    }
  }
}

.price-container { border-left: 1px solid $grey-3!important; }
.custom-border {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.hotel-card-container {
  border-radius: 20px;
  overflow: hidden;
}

.custom-separator {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
