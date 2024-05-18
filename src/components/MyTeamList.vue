<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import MyTeamCard from './MyTeamCard.vue';
import { storeToRefs } from 'pinia';


const pokemonStore = usePokemonStore()
const { pokemonTeamDetail } = storeToRefs(pokemonStore)
</script>

<template>
  <section class='grid grid-cols-2 xl:grid-cols-3 md:grid-cols-3 justify-items-center gap-x-2 md:gap-x-4 md:gap-y-5 gap-y-2 md:w-11/12 w-full mx-auto py-10 z-10 cursor-pointer'>
    <MyTeamCard
      v-for="(pokemon, idx) in pokemonTeamDetail"
      :key="idx"
      :name="pokemon.name"
      :types="pokemon.types"
      :stats="pokemon.stats"
      :id="pokemon.id"
    />
  </section>
</template>