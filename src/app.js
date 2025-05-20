import { createApp, reactive } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// Importar componentes de forma sincrónica para evitar problemas de promesas
const WelcomeScreen = {
  name: 'WelcomeScreen',
  template: `
    <div class="pokedex-welcome-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu saludando" class="pikachu-image">
      <h1>Bienvenido a la Pokédex</h1>
      <p>
        La enciclopedia digital creada por el
        Profesor Oak es una herramienta invaluable para
        los Entrenadores en el mundo Pokémon.
      </p>
      <button class="cta-button" @click="$emit('start')">Comenzar</button>
    </div>
  `
};

const LoaderComponent = {
  name: 'LoaderComponent',
  template: `
    <div class="loader-container" :style="{ display: visible ? 'flex' : 'none' }">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Cargando..." class="pokeball-loader">
    </div>
  `,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};

const PokemonListItem = {
  name: 'PokemonListItem',
  template: `
    <li class="pokemon-list-item" @click="showDetails">
      <span class="pokemon-name">{{ formatName(pokemon.name) }}</span>
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
    formatName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    toggleFavorite() {
      this.$emit('toggle-favorite', this.pokemon);
    },
    showDetails() {
      this.$emit('show-details', this.pokemon);
    }
  }
};

const EmptyState = {
  name: 'EmptyState',
  template: `
    <div class="empty-state-container">
      <h2>¡Ups!</h2>
      <p>¡Parece que te has perdido en tu viaje!</p>
      <button class="empty-state-button" @click="$emit('go-home')">Volver al inicio</button>
    </div>
  `
};

const PokemonList = {
  name: 'PokemonList',
  template: `
    <div class="pokedex-list-container">
      <div class="search-bar-container">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input type="text" placeholder="Buscar" v-model="searchQuery">
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
          Todos
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'favorites' }"
          @click="setActiveTab('favorites')"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
          Favoritos
        </button>
      </div>
    </div>
  `,
  components: {
    'pokemon-list-item': PokemonListItem,
    'empty-state': EmptyState
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
};

const PokemonDetail = {
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
            <strong>Nombre</strong>
            <span>{{ formatName(pokemon.name) }}</span>
          </div>
          <div class="info-row">
            <strong>Tipo</strong>
            <span>{{ formatTypes(pokemon.types) }}</span>
          </div>
          <div class="info-row">
            <strong>Altura</strong>
            <span>{{ formatHeight(pokemon.height) }}</span>
          </div>
          <div class="info-row">
            <strong>Peso</strong>
            <span>{{ formatWeight(pokemon.weight) }}</span>
          </div>
          <div class="info-row">
            <strong>Habilidades</strong>
            <span>{{ formatAbilities(pokemon.abilities) }}</span>
          </div>
        </div>
        <div class="modal-actions-area">
          <button class="modal-share-btn" @click="sharePokemon">Compartir con amigos</button>
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
          alert('¡Información del Pokémon copiada al portapapeles!');
        })
        .catch(err => {
          console.error('No se pudo copiar el texto: ', err);
        });
    }
  }
};

// Store para gestionar el estado global
const store = {
  state: reactive({
    pokemonList: [],
    pokemonDetails: {},
    favorites: [],
    isLoading: false,
    currentView: 'welcome', // 'welcome', 'list', 'detail'
    selectedPokemon: null
  }),

  // Cargar favoritos desde localStorage al iniciar
  loadFavorites() {
    const savedFavorites = localStorage.getItem('pokedex-favorites');
    if (savedFavorites) {
      this.state.favorites = JSON.parse(savedFavorites);
    }
  },

  // Guardar favoritos en localStorage
  saveFavorites() {
    localStorage.setItem('pokedex-favorites', JSON.stringify(this.state.favorites));
  },

  // Añadir o quitar un pokemon de favoritos
  toggleFavorite(pokemon) {
    const index = this.state.favorites.findIndex(p => p.name === pokemon.name);
    
    if (index === -1) {
      // Si no está en favoritos, lo añadimos
      this.state.favorites.push(pokemon);
    } else {
      // Si ya está en favoritos, lo quitamos
      this.state.favorites.splice(index, 1);
    }
    
    this.saveFavorites();
  },

  // Verificar si un pokemon está en favoritos
  isFavorite(pokemon) {
    return this.state.favorites.some(p => p.name === pokemon.name);
  },

  // Cargar la lista de pokemon desde la API
  async fetchPokemonList() {
    this.state.isLoading = true;
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const data = await response.json();
      this.state.pokemonList = data.results;
    } catch (error) {
      console.error('Error al obtener la lista de Pokémon:', error);
    } finally {
      this.state.isLoading = false;
    }
  },

  // Cargar los detalles de un pokemon específico
  async fetchPokemonDetails(name) {
    // Si ya tenemos los detalles en caché, no hacemos la petición
    if (this.state.pokemonDetails[name]) {
      this.state.selectedPokemon = this.state.pokemonDetails[name];
      return;
    }

    this.state.isLoading = true;
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      
      // Guardamos en caché
      this.state.pokemonDetails[name] = data;
      this.state.selectedPokemon = data;
    } catch (error) {
      console.error(`Error al obtener detalles de ${name}:`, error);
    } finally {
      this.state.isLoading = false;
    }
  }
};

// Componente principal de la aplicación
const App = {
  template: `
    <welcome-screen 
      v-if="store.state.currentView === 'welcome'"
      @start="startApp"
    />
    
    <loader-component :visible="store.state.isLoading" />
    
    <pokemon-list
      v-if="store.state.currentView === 'list'"
      :pokemon-list="store.state.pokemonList"
      :favorites="store.state.favorites"
      @toggle-favorite="toggleFavorite"
      @show-details="showDetails"
    />
    
    <pokemon-detail
      v-if="store.state.selectedPokemon"
      :pokemon="store.state.selectedPokemon"
      :visible="store.state.currentView === 'detail'"
      :is-favorite="isFavorite(store.state.selectedPokemon)"
      @close="closeDetails"
      @toggle-favorite="toggleFavorite"
    />
  `,
  components: {
    'welcome-screen': WelcomeScreen,
    'loader-component': LoaderComponent,
    'pokemon-list': PokemonList,
    'pokemon-detail': PokemonDetail
  },
  setup() {
    // Cargar favoritos al iniciar
    store.loadFavorites();
    
    return {
      store,
      
      // Iniciar la aplicación
      async startApp() {
        await store.fetchPokemonList();
        store.state.currentView = 'list';
      },
      
      // Mostrar detalles de un pokemon
      async showDetails(pokemon) {
        await store.fetchPokemonDetails(pokemon.name);
        store.state.currentView = 'detail';
      },
      
      // Cerrar la vista de detalles
      closeDetails() {
        store.state.currentView = 'list';
      },
      
      // Añadir o quitar un pokemon de favoritos
      toggleFavorite(pokemon) {
        store.toggleFavorite(pokemon);
      },
      
      // Verificar si un pokemon está en favoritos
      isFavorite(pokemon) {
        return store.isFavorite(pokemon);
      }
    };
  }
};

// Montar la aplicación
createApp(App).mount('#app');
