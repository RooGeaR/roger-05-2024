import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPokemon, ISelectedPokemon } from '@/types/pokemon';
import axios from 'axios';

const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const POKEDEX_LIMIT = 150;
export const ITEMS_PER_PAGE = 25;
const TEAM_MAX_POKEMON = 6;

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<IPokemon[]>([])
  const offsetPage = ref(ITEMS_PER_PAGE)
  const pokemonTeam = ref<ISelectedPokemon[]>(Array(6).fill(undefined).map((v, i) => ({name: "??????", id: i})));

  const total = computed(() => pokemonTeam.value.filter(item => item.name !== "??????").length)

  const getPokemons = async (limit = ITEMS_PER_PAGE, offset = 0) => {
    try {
      const response = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`);
      const responsePokemons = response.data.results.map((item: IPokemon) => {
        const paths = item.url.split("/").filter(entry => entry !== "");
        const id = paths[paths.length - 1];
        return {
          ...item,
          id: Number(id)
        }
      });
      if (offset === 0) {
        pokemons.value = responsePokemons
      }
      return responsePokemons;
    } catch (e) {
      console.log(e)
    }
  };

  const loadMore = async () => {
    if (pokemons.value.length < POKEDEX_LIMIT) {
      const newPokemons = await getPokemons(ITEMS_PER_PAGE, offsetPage.value)
      offsetPage.value +=  ITEMS_PER_PAGE
      pokemons.value.push(...newPokemons)
    }
   }

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

  return { pokemons, pokemonTeam, getPokemons, selectPokemon, getPokemon, loadMore, total }
})
