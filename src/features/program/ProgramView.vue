<script setup>
import { ref } from "vue";
import EventCard from "../../components/events/EventCard.vue";
import EventFilters from "../../components/events/EventFilters.vue";
import ViewSelector from "./ViewSelector.vue";
import { useEvents } from "../../composables/useEvents.ts";
import { useEventFilters } from "../../composables/useEventFilters.ts";
import { formatLongDate } from "../../utils/helpers.ts";

const viewMode = ref("liste");
const { events, isLoading, error, fetchEvents } = useEvents();
const { filters, dates, filteredEvents, eventsByDay, updateFilter } =
  useEventFilters(events, (event) => event.interveners);

fetchEvents();
</script>

<template>
  <main class="page">
    <section class="entete">
      <h1>Programme</h1>
      <p>Retrouvez tous les événements du festival, jour par jour.</p>
    </section>

    <EventFilters
      :filters="filters"
      :dates="dates"
      @update="updateFilter"
    />

    <p v-if="error" class="erreur">{{ error }}</p>
    <p v-else-if="isLoading" class="erreur">Chargement des événements…</p>

    <div class="barre">
      <ViewSelector v-model="viewMode" />
    </div>

    <div v-if="viewMode === 'liste'" class="liste">
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
      />
    </div>

    <div v-else>
      <section
        v-for="group in eventsByDay"
        :key="group.date"
        class="jour"
      >
        <h2 class="pastille-jour">{{ formatLongDate(group.date) }}</h2>
        <div class="frise">
          <div
            v-for="event in group.events"
            :key="event.id"
            class="frise-element"
          >
            <span class="rond"></span>
            <EventCard :event="event" />
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
