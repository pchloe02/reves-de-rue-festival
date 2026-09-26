<script setup>
import TypeTag from './TypeTag.vue'
import BoutonFavori from './BoutonFavori.vue'
import { jourEtMois, formaterHeure } from '../helpers.js'

const props = defineProps({
  evenement: {
    type: Object,
    required: true,
  },
})

const date = jourEtMois(props.evenement.date)
</script>

<template>
  <RouterLink :to="{ name: 'evenement', params: { id: evenement.id } }" class="carte">
    <div class="image">
      <img :src="evenement.image" alt="" />
      <div class="date">
        <span class="date-jour">{{ date.jour }}</span>
        <span class="date-mois">{{ date.mois }}</span>
      </div>
    </div>

    <div class="infos">
      <TypeTag :type="evenement.type" />
      <h3>{{ evenement.titre }}</h3>
      <p class="description">{{ evenement.description }}</p>

      <p class="ligne">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {{ evenement.lieu }}
      </p>
      <p class="ligne">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
        {{ formaterHeure(evenement.heureDebut) }}
      </p>
    </div>

    <div class="actions">
      <svg class="chevron" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
      <BoutonFavori />
    </div>
  </RouterLink>
</template>

<style scoped>
.carte {
  display: flex;
  background: var(--color-bg-surface);
  border-radius: var(--radius-300);
  box-shadow: 0 4px 4px var(--color-shadow);
  overflow: hidden;
  text-decoration: none;
  color: var(--color-text-body);
  min-height: 200px;
}
.carte:hover h3 {
  text-decoration: underline;
}

.image {
  position: relative;
  width: 220px;
  flex-shrink: 0;
  background: var(--violet-dream-400);
}
.image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-weight: 500;
}
.date-jour {
  font-size: 28px;
}
.date-mois {
  font-size: var(--font-size-large);
}

.infos {
  flex: 1;
  padding: var(--spacing-400);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--spacing-200);
}
h3 {
  margin: 0;
  font-size: var(--font-size-heading-2);
  line-height: var(--line-height-heading-2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-h2);
}
.description {
  margin: 0;
  font-size: var(--font-size-small);
  line-height: 1.4;
  max-width: 70ch;
}
.ligne {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-small);
  color: var(--color-text-secondary);
}

.actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-400);
}
.chevron {
  margin-top: auto;
  margin-bottom: auto;
  color: var(--color-text-h1);
}

@media (max-width: 640px) {
  .carte {
    flex-direction: column;
  }
  .image {
    width: 100%;
    height: 180px;
  }
  .actions {
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 0;
  }
  .chevron {
    display: none;
  }
}
</style>
