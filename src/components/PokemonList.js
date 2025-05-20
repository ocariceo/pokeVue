export default {
  name: 'PokemonList',
  template: `
    <div class="pokedex-list-container">
      <div class="search-bar-container">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input type="text" placeholder="Search" v-model="searchQuery">
      </div>
      
      <ul class="pokemon-list" v-if="filteredPokemon.length > 0">
        <pokemon-list-item 
          v-for="pokemon in filteredPokemon" 
          :key="pokemon.name" 
          :pokemon="pokemon" 
          :is-favorite="isFavorite(pokemon)"
          @toggle-favorite="toggleFavorite"
          @show-details="showDetails"
        />
      </ul>
      
      <empty-state v-else @go-home="resetFilters" />
      
      <div class="tabs-container">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'all' }"
          @click="setActiveTab('all')"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zm0-10h14V7H7v2z"/>
          </svg>
          All
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'favorites' }"
          @click="setActiveTab('favorites')"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          Favorites
        </button>
      </div>
    </div>
  `,
  components: {
    'pokemon-list-item': () => import('./PokemonListItem.js'),
    'empty-state': () => import('./EmptyState.js')
  },
  props: {
    pokemonList: {
      type: Array,
      required: true
    },
    favorites: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      activeTab: 'all'
    };
  },
  computed: {
    filteredPokemon() {
      let result = this.activeTab === 'all' ? this.pokemonList : this.favorites;
      
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(pokemon => 
          pokemon.name.toLowerCase().includes(query)
        );
      }
      
      return result;
    }
  },
  methods: {
    isFavorite(pokemon) {
      return this.favorites.some(fav => fav.name === pokemon.name);
    },
    toggleFavorite(pokemon) {
      this.$emit('toggle-favorite', pokemon);
    },
    showDetails(pokemon) {
      this.$emit('show-details', pokemon);
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    resetFilters() {
      this.searchQuery = '';
      this.activeTab = 'all';
    }
  }
}
