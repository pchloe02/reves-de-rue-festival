import { computed, ref } from 'vue'

export function useEventFilters(events, getArtistsForEvent) {
  const filters = ref({
    date: '',
    search: '',
  })

  const sortedEvents = computed(() => {
    return [...events.value].sort((a, b) => {
      const dateA = a.date + ' ' + a.heureDebut
      const dateB = b.date + ' ' + b.heureDebut
      return dateA.localeCompare(dateB)
    })
  })

  const dates = computed(() => {
    const availableDates = []
    for (let i = 0; i < sortedEvents.value.length; i++) {
      const date = sortedEvents.value[i].date
      if (!availableDates.includes(date)) {
        availableDates.push(date)
      }
    }
    return availableDates
  })

  const filteredEvents = computed(() => {
    let result = sortedEvents.value

    if (filters.value.date !== '') {
      result = result.filter((event) => event.date === filters.value.date)
    }
    if (filters.value.search !== '') {
      const searchTerm = filters.value.search.toLowerCase()
      result = result.filter((event) => {
        const artistNames = getArtistsForEvent(event).map((artist) => artist.nom).join(' ')
        const text = (
          event.titre +
          ' ' +
          event.type +
          ' ' +
          event.lieu +
          ' ' +
          artistNames
        ).toLowerCase()
        return text.includes(searchTerm)
      })
    }
    return result
  })

  const eventsByDay = computed(() => {
    const groups = []
    for (let i = 0; i < filteredEvents.value.length; i++) {
      const event = filteredEvents.value[i]
      let group = groups.find((element) => element.date === event.date)
      if (!group) {
        group = { date: event.date, events: [] }
        groups.push(group)
      }
      group.events.push(event)
    }
    return groups
  })

  function updateFilter(name, value) {
    filters.value[name] = value
  }

  return {
    filters,
    dates,
    sortedEvents,
    filteredEvents,
    eventsByDay,
    updateFilter,
  }
}
