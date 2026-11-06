import { ref } from 'vue'
import { getEventById } from '../api/events.ts'
import type { FestivalEvent } from '../types'

export function useEvent(id: string) {
  const event = ref<FestivalEvent | null>(null)
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
