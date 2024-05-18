<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import PokedexContainer from '@/components/PokedexContainer.vue';
import { onMounted } from 'vue';
import TeamContainer from '@/components/TeamContainer.vue';
import Title from '@/components/Title.vue';

const { getPokemons } = usePokemonStore()

onMounted( async () => {
  await getPokemons()
})
</script>

<template>
  <Title>Tu equipo</Title>
  <TeamContainer />
  <Title>Tus opciones</Title>
  <PokedexContainer />
</template>
