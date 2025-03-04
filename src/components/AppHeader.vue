<template>
  <div class="row items-center q-mx-auto q-pa-xs z-max">
    <h1>
      <img :src="Logo"
        alt="Logo"
        :style="{ width: '200px' }"
        class="q-ma-none"
      />
    </h1>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/assets/main-logo.svg'
</script>
