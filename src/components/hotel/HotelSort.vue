<template>
  <div class="row items-center">
    <p class="q-mb-none text-grey-7">
      Organizar por
    </p>

    <q-select
      v-model="selected_sort"
      :options="sortOptions"
      dense
      borderless
      options-dense
      @update:model-value="handleSort"
    >
      <template v-slot:selected>
        <span class="q-mb-none q-ml-xs text-blue text-weight-medium text-italic">
          {{ selected_sort.label }}
        </span>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

import { useHotelsStore } from 'src/stores/useHotelsStore';

interface SortOption {
  label: string;
  value: string;
}

const emit = defineEmits(['fetch-hotels'])

const sortOptions: Ref<SortOption[]> = ref([
  {
    label: 'Recomendados',
    value: 'recommended'
  },

  {
    label: 'Melhor avaliados',
    value: 'best_rated'
  },
]);

const selected_sort: Ref<SortOption> = ref(sortOptions.value[0] as SortOption);
const hotelsStore = useHotelsStore();

const handleSort = async ({ value }: { value: string }) => {
  hotelsStore.control_flow.sortBy = value;
  hotelsStore.hotels = [];
  hotelsStore.control_flow.request_pending = true;

  await hotelsStore.fetchHotels({
    sortBy: value,
    name: hotelsStore.control_flow.name,
    placeId: hotelsStore.control_flow.placeId,
    page: 1,
  });

  hotelsStore.control_flow.request_pending = false;
};
</script>