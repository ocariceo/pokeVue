# pokemon-app-vue
Ejercicio de aplicación de Vue.js 

# Documentación de la pokemon-app-vue.js

## Descripción
Esta aplicación es una Pokédex interactiva desarrollada con Vue.js que permite a los usuarios explorar una lista de Pokémon, ver sus detalles, marcarlos como favoritos y compartir su información. La aplicación consume datos de la PokeAPI y mantiene una lista de favoritos persistente en el almacenamiento local del navegador.
Este desarrollo se realizó en el marco de un ejercicio para Global66.

## Características
- Contiene una pantalla de bienvenida con introducción a la Pokédex.
- Despliega una lista de Pokémon con búsqueda.
- Permite filtrar la totalidad de los Pokémon o solamente filtrar los favoritos.
- Entrega el detalle de las características de cada Pokémon.
- El usuario puede seleccionar los Pokémon como favoritos.
- El sistema permite la persistencia de favoritos en localStorage.
- La aplicación permite compartir la información de los Pokémon favoritos por medio de copiar los datos al portapapeles.
- El diseño es responsivo para adaptarse a diferentes tamaños de pantalla y dispositivos.

## Tecnologías utilizadas
- Vue.js 3 (Composition API)
- HTML5 y CSS3
- PokeAPI (https://pokeapi.co)
- LocalStorage para persistencia de datos
- Vitest(https://vitest.dev/) para testing

## Estructura de archivos
```
pokemon-app-vue/
├── src/
│   ├── index.html          # Archivo HTML principal
│   ├── styles.css          # Estilos CSS de la aplicación
│   ├── app.js              # Lógica principal y componentes Vue
│   └── components/         # Componentes Vue (incluidos en app.js)
```

## Cómo ejecutar la aplicación
1. Clonar o descargar los archivos del proyecto.
   - Es posible usar un servidor web local usando los siguientes comandos:
     - Python: `python -m http.server 8000`
     - Node.js: `npx serve`
3. Acceder a la aplicación a través de la URL que proporciona el servidor.


## Uso de la aplicación
1. En la pantalla de bienvenida, haz clic en "Comenzar".
2. Explora la lista de Pokémones o utiliza la barra de búsqueda para encontrar un Pokémon en específico.
3. Haz click en la estrella para seleccionar un Pokémon como favorito.
4. Haz click en el nombre de un Pokémon para ver sus detalles.
5. En la vista de detalles:
   - Puedes seleccionar al un Pokémon como favorito.
   - Puedes compartir la información haciendo clic en "Compartir con amigos"
6. Utiliza las pestañas "Todos" y "Favoritos" para filtrar la lista.

## Arquitectura y diseño
La aplicación tiene una arquitectura modular y ligera:
- Componentes Vue para cada parte de la interfaz.
- Store reactivo para gestionar el estado global.
- Integración directa con la PokeAPI.
- Persistencia simple mediante localStorage

## Notas adicionales
- La lista de favoritos se guarda automáticamente en el navegador.
- La función de compartir copia los datos al portapapeles.
- Los colores de fondo en la vista de detalles cambian según el tipo del Pokémon

## Test Unitarios

Este proyecto incluye pruebas unitarias usando `Vitest` y `@vue/test-utils`.

## Ejemplo: `PokemonCard.vue`

El componente `PokemonCard` recibe un objeto `pokemon` como prop y muestra su nombre e imagen.

## Test: `PokemonCard.spec.js`

```js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PokemonCard from '../PokemonCard.vue'

describe('PokemonCard.vue', () => {
  it('renders the Pokémon name and image correctly', () => {
    const pokemon = {
      name: 'Pikachu',
      image: 'https://example.com/pikachu.png',
    }

    const wrapper = mount(PokemonCard, {
      props: { pokemon },
    })

    expect(wrapper.find('h2').text()).toBe('Pikachu')
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/pikachu.png')
    expect(img.attributes('alt')).toBe('Pikachu')
  })
})
```
## Instalación de dependencias para testing

npm install -D vitest @vue/test-utils

## Archivo de configuración vitest.config.js
```
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
```

## Ejecutar pruebas

npm run test
