<script setup>
import { onMounted, watch } from 'vue'
import EventCard from '../../components/EventCard.vue'
import EventFilters from './EventFilters.vue'
import ChoixVue from './ChoixVue.vue'
import { useEventsStore } from '../../stores/evenements.js'
import { formaterDateLongue } from '../../helpers.js'

const store = useEventsStore()

onMounted(() => {
  console.log('[Programming] filtered events:', store.filteredEvents)
})

watch(
  () => store.filteredEvents,
  (events) => {
    console.log('[Programming] filtered events:', events)
  },
  { deep: true },
)
</script>

<template>
  <main class="page">
    <section class="entete">
      <h1>Programme</h1>
      <p>Retrouvez tous les événements du festival, jour par jour.</p>
    </section>

    <EventFilters :filters="store.filters" :dates="store.dates" @update="store.updateFilter" />

    <p v-if="store.error" class="erreur">{{ store.error }}</p>
    <p v-else-if="store.isLoading" class="erreur">Chargement des événements…</p>

    <div class="barre">
      <ChoixVue v-model="store.viewMode" />
    </div>

    <div v-if="store.viewMode === 'liste'" class="liste">
      <EventCard v-for="event in store.filteredEvents" :key="event.id" :evenement="event" />
    </div>

    <div v-else>
      <section v-for="group in store.eventsByDay" :key="group.date" class="jour">
        <h2 class="pastille-jour">{{ formaterDateLongue(group.date) }}</h2>
        <div class="frise">
          <div v-for="event in group.events" :key="event.id" class="frise-element">
            <span class="rond"></span>
            <EventCard :evenement="event" />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.entete {
  padding: var(--spacing-1000) 0 var(--spacing-800);
}
h1 {
  font-size: var(--font-size-heading-1);
  line-height: var(--line-height-heading-1);
  font-weight: var(--font-weight-bold);
  margin: 0 0 10px;
}
.entete p {
  font-size: var(--font-size-large);
  line-height: var(--line-height-large);
  margin: 0;
}

.barre {
  display: flex;
  justify-content: flex-end;
  margin: var(--spacing-1000) 0 var(--spacing-600);
}

.erreur {
  color: var(--color-text-secondary);
}

.liste {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.jour {
  margin-bottom: var(--spacing-1000);
}
.pastille-jour {
  display: inline-block;
  background: var(--color-tag-info-bg-default);
  color: var(--color-text-display);
  font-family: var(--hors-ds-font-family-button);
  font-weight: var(--font-weight-regular);
  font-size: var(--font-size-large);
  text-transform: uppercase;
  padding: var(--spacing-300) 28px;
  border-radius: 30px 30px 30px 0;
  margin: 0;
}
.frise {
  border-left: 3px solid var(--violet-dream-700);
  margin-left: var(--spacing-300);
  padding: var(--spacing-400) 0 var(--spacing-200) var(--spacing-800);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
}
.frise-element {
  position: relative;
}
.rond {
  position: absolute;
  left: -42px;
  top: 50%;
  width: var(--spacing-400);
  height: var(--spacing-400);
  border-radius: 50%;
  background: var(--violet-dream-700);
}
</style>
