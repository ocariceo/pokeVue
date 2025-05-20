export default {
  name: 'WelcomeScreen',
  template: `
    <div class="pokedex-welcome-container">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu waving" class="pikachu-image">
      <h1>Welcome to Pokédex</h1>
      <p>
        The digital encyclopedia created by
        Professor Oak is an invaluable tool to
        Trainers in the Pokémon world.
      </p>
      <button class="cta-button" @click="$emit('start')">Get started</button>
    </div>
  `
}
