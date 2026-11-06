<script setup>
import {
  ATELIER_EVENT_TYPES,
  FRESQUE_EVENT_TYPES,
  PERFORMANCE_EVENT_TYPES,
} from "../../constants/event-types";

defineProps({
  type: String,
})
</script>

<template>
  <span
    v-if="type"
    class="tag"
    :class="{
      'tag-fresque': FRESQUE_EVENT_TYPES.includes(type),
      'tag-performance': PERFORMANCE_EVENT_TYPES.includes(type),
      'tag-atelier': ATELIER_EVENT_TYPES.includes(type),
    }"
  >
    {{ type }}
  </span>
</template>

<style scoped>
.tag {
  display: inline-block;
  padding: var(--spacing-050) 10px;
  border-radius: var(--radius-500);
  font-size: var(--font-size-small);
  line-height: var(--line-height-medium);
  font-weight: 500;
  border: var(--border-width-050) solid transparent;
}
.tag::first-letter {
  text-transform: uppercase;
}
.tag-fresque {
  background: var(--color-tag-type-a-bg);
  border-color: var(--color-tag-type-a-border);
  color: var(--color-tag-type-a-text);
}
.tag-atelier {
  background: var(--color-tag-type-b-bg);
  border-color: var(--color-tag-type-b-border);
  color: var(--color-tag-type-b-text);
}
.tag-performance {
  background: var(--color-tag-type-c-bg);
  border-color: var(--color-tag-type-c-border);
  color: var(--color-tag-type-c-text);
}
</style>
