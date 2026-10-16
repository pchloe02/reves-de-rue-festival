import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import artistsJson from '../data/artistes.json'
import festivalJson from '../data/festival.json'
import { useEvents } from '../composables/useEvenements.js'
import { useEventFilters } from '../composables/useEvenementsFiltres.js'

export const useEventsStore = defineStore('events', () => {
  const festival = ref(festivalJson)
  const artists = ref(artistsJson)

  const viewMode = ref('liste')

  const { events, isLoading, error, fetchEvents } = useEvents()

  function getArtistsForEvent(event) {
    return artists.value.filter((artist) => event.artistes.includes(artist.id))
  }

  const {
    filters,
    dates,
    sortedEvents,
    filteredEvents,
    eventsByDay,
    updateFilter,
  } = useEventFilters(events, getArtistsForEvent)

  const featuredEvents = computed(() => {
    return sortedEvents.value.filter((event) => event.phare === true)
  })

  function findEvent(id) {
    return events.value.find((event) => event.id === Number(id))
  }

  function getSuggestions(event) {
    const others = sortedEvents.value.filter((item) => item.id !== event.id)
    const sameType = others.filter((item) => item.type === event.type)
    const differentType = others.filter((item) => item.type !== event.type)
    return sameType.concat(differentType).slice(0, 5)
  }

  return {
    festival,
    isLoading,
    error,
    fetchEvents,
    events,
    filters,
    viewMode,
    featuredEvents,
    dates,
    filteredEvents,
    eventsByDay,
    updateFilter,
    findEvent,
    getArtistsForEvent,
    getSuggestions,
  }
})
