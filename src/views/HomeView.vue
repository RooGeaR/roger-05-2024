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
  console.log("scroll")
  let element = scrollComponent.value
  console.log("element", element?.getBoundingClientRect())
  console.log("wiindow", window.innerHeight)
  if (element?.getBoundingClientRect().bottom <= window.innerHeight) {
    loadMore()
  }
 }
</script>

<template>
  <div ref="scrollComponent">
    <Title>Tu equipo</Title>
    <TeamContainer />
    <Title>Tus opciones</Title>
    <PokedexContainer />
  </div>
</template>
