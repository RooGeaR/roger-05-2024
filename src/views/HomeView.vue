<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import PokedexContainer from '@/components/PokedexContainer.vue';
import { onMounted } from 'vue';

const { getPokemons } = usePokemonStore()

onMounted( async () => {
  await getPokemons()
})
</script>

<template>
  <PokedexContainer />
</template>
