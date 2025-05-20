# pokeVue
Ejercicio de aplicación de Vue.js 

# Documentación de la PokeVue.js

## Descripción
Esta aplicación es una Pokédex interactiva desarrollada con Vue.js que permite a los usuarios explorar una lista de Pokémon, ver sus detalles, marcarlos como favoritos y compartir su información. La aplicación consume datos de la PokeAPI y mantiene una lista de favoritos persistente en el almacenamiento local del navegador.
Este desarrollo se realizó en el marco de un ejercicio para Global66.

## Características
- Contiene una pantalla de bienvenida con introducción a la Pokédex.
- Despliega una lista de Pokémon con búsqueda.
- Permite filtrar la totalidad de los Pokémon o solamente filtrar los favoritos.
- Entrega el detalle de las características de cada Pokémon.
- El usuario puede seleccionar los Pokémon como favoritos.
- El sistema permite la persistencia de favoritos en localStorage
- La aplicación permite compartir la información de los Pokémon favoritos por medio de copiar los datos al portapapeles
- Diseño responsivo para diferentes tamaños de pantalla

## Tecnologías utilizadas
- Vue.js 3 (Composition API)
- HTML5 y CSS3
- PokeAPI (https://pokeapi.co)
- LocalStorage para persistencia de datos

## Estructura de archivos
```
pokeVue/
├── src/
│   ├── index.html          # Archivo HTML principal
│   ├── styles.css          # Estilos CSS de la aplicación
│   ├── app.js              # Lógica principal y componentes Vue
│   └── components/         # Componentes Vue (incluidos en app.js)
```

## Cómo ejecutar la aplicación
1. Clona o descarga los archivos del proyecto
2. Abre el archivo `index.html` en un navegador web moderno
   - Alternativamente, puedes usar un servidor web local como:
     - Python: `python -m http.server 8000`
     - Node.js: `npx serve`
3. Accede a la aplicación a través de la URL proporcionada por el servidor

## URL de acceso público
La aplicación está disponible temporalmente en:
https://8000-ioq6v5nxqavr51np3wzwg-875cb9c7.manus.computer/src/

## Uso de la aplicación
1. En la pantalla de bienvenida, haz clic en "Get started" para comenzar
2. Explora la lista de Pokémon o utiliza la barra de búsqueda para encontrar uno específico
3. Haz clic en la estrella para marcar/desmarcar un Pokémon como favorito
4. Haz clic en el nombre de un Pokémon para ver sus detalles
5. En la vista de detalles:
   - Puedes marcar/desmarcar como favorito
   - Puedes compartir la información haciendo clic en "Share with my friends"
6. Utiliza las pestañas "All" y "Favorites" para filtrar la lista

## Arquitectura y diseño
La aplicación sigue el principio KISS (Keep It Simple, Stupid) con una arquitectura modular y ligera:
- Componentes Vue para cada parte de la interfaz
- Store reactivo para gestionar el estado global
- Integración directa con la PokeAPI
- Persistencia simple mediante localStorage

## Notas adicionales
- La lista de favoritos se guarda automáticamente en el navegador
- La función de compartir copia los datos al portapapeles
- Los colores de fondo en la vista de detalles cambian según el tipo del Pokémon

