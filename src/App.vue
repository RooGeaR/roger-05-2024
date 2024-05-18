<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header class="mt-20">
    <Navbar />
  </header>

  <RouterView />
</template>
