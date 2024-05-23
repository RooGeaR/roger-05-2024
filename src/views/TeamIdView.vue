<script setup lang="ts">
import TeamCardDetail from '@/components/TeamCardDetail.vue';
import { usePokemonStore } from '@/stores/pokemonStore';
import { useRoute } from 'vue-router'

const route = useRoute()
const { getPokemonTeam }  = usePokemonStore()
const pokemon = getPokemonTeam(Number(route.params.id))

</script>
<template>
  <main class="flex items-center justify-center px-2 w-full mx-auto pt-2 pb-2">
    <TeamCardDetail
      :name="pokemon.name"
      :types="pokemon.types"
      :stats="pokemon.stats"
      :species="pokemon.species"
      :id="pokemon.id"
      :height="pokemon.height"
      :weight="pokemon.weight"
      v-if="pokemon"
    />
  </main>
</template>

<style>
</style>
