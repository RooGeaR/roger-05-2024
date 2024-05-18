import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPokemon, ISelectedPokemon } from '@/types/pokemon';
import axios from 'axios';

const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const TEAM_MAX_POKEMON = 6;

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<IPokemon[]>([])
  const pokemonTeam = ref<ISelectedPokemon[]>(Array(6).fill(undefined).map((v, i) => ({name: "??????", id: i})));

  const total = computed(() => pokemonTeam.value.filter(item => item.name !== "??????").length)

  const getPokemons = async (limit = 24, offset = 0) => {
    try {
      const response = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`);
      pokemons.value = response.data.results.map((item: IPokemon) => {
        const paths = item.url.split("/").filter(entry => entry !== "");
        const id = paths[paths.length - 1];
        return {
          ...item,
          id: Number(id)
        }
      });
    } catch (e) {
      console.log(e)
    }
  };

  const getPokemon = async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      pokemons.value = response.data.results.map((item: IPokemon) => ({...item, id: Number(item.url.substring(item.url.lastIndexOf("/") + 1))}));
    } catch (e) {
      console.log(e)
    }
  };

  const selectPokemon = (pokemon: ISelectedPokemon) => {
    pokemonTeam.value.push(pokemon)
    if(pokemonTeam.value.length >= TEAM_MAX_POKEMON) {
      pokemonTeam.value.shift()
    }
  }

  return { pokemons, pokemonTeam, getPokemons, selectPokemon, getPokemon, total}
})
