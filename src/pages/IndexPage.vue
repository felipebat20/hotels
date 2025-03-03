<template>
  <q-layout view="lHh Lpr lFf">
      <div class="col-12 col-md-8">
        <HotelSearch />

        <div class="row justify-between q-my-md">
          <AppBreadcrumb :breadcrumb-items="breadcrumbItems" />
          <HotelSort />
        </div>

        <HotelCard />
      </div>
  </q-layout>
</template>

<script setup lang="ts">
import HotelSearch from 'src/components/hotel/HotelSearch.vue';
import HotelCard from 'src/components/hotel/HotelCard.vue';
import HotelSort from 'src/components/hotel/HotelSort.vue';

import AppBreadcrumb from 'src/components/AppBreadcrumb.vue';

const breadcrumbItems = [
  { label: 'Início' },
  { label: 'Hotéis' },
  { label: 'Belo Horizonte' },
];
</script>
