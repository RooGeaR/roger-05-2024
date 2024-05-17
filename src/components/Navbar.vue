<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from 'vue-router'
import IconPokeball from "./icons/IconPokeball.vue";
import IconMenuLeft from "./icons/IconMenuLeft.vue";
import IconClose from "./icons/IconClose.vue";

let open = ref(false);

const menuOpen = () => {
  open.value = !open.value;
}
</script>

<template>
  <nav class="fixed top-0 w-full z-10 bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
    <div class="flex items-center cursor-pointer">
      <span class="text-green-500 text-xl mr-1">
        <IconPokeball />
      </span>
      <h1 class="text-xl">Pokedex</h1>
    </div>
    <span @click="menuOpen()" class="absolute md:hidden right-6 top-4 cursor-pointer text-4xl">
      <IconClose v-if="open" />
      <IconMenuLeft v-else />
    </span>
    <ul class="md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute bg-gray-900 md:w-auto w-full top-14 duration-700 ease-in" :class="[open ? 'left-0' : 'left-[-100%]']">
      <li class="md:mx-4 md:my-0 my-6">
        <RouterLink to="/" class="text-xl hover:text-green-500">Home</RouterLink>
      </li>
      <li class="md:mx-4">
        <RouterLink to="/team" class="text-xl hover:text-green-500">Team</RouterLink>
      </li>
    </ul>
  </nav>
</template>

