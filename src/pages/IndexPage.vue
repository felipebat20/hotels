<template>
  <q-layout view="lHh Lpr lFf">
    <div class="col-12 col-md-8">
      <HotelSearch />

      <div class="row justify-between q-my-md">
        <AppBreadcrumb :breadcrumb-items="getBreadcrumbItems" />
        <HotelSort />
      </div>

      <HotelCardsContainer @set-selected-hotel="setSelectedHotel" />
    </div>
  </q-layout>


  <div
    v-if="drawer_right"
    class="backdrop"
    @click="handleCloseDrawerClick"
  />

  <q-drawer
    side="right"
    v-model="drawer_right"
    :width="900"
    bordered
    overlay
    :behavior="$q.screen.lt.md ? 'mobile' : 'desktop'"
    :breakpoint="0"
    :full-height="true"
    class="z-max"
    @hide="selected_hotel = null"
  >
    <HomeDrawer
      v-if="selected_hotel"
      :hotel="selected_hotel"
    />
  </q-drawer>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import HotelSearch from 'src/components/hotel/HotelSearch.vue';
import HotelSort from 'src/components/hotel/HotelSort.vue';
import HotelCardsContainer from 'src/components/hotel/HotelCardsContainer.vue';
import AppBreadcrumb from 'src/components/AppBreadcrumb.vue';
import HomeDrawer from 'src/components/hotel/HomeDrawer.vue';

import type { HotelInterface } from 'src/interfaces/HotelInterface';

import { usePlacesStore } from 'src/stores/usePlacesStore';
import { useHotelsStore } from 'src/stores/useHotelsStore';

const placesStore = usePlacesStore();
const hotelsStore = useHotelsStore();

const getBreadcrumbItems = computed(() => {
  const breadcrumb_items = [
    { label: 'Início' },
    { label: 'Hotéis' },
  ];

  if (hotelsStore.control_flow.placeId) {
    breadcrumb_items.push({ label: placesStore.places.find((place) => {
      return place.placeId === +hotelsStore.control_flow.placeId;
    })?.name || '' });
  }

  return breadcrumb_items;
});

onMounted(async () => {
  await placesStore.fetchPlaces();
});


const drawer_right = ref(false);
const selected_hotel = ref<HotelInterface | null>(null);
const setSelectedHotel = (hotel: HotelInterface) => {
  selected_hotel.value = hotel;
  drawer_right.value = true;
};

const handleCloseDrawerClick = () => {
  selected_hotel.value = null;
  drawer_right.value = false;
};
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 62px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2000;
}
</style>
