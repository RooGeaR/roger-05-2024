<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import TeamCard from './TeamCard.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const pokemonStore = usePokemonStore()
const { pokemonTeam } = storeToRefs(pokemonStore)
const router = useRouter()

const goToTeam = () => {
  router.push({ name: "team" })
}
</script>

<template>
  <section class='border rounded-lg shadow grid grid-cols-2 xl:grid-cols-6 md:grid-cols-3 justify-items-center gap-x-2 md:gap-x-4 md:gap-y-5 gap-y-2 md:w-11/12 w-full mx-auto py-10 z-10 cursor-pointer' @click="goToTeam">
    <TeamCard
      v-for="(pokemon, idx) in pokemonTeam"
      :key="idx"
      :name="pokemon.name"
      :id="pokemon.id"
    />
  </section>
</template>