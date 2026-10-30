import { ref } from 'vue'
import { getEventById } from '../api/events.ts'

export function useEvent(id) {
  const event = ref(null)
  const isLoading = ref(false)
  const error = ref('')

  async function fetchEvent() {
    isLoading.value = true
    error.value = ''

    try {
      event.value = await getEventById(Number(id))
    } catch (caughtError) {
      error.value = "L'événement est momentanément indisponible."
      console.error("Erreur lors du chargement de l'événement :", caughtError)
    } finally {
      isLoading.value = false
    }
  }

  return {
    event,
    isLoading,
    error,
    fetchEvent,
  }
}
