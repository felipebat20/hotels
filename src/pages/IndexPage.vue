<template>
  <q-layout view="lHh Lpr lFf">
    <div class="col-12 col-md-8">
      <HotelSearch />

      <div class="row justify-between q-my-md">
        <AppBreadcrumb :breadcrumb-items="getBreadcrumbItems" />
        <HotelSort />
      </div>

      <HotelCardsContainer />
    </div>
  </q-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { onMounted } from 'vue';

import HotelSearch from 'src/components/hotel/HotelSearch.vue';
import HotelSort from 'src/components/hotel/HotelSort.vue';
import HotelCardsContainer from 'src/components/hotel/HotelCardsContainer.vue';
import AppBreadcrumb from 'src/components/AppBreadcrumb.vue';

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
</script>
