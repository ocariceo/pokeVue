export default {
  name: 'PokemonListItem',
  template: `
    <li class="pokemon-list-item" @click="showDetails">
      <span class="pokemon-name">{{ pokemon.name }}</span>
      <span class="favorite-star" :class="{ 'is-favorite': isFavorite }" @click.stop="toggleFavorite">
        <svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      </span>
    </li>
  `,
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.pokemon);
    },
    showDetails() {
      this.$emit('show-details', this.pokemon);
    }
  }
}
