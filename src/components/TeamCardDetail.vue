<script setup lang="ts">
import type { IType, IStat, IBaseItem } from "@/types/pokemon"
import { statColors } from '@/common/constants';
import { usePokemonStore } from '@/stores/pokemonStore';
import { onMounted, ref } from "vue";

const pokemonDetail = ref()
const { getPokemonDetail } = usePokemonStore()
const props = defineProps<{ name: string, id: number, types: IType[], stats: IStat[], species: IBaseItem, weight: number, height: number }>()

onMounted(async () => {
  pokemonDetail.value = await getPokemonDetail(props.species)
})

</script>

<template>
  <section class='group hover:shadow-lg relative h-full w-full max-w-2xl pt-6 px-6 pb-2 overflow-hidden border border-gray-200 rounded-lg shadow cursor-pointer'>
    <h2 class='capitalize font-bold tracking-tighter md:text-xl text-lg text-gray-900'>
      {{name}}
    </h2>
    <h3 class="opacity-55 absolute right-2 top-1 text-base font-bold md:right-3 md:top-2 md:text-lg">#{{String(`${id}`).padStart(3, "0")}}</h3>
    <figure class='flex items-center justify-center'>
      <figcaption className='flex flex-col  justify-center items-center w-1/2'>
        <small
          v-for="(type, idx) in types"
          :key="idx"
          className='flex justify-center items-center w-24 md:w-36 md:h-7 font-normal capitalize py-[1.8px] px-0 bg-gray-200 my-1 rounded-full md:text-xl text-base'
        >
            {{type.type.name}}
          </small>
      </figcaption>
      <div class='w-1/2 relative'>
        <img class='group-hover:animate-bounce delay-150 duration-500 relative h-auto right-1 w-full'
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`"
          :alt="name" />
      </div>
    </figure>
    <div class="flex items-center justify-around">
      <div class="text-center">
         <h1 class="md:text-base text-xs font-bold">Weight</h1>
         <span class="md:text-base text-xs">{{ weight/10 }} kg</span> 
      </div>
      <div class="text-center">
         <h1 class="md:text-base text-xs font-bold">Height          </h1>
         <span class="md:text-base text-xs">{{ height/10 }} m</span> 
      </div>
    </div>
    <div class="text-center text-lg md:text-xl mt-3">
      {{ pokemonDetail?.description }}
    </div>
    <div
      v-for="(stat, idx) in stats"
      :key="idx"
    >
      <div class="text-base font-medium mb-1 capitalize" :class="{[`text-${statColors[idx]}-700`]:true}">{{ stat.stat.name }}</div>
      <div class="w-full bg-gray-200 rounded-full h-4">
        <div class="h-4 rounded-full" :class="{[`bg-${statColors[idx]}-600`]:true}" :style="{width: `${(stat.base_stat * 100)/200}%`}"></div>
      </div>
    </div>
    <div class="mt-3">
      <h1 class="md:text-xl text-base font-bold text-center">Evolution Chain</h1>
      <div class="flex justify-around items-center">
        <div class='w-1/4 relative text-center' v-for="pokemon in pokemonDetail?.evolutionChain" :key="pokemon.id">
          <img class='relative h-auto right-1 w-full'
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
            :alt="pokemon.name" />
          <span class="capitalize md:text-base text-xs font-bold">{{ pokemon.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>