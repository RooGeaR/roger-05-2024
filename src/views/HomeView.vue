<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import PokedexContainer from '@/components/PokedexContainer.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import TeamContainer from '@/components/TeamContainer.vue';
import Title from '@/components/Title.vue';

const scrollComponent = ref(null)

const { getPokemons, loadMore } = usePokemonStore()

onMounted( async () => {
  window.addEventListener("scroll", handleScroll)
  await getPokemons()
})

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
 })

 onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll)
 })

 const handleScroll = (e: Event) => {
  let element = scrollComponent.value
  if (element?.getBoundingClientRect().bottom <= window.innerHeight) {
    loadMore()
  }
 }
</script>

<template>
  <div ref="scrollComponent">
    <TeamContainer />
    <div class=" top-96 absolute w-full">
      <Title>Tus opciones</Title>
      <PokedexContainer />
    </div>
  </div>
</template>
