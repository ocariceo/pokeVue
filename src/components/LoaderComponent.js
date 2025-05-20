export default {
  name: 'LoaderComponent',
  template: `
    <div class="loader-container" :style="{ display: visible ? 'flex' : 'none' }">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Loading..." class="pokeball-loader">
    </div>
  `,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
