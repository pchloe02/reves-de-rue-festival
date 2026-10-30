import { ref } from 'vue'

import { getAllEvents } from '../api/events.ts'

export function useEvents() {
  const events = ref([])
  const isLoading = ref(false)
  const error = ref('')

  async function fetchEvents() {
    isLoading.value = true
    error.value = ''

    try {
      events.value = await getAllEvents()
      console.log('[Events composable] events loaded:', events.value)
    } catch (caughtError) {
      error.value = 'Les événements sont momentanément indisponibles.'
      console.error('Error while fetching events:', caughtError)
    } finally {
      isLoading.value = false
    }
  }

  return {
    events,
    isLoading,
    error,
    fetchEvents,
  }
}
