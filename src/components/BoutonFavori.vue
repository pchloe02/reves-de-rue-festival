<script setup>
import { ref } from 'vue'

defineProps({
  taille: {
    type: Number,
    default: 26,
  },
  clair: {
    type: Boolean,
    default: false,
  },
})

const favori = ref(false)

function clic() {
  favori.value = !favori.value
}
</script>

<template>
  <button
    class="etoile"
    :class="{ 'etoile-claire': clair, 'etoile-active': favori }"
    :aria-label="favori ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    :aria-pressed="favori"
    @click="clic"
  >
    <svg :width="taille" :height="taille" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  </button>
</template>

<style scoped>
.etoile {
  background: none;
  border: none;
  padding: var(--spacing-100);
  cursor: pointer;
  color: var(--color-btn-star-default);
  fill: none;
  line-height: 0;
}
.etoile:hover {
  color: var(--color-btn-star-hover);
}
.etoile-claire {
  color: var(--color-text-display);
}
.etoile-active svg {
  fill: var(--color-btn-star-default);
  stroke: var(--color-btn-star-default);
}
</style>
