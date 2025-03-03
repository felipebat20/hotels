<template>
  <div>
    <q-breadcrumbs active-color="primary" separator=">" style="font-size: 16px">
      <template v-slot:separator>
        <q-icon
          name="chevron_right"
          color="primary"
          size="16px"
        />
      </template>

      <q-breadcrumbs-el
        v-for="breadcrumb in breadcrumbItems"
        :key="breadcrumb.label"
        :label="breadcrumb.label"
      />

    </q-breadcrumbs>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  breadcrumbItems: {
    type: Array as PropType<{ label: string }[]>,
    required: true,
  },
});
</script>