import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EventCard from './EventCard.vue'

// ARRANGE: préparer ma donnée de test
const event = {
  id: 1,
  title: 'Fresque en direct',
  type: 'fresque live',
  date: '2026-09-22',
  startTime: '14:00',
  duration: 90,
  location: 'Place du marché',
  image: 'https://picsum.photos/seed/test/900/600',
  description: 'Une fresque peinte en direct devant le public.',
  interveners: [],
  featured: false,
}

describe('EventCard', () => {
  it("affiche les infos de l'événement", () => {
    // ACT: monter le composant avec la donnée de test
    const wrapper = mount(EventCard, {
      props: {
        event,
      },
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    // ASSERT: vérifier que le rendu correspond à ce que j'attends
    expect(wrapper.text()).toContain(event.title)
    expect(wrapper.text()).toContain(event.location)
    expect(wrapper.text()).toContain(event.description)
    expect(wrapper.text()).toContain(event.type)
  })

  it("affiche l'heure formatée", () => {
    // ACT: monter le composant avec la donnée de test
    const wrapper = mount(EventCard, {
      props: {
        event,
      },
      global: {
        stubs: { RouterLink: { template: '<a><slot /></a>' } },
      },
    })

    // ASSERT: "14:00" doit s'afficher "14h"
    expect(wrapper.text()).toContain('14h')
    expect(wrapper.text()).not.toContain('14:00')
  })
})
