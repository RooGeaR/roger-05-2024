import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

const baseUrl = "https://pokeapi.co/api/v2/pokemon";

interface IPokemon {
  name: string;
  url: string;
}

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<IPokemon[]>([]);

  const getPokemons = async (limit = 24, offset = 0) => {
    try {
      const response = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`);
      pokemons.value = response.data.results;
    } catch (e) {
      console.log(e)
    }
  };

  return { pokemons, getPokemons }
})
