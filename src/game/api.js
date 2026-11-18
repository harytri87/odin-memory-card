const LIST_URL = 'https://pokeapi.co/api/v2/pokemon?limit=100000'
const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

export function spriteUrl(id) {
  return `${SPRITE_BASE}/${id}.png`
}

export function idFromUrl(url) {
  return Number(url.split('/').filter(Boolean).pop())
}

export function normalizePokemon(results) {
  const pokemon = results
    .map(({ name, url }) => {
      const id = idFromUrl(url)
      return {
        id,
        name,
        image: spriteUrl(id),
      }
    })
    .filter((p) => p.id < 10000)

  return pokemon
}

export async function fetchAllPokemon() {
  const res = await fetch(LIST_URL)

  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const data = await res.json()

  return normalizePokemon(data.results)
}

/**
 * Example of LIST_URL api result from PokeApi
 */
// {
//   "count": 1351,
//   "next": null,
//   "previous": null,
//   "results": [
//     {
//       "name": "bulbasaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/1/"
//     },
//     {
//       "name": "ivysaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/2/"
//     },
//     {
//       "name": "venusaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/3/"
//     },
//     // ... and more
//   ]
// }
