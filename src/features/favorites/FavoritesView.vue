<script setup>
import { computed, onMounted } from 'vue'
import EventCard from '../../components/events/EventCard.vue'
import { useEvents } from '../../composables/useEvents.ts'
import { useFavorites } from '../../composables/useFavorites.ts'

const { events, isLoading, error: eventsError, fetchEvents } = useEvents()
const {
  favorites,
  error: favoritesError,
  initialize: initializeFavorites,
} = useFavorites()

const eventsFavoris = computed(() =>
  events.value.filter((event) => favorites.value.has(event.id)),
)

onMounted(async () => {
  await Promise.all([fetchEvents(), initializeFavorites()])
})
</script>

<template>
  <main class="page favoris-page">
    <section class="entete">
      <h1>Mes favoris</h1>
      <p>Retrouvez les événements que vous avez ajoutés à vos favoris.</p>
    </section>

    <p v-if="eventsError || favorisError" class="erreur">
      {{ eventsError || favorisError }}
    </p>
    <p v-else-if="isLoading" class="erreur">Chargement de vos favoris…</p>
    <p v-else-if="eventsFavoris.length === 0" class="vide">
      Vous n’avez pas encore ajouté de favori.
    </p>

    <div v-else class="liste">
      <EventCard
        v-for="event in eventsFavoris"
        :key="event.id"
        :event="event"
      />
    </div>
  </main>
</template>

<style scoped>
.entete {
  padding: var(--spacing-1000) 0 var(--spacing-800);
}

h1 {
  margin: 0 0 var(--spacing-200);
  font-size: var(--font-size-heading-1);
  line-height: var(--line-height-heading-1);
}

.entete p {
  margin: 0;
  font-size: var(--font-size-large);
}

.erreur,
.vide {
  color: var(--color-text-secondary);
}

.liste {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
