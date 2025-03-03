<template>
  <div class="row items-center">
    <p class="q-mb-none text-grey-7">
      Organizar por
    </p>

    <q-select
      v-model="selectedSort"
      :options="sortOptions"
      dense
      borderless
      options-dense

    >
      <template v-slot:selected>
        <span class="q-mb-none q-ml-xs text-blue text-weight-medium text-italic">
          {{ selectedSort.label }}
        </span>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const selectedSort = ref('recommended');

const sortOptions = [
  { label: 'Recomendados', value: 'recommended' },
  { label: 'Melhor avaliados', value: 'best_rated' },
];
</script>