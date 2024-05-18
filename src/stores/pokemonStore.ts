import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPokemon, IPokemonDetail, ISelectedPokemon } from '@/types/pokemon';
import axios from 'axios';

const baseUrl = "https://pokeapi.co/api/v2/pokemon";
const POKEDEX_LIMIT = 150;
export const ITEMS_PER_PAGE = 25;
const TEAM_MAX_POKEMON = 6;

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<IPokemon[]>([])
  const offsetPage = ref(ITEMS_PER_PAGE)
  const pokemonTeam = ref<ISelectedPokemon[]>(Array(TEAM_MAX_POKEMON).fill(undefined).map((v, i) => ({name: "??????", id: i})));
  const pokemonTeamDetail = ref<IPokemonDetail[]>([]);

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
      return response.data as IPokemonDetail;
    } catch (e) {
      console.log(e)
    }
  };

  const selectPokemon = (pokemon: ISelectedPokemon) => {
    if (pokemonTeam.value.some(item => item.name == pokemon.name)) {
      return
    }
    const idx = pokemonTeam.value.findIndex((item) => item.name === "??????")
    if (idx !== -1) {
      pokemonTeam.value[idx] = {...pokemon}
    }
  }

  const getPokemonTeamDetail = async () => {
    const promises = pokemonTeam.value.filter(item => item.name !== "??????").map(async (pokemon) => {
      return await getPokemon(pokemon.id);
    });
    const results = await Promise.all(promises);
    pokemonTeamDetail.value = results as IPokemonDetail[]
  }

  const getPokemonTeam = (id: number) => {
    return pokemonTeamDetail.value.find(pokemon => pokemon.id === id)
  }

  const removePokemonTeam = (id: number) => {
    pokemonTeamDetail.value = pokemonTeamDetail.value.filter(pokemon => pokemon.id !== id)
    pokemonTeam.value = pokemonTeam.value.filter(pokemon => pokemon.id !== id)
    pokemonTeam.value.push({name: "??????", id: pokemonTeam.value.length + 1})
  }

  return { pokemons, pokemonTeam, pokemonTeamDetail, total, getPokemons, selectPokemon, getPokemon, loadMore, getPokemonTeamDetail, getPokemonTeam, removePokemonTeam }
})
