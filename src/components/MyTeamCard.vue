<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { IType, IStat } from "@/types/pokemon"
import IconClose from './icons/IconClose.vue';
import { usePokemonStore } from '@/stores/pokemonStore';
import { statColors } from '@/common/constants';

defineProps<{ name: string, id: number, types: IType[], stats: IStat[] }>()
const { removePokemonTeam } = usePokemonStore()
const router = useRouter()
const handleClick = (id: number) => {
  router.push({ name: "teamId", params: { id }})
}

const handleRemove = (id: number) => {
  removePokemonTeam(id)
}
</script>

<template>
  <section class='group hover:shadow-lg relative h-full w-full max-w-96 pt-3 pr-2 pb-2 pl-3 overflow-hidden border border-gray-200 rounded-lg shadow cursor-pointer' @click="handleClick(id)">
    <div class="hover:text-red-500 absolute left-[-5px] top-[-1px] rounded-lg" @click.stop="handleRemove(id)">
      <iconClose />
    </div>
    <h2 class='capitalize font-bold tracking-tighter md:text-lg text-sm text-gray-900'>
      {{name}}
    </h2>
    <h3 class="opacity-55 absolute right-2 top-1 text-xs font-bold md:right-3 md:top-2 md:text-base">#{{String(`${id}`).padStart(3, "0")}}</h3>
    <figure class='flex items-center justify-center'>
      <figcaption className='flex flex-col  justify-center items-center w-1/2'>
        <small
          v-for="(type, idx) in types"
          :key="idx"
          className='flex justify-center items-center w-16 md:w-24 md:h-7 font-normal capitalize py-[1.8px] px-0 bg-gray-200 my-1 rounded-full md:text-base text-xs'
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
    <div
      v-for="(stat, idx) in stats"
      :key="idx"
    >
      <div :class="`text-base text-${statColors[idx]}-700 font-medium mb-1 capitalize`">{{ stat.stat.name }}</div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div :class="`h-2.5 bg-${statColors[idx]}-600 rounded-full`" :style="{width: `${(stat.base_stat * 100)/200}%`}"></div>
      </div>
    </div>
  </section>
</template>