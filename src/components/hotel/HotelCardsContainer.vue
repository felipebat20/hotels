<template>
  <div
    v-if="hotelsStore.control_flow.request_pending && ! hotelsStore.hotels.length"
    class="row justify-center q-my-md"
  >
    <q-spinner-dots color="primary" size="40px" />
  </div>

  <template v-else>
    <q-infinite-scroll
      @load="handleLoad"
      :offset="200"
      :disable="! hasMoreHotels"
    >
      <template v-if="hotelsStore.hotels.length">
        <HotelCard
          v-for="hotel in hotelsStore.hotels"
          :key="hotel.id"
          :hotel="hotel"
          @set-selected-hotel="handleHotelClick"
        />
      </template>


      <template v-else>
        <div class="column items-center q-pa-xl">
          <p class="text-h6 text-grey-6">
            Nenhum hotel encontrado
          </p>
        </div>
      </template>

      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots
            color="primary"
            size="40px"
          />
        </div>
      </template>
    </q-infinite-scroll>

    <div
      v-if="! hotelsStore.control_flow.has_next_page && hotelsStore.hotels.length"
      class="row justify-center"
    >
      <p class="text-grey-6">
        Não existem mais hotéis para serem exibidos
      </p>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import HotelCard from 'src/components/hotel/HotelCard.vue';

import { HotelInterface } from 'src/interfaces/HotelInterface';

import { useHotelsStore } from 'src/stores/useHotelsStore';

const hotelsStore = useHotelsStore();
const request_pending = ref(false);


const hasMoreHotels = computed(() => {
  return hotelsStore.control_flow.has_next_page;
});

const handleLoad = async (index: number, done: () => void) => {
  hotelsStore.control_flow.request_pending = 1 === index;
  request_pending.value = true;

  await hotelsStore.fetchHotels({
    sortBy: hotelsStore.control_flow.sortBy,
    name: hotelsStore.control_flow.name,
    placeId: hotelsStore.control_flow.placeId,
    page: index,
  });

  request_pending.value = false;

  done();
};

const emit = defineEmits(['set-selected-hotel']);
const handleHotelClick = (hotel: HotelInterface) => {
  emit('set-selected-hotel', hotel);
};
</script>
