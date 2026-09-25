<script setup>
import { formaterDateBouton } from '../helpers.js'

const props = defineProps({
  filtres: {
    type: Object,
    required: true,
  },
  dates: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['changer'])

function clicDate(date) {
  if (props.filtres.date === date) {
    emit('changer', 'date', '')
  } else {
    emit('changer', 'date', date)
  }
}

function tapeRecherche(event) {
  emit('changer', 'recherche', event.target.value)
}
</script>

<template>
  <div class="filtres">
    <div class="dates">
      <button
        v-for="d in dates"
        :key="d"
        class="bouton bouton-secondaire"
        :class="{ actif: filtres.date === d }"
        :aria-pressed="filtres.date === d"
        @click="clicDate(d)"
      >
        {{ formaterDateBouton(d) }}
      </button>
    </div>

    <label class="recherche">
      <span class="cache">Rechercher un événement</span>
      <input type="search" placeholder="Search..." :value="filtres.recherche" @input="tapeRecherche" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    </label>
  </div>
</template>

<style scoped>
.filtres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-400);
  align-items: center;
  justify-content: space-between;
}
.dates {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-400);
}

.recherche {
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  border: var(--border-width-050) solid var(--color-searchbar-border);
  border-radius: var(--hors-ds-radius-button);
  padding: 10px 20px;
  background: var(--color-searchbar-bg);
  color: var(--color-searchbar-icon);
  flex: 1 1 260px;
  max-width: 400px;
}
.recherche input {
  border: none;
  background: transparent;
  font-family: var(--hors-ds-font-family-button);
  font-size: var(--font-size-large);
  color: var(--color-text-body);
  flex: 1;
  min-width: 0;
}
.recherche input::placeholder {
  color: var(--color-searchbar-text);
  text-transform: uppercase;
}
.recherche input:focus {
  outline: none;
}
.recherche:focus-within {
  outline: var(--border-width-125) solid var(--pinky-400);
  outline-offset: var(--spacing-050);
}

@media (max-width: 640px) {
  .dates {
    gap: var(--spacing-200);
  }
  .dates .bouton {
    font-size: var(--font-size-small);
    padding: var(--spacing-200) 14px;
  }
}

.cache {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
