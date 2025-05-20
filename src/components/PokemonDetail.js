export default {
  name: 'PokemonDetail',
  template: `
    <div class="modal-overlay" v-if="visible">
      <div class="modal-container">
        <div class="modal-image-area" :style="{ backgroundColor: getTypeColor(pokemon.types) }">
          <img :src="pokemon.sprites?.other['official-artwork'].front_default" :alt="pokemon.name">
          <button class="modal-close-icon" @click="$emit('close')">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 1L1 13M1 1L13 13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="modal-info-area">
          <div class="info-row">
            <strong>Name</strong>
            <span>{{ formatName(pokemon.name) }}</span>
          </div>
          <div class="info-row">
            <strong>Type</strong>
            <span>{{ formatTypes(pokemon.types) }}</span>
          </div>
          <div class="info-row">
            <strong>Height</strong>
            <span>{{ formatHeight(pokemon.height) }}</span>
          </div>
          <div class="info-row">
            <strong>Weight</strong>
            <span>{{ formatWeight(pokemon.weight) }}</span>
          </div>
          <div class="info-row">
            <strong>Abilities</strong>
            <span>{{ formatAbilities(pokemon.abilities) }}</span>
          </div>
        </div>
        <div class="modal-actions-area">
          <button class="modal-share-btn" @click="sharePokemon">Share with my friends</button>
          <div 
            class="modal-favorite-icon-container" 
            :class="{ 'is-favorite': isFavorite }" 
            @click="$emit('toggle-favorite', pokemon)"
          >
            <svg class="modal-favorite-icon" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    formatTypes(types) {
      if (!types) return '';
      return types.map(type => this.formatName(type.type.name)).join(', ');
    },
    formatHeight(height) {
      if (!height) return '';
      return (height / 10) + ' m';
    },
    formatWeight(weight) {
      if (!weight) return '';
      return (weight / 10) + ' kg';
    },
    formatAbilities(abilities) {
      if (!abilities) return '';
      return abilities
        .map(ability => this.formatName(ability.ability.name.replace('-', ' ')))
        .join(', ');
    },
    getTypeColor(types) {
      if (!types || types.length === 0) return '#73C5EA'; // Default blue
      
      const typeColors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
      };
      
      const mainType = types[0].type.name;
      return typeColors[mainType] || '#73C5EA';
    },
    sharePokemon() {
      const attributes = [
        this.formatName(this.pokemon.name),
        this.formatTypes(this.pokemon.types),
        this.formatHeight(this.pokemon.height),
        this.formatWeight(this.pokemon.weight),
        this.formatAbilities(this.pokemon.abilities)
      ].join(', ');
      
      navigator.clipboard.writeText(attributes)
        .then(() => {
          alert('Pokemon info copied to clipboard!');
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
    }
  }
}
