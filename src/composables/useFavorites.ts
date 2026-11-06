import { ref } from 'vue'
import {
  addFavorite,
  getFavoriteEventIds,
  removeFavorite,
} from '../api/favorites.ts'
import { useToast } from './useToast'

const favorites = ref(new Set())
const error = ref('')
const isLoading = ref(false)

let initialization

async function loadFavorites() {
  favorites.value = new Set(await getFavoriteEventIds())
}

function initialize() {
  if (!initialization) {
    initialization = loadFavorites().catch((caughtError) => {
      error.value = 'Les favoris sont momentanément indisponibles.'
      console.error('Erreur lors du chargement des favoris :', caughtError)
    })
  }

  return initialization
}

export function useFavorites() {
  initialize()
  const { showSuccess, showError } = useToast()

  function isFavorite(eventId) {
    return favorites.value.has(Number(eventId))
  }

  async function toggleFavorite(eventId) {
    const id = Number(eventId)
    if (!Number.isInteger(id) || isLoading.value) {
      return
    }

    error.value = ''
    isLoading.value = true
    const wasFavorite = favorites.value.has(id)
    const updatedFavorites = new Set(favorites.value)

    if (wasFavorite) {
      updatedFavorites.delete(id)
    } else {
      updatedFavorites.add(id)
    }
    favorites.value = updatedFavorites

    try {
      if (wasFavorite) {
        await removeFavorite(id)
        showSuccess('Événement retiré des favoris.')
      } else {
        await addFavorite(id)
        showSuccess('Événement ajouté aux favoris.')
      }
    } catch (caughtError) {
      const restoredFavorites = new Set(favorites.value)
      if (wasFavorite) {
        restoredFavorites.add(id)
      } else {
        restoredFavorites.delete(id)
      }
      favorites.value = restoredFavorites
      error.value = 'Impossible de modifier ce favori.'
      showError(error.value)
      console.error('Erreur lors de la modification du favori :', caughtError)
    } finally {
      isLoading.value = false
    }
  }

  return {
    favorites,
    error,
    isLoading,
    initialize,
    isFavorite,
    toggleFavorite,
  }
}
