<script setup lang="ts">
import { usePokemonStore } from '@/stores/pokemonStore';
import type { ISelectedPokemon } from '@/types/pokemon';
defineProps<{ name: string, id: number }>()

const { selectPokemon } = usePokemonStore()
const handleClick = (pokemon: ISelectedPokemon) => {
  selectPokemon(pokemon)
}
</script>

<template>
  <section class='group hover:shadow-lg relative h-full w-full max-h-36 max-w-56 pt-3 pr-0 pb-2 pl-3 overflow-hidden border border-gray-200 rounded-lg shadow cursor-pointer' @click="handleClick({id, name})">
    <h2 class='capitalize font-bold tracking-tighter md:text-lg text-sm text-gray-900'>
      {{name}}
    </h2>
    <h3 class="opacity-55 absolute right-2 top-1 text-xs font-bold md:right-3 md:top-2 md:text-base">#{{String(`${id}`).padStart(3, "0")}}</h3>
    <figure class='flex items-center justify-center'>
      <div class='w-1/2 relative'>
        <img class='group-hover:animate-bounce delay-150 duration-500 relative h-auto right-1 w-full'
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
          :alt="name" />
      </div>
    </figure>
  </section>
</template>