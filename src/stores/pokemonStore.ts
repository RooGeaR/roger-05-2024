import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { IPokemon, IPokemonDetail, ISelectedPokemon, IBaseItem, IFlavorTextEntry } from '@/types/pokemon'
import axios from 'axios'

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
const POKEDEX_LIMIT = 151
export const ITEMS_PER_PAGE = 25
const TEAM_MAX_POKEMON = 6

export const usePokemonStore = defineStore('pokemonStore', () => {
  const pokemons = ref<IPokemon[]>([])
  const pokemonTeam = ref<ISelectedPokemon[]>(
    Array(TEAM_MAX_POKEMON)
      .fill(undefined)
      .map((v, i) => ({ name: '??????', id: i }))
  )
  const pokemonTeamDetail = ref<IPokemonDetail[]>([])

  const total = computed(() => pokemonTeam.value.filter((item) => item.name !== '??????').length)

  const getPokemons = async (limit = ITEMS_PER_PAGE, offset = 0) => {
    try {
      const response = await axios.get(`${baseUrl}?limit=${limit}&offset=${offset}`)
      const responsePokemons = response.data.results.map((item: IPokemon) => {
        const paths = item.url.split('/').filter((entry) => entry !== '')
        const id = paths[paths.length - 1]
        return {
          ...item,
          id: Number(id)
        }
      })
      if (offset === 0) {
        pokemons.value = responsePokemons
      }
      return responsePokemons
    } catch (e) {
      console.log(e)
    }
  }

  const loadMore = async () => {
    const total = pokemons.value.length;
    if (total < POKEDEX_LIMIT) {
      let itemsPerPage = ITEMS_PER_PAGE;
      if (total === 150) {
        itemsPerPage = 1
      }
      const newPokemons = await getPokemons(itemsPerPage, total)
      pokemons.value.push(...newPokemons)
    }
  }

  const getPokemon = async (id: number | string) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`)
      return response.data as IPokemonDetail
    } catch (e) {
      console.log(e)
    }
  }

  const getPokemonData = async (url: string) => {
    try {
      const { data } = await axios.get(url)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const selectPokemon = (pokemon: ISelectedPokemon) => {
    if (pokemonTeam.value.some((item) => item.name == pokemon.name)) {
      return
    }
    const idx = pokemonTeam.value.findIndex((item) => item.name === '??????')
    if (idx !== -1) {
      pokemonTeam.value[idx] = { ...pokemon }
    }
  }

  const getPokemonTeamDetail = async () => {
    const promises = pokemonTeam.value
      .filter((item) => item.name !== '??????')
      .map(async (pokemon) => {
        return await getPokemon(pokemon.id)
      })
    const results = await Promise.all(promises)
    pokemonTeamDetail.value = results as IPokemonDetail[]
  }

  const getPokemonTeam = (id: number) => {
    return pokemonTeamDetail.value.find((pokemon) => pokemon.id === id)
  }

  const getPokemonDetail = async (specie: IBaseItem) => {
    const pokemonSpecie = await getPokemonData(specie.url)
    const { chain } = await getPokemonData(pokemonSpecie.evolution_chain.url)
    const evolutionChain: IPokemon[] = []
    const evol1: IPokemon | undefined = await getPokemonEvolChain(chain.species.name)
    if (evol1) {
      evolutionChain.push(evol1)
    }
    const evol2: IPokemon | undefined = await getPokemonEvolChain(chain.evolves_to[0].species?.name)
    if (evol2) {
      evolutionChain.push(evol2)
    }
    const evol3: IPokemon | undefined = await getPokemonEvolChain(chain.evolves_to[0].evolves_to[0]?.species.name)
    if (evol3) {
      evolutionChain.push(evol3)
    }

    const findEnglish = pokemonSpecie.flavor_text_entries.find((item: IFlavorTextEntry) => item.language.name === "en")
    const description = findEnglish.flavor_text
    return { description, evolutionChain }
  }

  const getPokemonEvolChain = async (name: string) => {
    const evolPokemon = pokemons.value.find((pokemon) => pokemon.name === name)

    if (!evolPokemon && name) {
      const evolInfo = await getPokemon(name)
      if (evolInfo) {
        return { id: evolInfo.id, name: evolInfo.name, url: `${baseUrl}/${evolInfo.id}` }
      }
    } else {
      return evolPokemon;
    }
  }

  const removePokemonTeam = (id: number) => {
    pokemonTeamDetail.value = pokemonTeamDetail.value.filter((pokemon) => pokemon.id !== id)
    pokemonTeam.value = pokemonTeam.value.filter((pokemon) => pokemon.id !== id)
    pokemonTeam.value.push({ name: '??????', id: pokemonTeam.value.length + 1 })
  }

  return {
    pokemons,
    pokemonTeam,
    pokemonTeamDetail,
    total,
    getPokemons,
    selectPokemon,
    getPokemon,
    loadMore,
    getPokemonTeamDetail,
    getPokemonTeam,
    removePokemonTeam,
    getPokemonDetail
  }
})
