<script setup>
defineProps({
  modelValue: {
    type: String,
    default: 'liste',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="choix-vue" role="group" aria-label="Affichage">
    <button
      :class="{ actif: modelValue === 'liste' }"
      :aria-pressed="modelValue === 'liste'"
      title="Liste"
      @click="emit('update:modelValue', 'liste')"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span class="cache">Liste</span>
    </button>
    <button
      :class="{ actif: modelValue === 'jours' }"
      :aria-pressed="modelValue === 'jours'"
      title="Par jour"
      @click="emit('update:modelValue', 'jours')"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
      </svg>
      <span class="cache">Par jour</span>
    </button>
  </div>
</template>

<style scoped>
.choix-vue {
  display: flex;
  background: var(--color-filterview-bg);
  border: var(--border-width-050) solid var(--color-filterview-border);
  border-radius: var(--hors-ds-radius-button);
  overflow: hidden;
}
.choix-vue button {
  background: transparent;
  border: none;
  padding: var(--spacing-200) 18px;
  color: var(--color-filterview-icon);
  cursor: pointer;
}
.choix-vue button + button {
  border-left: var(--border-width-050) solid var(--color-filterview-border);
}
.choix-vue button.actif {
  background: var(--color-filterview-view-active);
}
.cache {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
