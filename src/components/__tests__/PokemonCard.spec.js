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

    // Verifica que el nombre se renderiza correctamente
    expect(wrapper.find('h2').text()).toBe('Pikachu')

    // Verifica que la imagen tiene el src y alt correctos
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('https://example.com/pikachu.png')
    expect(img.attributes('alt')).toBe('Pikachu')
  })
})
