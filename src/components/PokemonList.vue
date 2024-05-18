<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import PokemonCard from './PokemonCard.vue';
import { storeToRefs } from 'pinia';

const pokemonStore = usePokemonStore()
const { pokemons } = storeToRefs(pokemonStore)
</script>

<template>
  <section class='grid grid-cols-2 xl:grid-cols-5 md:grid-cols-4 justify-items-center gap-x-2 md:gap-x-4 md:gap-y-5 gap-y-2 md:w-11/12 w-full mx-auto pb-10 z-10'>
    <PokemonCard
      v-for="(pokemon, idx) in pokemons"
      :key="idx"
      :name="pokemon.name"
      :id="pokemon.id"
    />
  </section>
</template>