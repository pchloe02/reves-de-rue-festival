<script setup>
defineProps({
  type: String,
})
</script>

<template>
  <span
    class="tag"
    :class="{
      'tag-fresque': type === 'fresque live',
      'tag-performance': type === 'performance',
      'tag-atelier': type === 'atelier participatif',
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
