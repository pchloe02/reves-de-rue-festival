import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EventCard from './EventCard.vue'

// ARRANGE: préparer ma donnée de test
const evenement = {
  id: 1,
  titre: 'Fresque en direct',
  type: 'fresque live',
  date: '2026-09-22',
  heureDebut: '14:00',
  duree: 90,
  lieu: 'Place du marché',
  image: 'https://picsum.photos/seed/test/900/600',
  description: 'Une fresque peinte en direct devant le public.',
  artistes: [],
  phare: false,
}

describe('EventCard', () => {
  it("affiche les infos de l'événement", () => {
    // ACT: monter le composant avec la donnée de test
    const wrapper = mount(EventCard, {
      props: {
        evenement,
      },
    })

    // ASSERT: vérifier que le rendu correspond à ce que j'attends
    expect(wrapper.text()).toContain(evenement.titre)
    expect(wrapper.text()).toContain(evenement.lieu)
    expect(wrapper.text()).toContain(evenement.description)
    expect(wrapper.text()).toContain(evenement.type)
  })

  it("affiche l'heure formatée", () => {
    // ACT: monter le composant avec la donnée de test
    const wrapper = mount(EventCard, {
      props: {
        evenement,
      },
    })

    // ASSERT: "14:00" doit s'afficher "14h"
    expect(wrapper.text()).toContain('14h')
    expect(wrapper.text()).not.toContain('14:00')
  })
})
