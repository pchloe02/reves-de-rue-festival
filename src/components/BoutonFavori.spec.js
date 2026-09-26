import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BoutonFavori from './BoutonFavori.vue'

describe('BoutonFavori', () => {
  it("n'est pas activé par défaut", () => {
    // ACT: monter le composant
    const wrapper = mount(BoutonFavori)

    // ASSERT: l'étoile n'est pas encore cochée
    expect(wrapper.attributes('aria-pressed')).toBe('false')
  })

  it('s\'active au clic', async () => {
    // ARRANGE: monter le composant
    const wrapper = mount(BoutonFavori)

    // ACT: cliquer sur l'étoile
    await wrapper.trigger('click')

    // ASSERT: l'étoile est maintenant cochée
    expect(wrapper.attributes('aria-pressed')).toBe('true')
  })
})
