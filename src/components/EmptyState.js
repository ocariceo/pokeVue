export default {
  name: 'EmptyState',
  template: `
    <div class="empty-state-container">
      <h2>Uh-oh!</h2>
      <p>You look lost on your journey!</p>
      <button class="empty-state-button" @click="$emit('go-home')">Go back home</button>
    </div>
  `
}
