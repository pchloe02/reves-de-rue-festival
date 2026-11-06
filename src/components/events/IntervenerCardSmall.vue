<script setup>
import { computed } from 'vue'
import { INTERVENER_ROLE_LABELS } from '../../constants/interveners'

const props = defineProps({
  intervener: {
    type: Object,
    required: true,
  },
})

const roleLabel = computed(() => {
  return INTERVENER_ROLE_LABELS[props.intervener.role] ?? INTERVENER_ROLE_LABELS.other
})
</script>

<template>
  <article class="petite-carte">
    <div class="image" aria-hidden="true">
      <span>{{ intervener.name.charAt(0) }}</span>
    </div>
    <div class="infos">
      <p class="role">{{ roleLabel }}</p>
      <h3>{{ intervener.name }}</h3>
      <p v-if="intervener.discipline" class="discipline">
        {{ intervener.discipline }}
      </p>
      <p v-if="intervener.description" class="description">
        {{ intervener.description }}
      </p>
    </div>
  </article>
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
  color: var(--color-text-body);
  box-shadow: 0 4px 4px var(--color-shadow);
}

.image {
  height: 170px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--violet-dream-400);
  color: var(--color-text-display);
  font-size: 72px;
  font-weight: var(--font-weight-bold);
}

.infos {
  padding: var(--spacing-300);
}

.role,
.discipline,
.description {
  margin: 0;
}

.role {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
}

h3 {
  margin: var(--spacing-150) 0;
  color: var(--color-text-h2);
  font-size: var(--font-size-heading-3);
  line-height: var(--line-height-heading-3);
}

.discipline {
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-bold);
}

.description {
  display: -webkit-box;
  margin-top: var(--spacing-200);
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  font-size: var(--font-size-small);
  line-height: 1.4;
}
</style>
