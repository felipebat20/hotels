<template>
  <q-card class="bg-white rounded-borders-md">
    <q-card-section class="q-px-md q-py-sm">
      <h2 class="text-h5 q-ma-none">Reservar hotel</h2>
    </q-card-section>

    <q-separator />

    <q-card-section class="column q-gutter-md">
      <div>
        <label>
          <span>
            Destino
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
            @filter="handleFilterPlaces"
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
        >
          Buscar

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

import places from '@/data/place.json';

const city_search = ref('');

const options = ref(places);

const filteredPlaces = ref();

const getFormattedPlaces = computed(() => {
  return options.value.map((city) => {
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
</script>
