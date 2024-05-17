<script setup lang="ts">
defineProps<{ name: string, id: string }>()
const handleClick = () => {

}
</script>

<template>
  <section class='pokemonCard cursor-pointer' style={styleBg} @click="handleClick">
    <h2 class='capitalize font-bold tracking-tighter md:text-lg text-sm text-gray-900'>
      {{name}}
    </h2>
    <h3>#{{String(`${id}`).padStart(3, "0")}}</h3>
    <figure class='flex items-center justify-center'>
      <div class='w-1/2 relative'>
        <img class='pokemonImg'
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
          alt="name" />
      </div>
    </figure>
  </section>
</template>