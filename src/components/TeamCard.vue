<script setup lang="ts">
import IconPokeball from './icons/IconPokeball.vue';
defineProps<{ name: string, id: number }>()
</script>

<template>
  <section class='relative h-full w-full max-h-36 max-w-56 pt-3.5 pr-0 pb-2 pl-3 overflow-hidden'>
    <figure class='flex items-center justify-center'>
      <div class='w-1/2 relative'>
        <span class="flex justify-center mb-9 mt-8 text-gray-900 text-xl" v-if="name === '??????'">
          <IconPokeball />
        </span>
        <img class='relative h-auto right-1 w-full'
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
          :alt="name" v-else />
      </div>
    </figure>
    <h2 class='capitalize font-bold tracking-tighter md:text-lg text-sm text-gray-900 text-center'>
      {{name}}
    </h2>
  </section>
</template>