<template>
  <q-layout view="hHh Lpr fFf">
    <q-header class="shadow-4">
      <AppHeader class="bg-white" />
    </q-header>

    <q-page-container class="bg-grey-3">
      <div class="container">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<style lang="scss" scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  min-height: 100vh;
}
</style>
