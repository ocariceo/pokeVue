<template>
  <div class="pokemon-card">
    <h2>{{ pokemon.name }}</h2>
    <img :src="pokemon.image" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
}
</script>
