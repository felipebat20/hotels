<template>
  <q-card class="bg-white no-shadow border-radius-md">
    <q-card-section class="q-px-md q-py-sm">
      <h2 class="text-h5 q-ma-none">Reservar hotel</h2>
    </q-card-section>

    <q-separator />

    <q-card-section class="column q-gutter-md">
      <div>
        <label>
          <span>
            Destino

            <span class="text-red-5">*</span>
          </span>

          <q-select
            v-model="city_search"
            :options="filteredPlaces"
            use-input
            hide-selected
            fill-input
            dense
            outlined
            hide-dropdown-icon
            input-debounce="0"
            placeholder="Cidade, UF"
            option-value="placeId"
            class="place-select"
            clearable
            @filter="handleFilterPlaces"
          />
        </label>
      </div>

      <div>
        <label>
          <span>
            Nome do hotel
          </span>

          <q-input
            v-model="hotel_name"
            placeholder="Nome do Hotel"
            required
            dense
            class="full-width"
            outlined
            @keyup.enter.exact="handleSearch"
          />
        </label>
      </div>

      <div class="row justify-end">
        <q-btn
          rounded
          no-caps
          color="primary"
          size="md"
          class="col-12 col-sm-auto"
          style="min-width: 180px"
          :loading="request_pending"
          @click="handleSearch"
        >
          {{ getButtonFeedback }}

          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />

            Buscando...
          </template>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { useHotelsStore } from 'src/stores/useHotelsStore';
import { usePlacesStore } from 'src/stores/usePlacesStore';

interface Place {
  placeId: string;
  name: string;
  state: { name: string; };
  label?: string;
  value?: string;
}

const city_search = ref<Place | null>(null);
const hotel_name = ref('');
const request_pending = ref(false);

const filteredPlaces = ref();

const hotelsStore = useHotelsStore();

const placesStore = usePlacesStore();

const getFormattedPlaces = computed(() => {
  return placesStore.places.map((city) => {
    return {
      label: `${city.name}, ${city.state.name}`,
      value: city.placeId,
      ...city
    };
  });
});


const handleFilterPlaces = (value: string, update: (callbackFn: () => void) => void) => {
  update(() => {
    const new_search = value.toLowerCase();

    filteredPlaces.value = getFormattedPlaces.value.filter((place) => {
      return place.label.toLowerCase().includes(new_search) || place.state.name.toLowerCase().includes(new_search);
    })
  });
};

const getButtonFeedback = computed(() => {
  if (
    (hotel_name.value || city_search.value?.placeId) &&
    (hotelsStore.control_flow.name !== hotel_name.value ||
    hotelsStore.control_flow.placeId !== city_search.value?.placeId)
  ) {
    return 'Alterar busca';
  }

  return 'Buscar';
});

const handleSearch = async () => {
  hotelsStore.control_flow.name = hotel_name.value;
  hotelsStore.control_flow.placeId = city_search.value?.placeId ?? '';
  hotelsStore.hotels = [];
  hotelsStore.control_flow.request_pending = true;

  await hotelsStore.fetchHotels({
    name: hotel_name.value,
    placeId: city_search.value?.placeId ?? '',
    sortBy: hotelsStore.control_flow.sortBy
  });

  hotelsStore.control_flow.request_pending = false ;
};
</script>

<style scoped>
.border-radius-md { border-radius: 10px; }
</style>
