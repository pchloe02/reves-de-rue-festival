<script setup>
import { computed } from 'vue'
import TypeTag from './TypeTag.vue'
import BoutonFavori from '../favorites/BoutonFavori.vue'
import { getDayMonth, formatTime } from '../../utils/helpers.ts'

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
})

const date = getDayMonth(props.event.date)
const intervenerNames = computed(() => {
  return (props.event.interveners ?? []).map((intervener) => intervener.name).join(', ')
})
</script>

<template>
  <RouterLink :to="{ name: 'event', params: { id: event.id } }" class="petite-carte">
    <div class="image">
      <img v-if="event.image" :src="event.image" alt="" />
      <div class="date">
        <span class="date-jour">{{ date.day }}</span>
        <span class="date-mois">{{ date.month }}</span>
      </div>
    </div>
    <div class="infos">
      <TypeTag :type="event.type" />
      <h3>{{ event.title }}</h3>
      <p v-if="intervenerNames" class="interveners">Intervener(s) : {{ intervenerNames }}</p>
      <p class="ligne">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {{ event.location }}
      </p>
      <p class="ligne">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        {{ formatTime(event.startTime) }}
      </p>
      <div class="favori">
        <BoutonFavori :event-id="event.id" :taille="22" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.petite-carte {
  display: flex;
  flex-direction: column;
  width: 260px;
  flex-shrink: 0;
  background: var(--color-bg-surface);
  border-radius: var(--radius-300);
  overflow: hidden;
  text-decoration: none;
  color: var(--color-text-body);
  box-shadow: 0 4px 4px var(--color-shadow);
}
.petite-carte:hover h3 {
  text-decoration: underline;
}
.image {
  position: relative;
  height: 170px;
  background: var(--violet-dream-400);
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.date {
  position: absolute;
  top: var(--spacing-150);
  left: var(--spacing-150);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--color-tag-info-bg-default);
  color: var(--color-tag-info-text-default);
  border-radius: var(--radius-200);
  padding: var(--spacing-050) var(--spacing-150);
  line-height: 1;
}
.date-jour {
  font-size: var(--font-size-heading-3);
}
.date-mois {
  font-size: 15px;
}
.infos {
  flex: 1;
  padding: var(--spacing-300);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-150);
}
h3 {
  margin: var(--spacing-050) 0;
  font-size: var(--font-size-heading-3);
  line-height: var(--line-height-heading-3);
  color: var(--color-text-h2);
}
.ligne {
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-200);
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}
.favori {
  margin-top: auto;
  align-self: flex-end;
}
</style>
