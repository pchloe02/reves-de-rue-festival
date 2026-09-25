<script setup>
import { useEvenementsStore } from '../stores/evenements.js'

const store = useEvenementsStore()
</script>

<template>
  <footer>
    <div class="partenaires">
      <template v-for="partenaire in store.festival.partenaires" :key="partenaire.nom">
        <img v-if="partenaire.logo" :src="partenaire.logo" :alt="partenaire.nom" />
        <span v-else class="partenaire-nom">{{ partenaire.nom }}</span>
      </template>
    </div>

    <div class="bas">
      <p class="titre">{{ store.festival.nom }}</p>
      <p class="texte">{{ store.festival.description }}</p>

      <div class="reseaux">
        <a v-for="reseau in store.festival.reseaux" :key="reseau.nom" :href="reseau.lien" class="reseau" :aria-label="reseau.nom">
          <svg v-if="reseau.nom === 'Facebook'" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z" />
          </svg>
          <svg v-else-if="reseau.nom === 'Instagram'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
          <svg v-else-if="reseau.nom === 'YouTube'" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.2.4-3.8.4-3.8s0-2.6-.4-3.8ZM10 15V9l5.2 3L10 15Z" />
          </svg>
          <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3v12H3V9Zm6 0h3v1.7c.6-1 1.8-2 3.7-2 3.3 0 4.3 2 4.3 5.3v7H17v-6.2c0-1.6-.3-3-2-3s-2.2 1.3-2.2 3V21H9V9Z" />
          </svg>
        </a>
      </div>

      <a href="#" class="bouton bouton-lien">Newsletter</a>

      <div class="fin">
        <img src="/images/logo-troie3.png" alt="Troi3" class="logo-troie3" />
        <p>© 2026 TROIE3 All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  margin-top: 80px;
}

.partenaires {
  background: var(--violet-dream-50);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  gap: var(--spacing-400) var(--spacing-800);
  padding: var(--spacing-800) var(--spacing-600);
}
.partenaires img {
  height: 52px;
}
.partenaire-nom {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-h1);
  font-size: var(--font-size-small);
}

.bas {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-800);
  padding: var(--spacing-1000) var(--spacing-600);
  text-align: center;
}
.titre {
  margin: 0;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-heading-2);
  text-transform: uppercase;
  color: var(--hors-ds-color-dark);
}
.texte {
  margin: calc(var(--spacing-400) * -1) 0 0;
  max-width: 60ch;
  font-size: var(--font-size-small);
  line-height: 22px;
  opacity: 0.8;
}

.reseaux {
  display: flex;
  gap: var(--spacing-600);
}
.reseau {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--color-image-selector-border);
  color: var(--color-image-selector-icon);
  border: 3px solid var(--color-image-selector-bg);
  outline: var(--border-width-100) solid var(--color-image-selector-border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.reseau:hover {
  background: var(--violet-dream-700);
}

.fin {
  width: 100%;
  max-width: 1074px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-400);
}
.fin p {
  margin: 0;
  font-size: var(--font-size-small);
  color: var(--hors-ds-color-dark);
}
.logo-troie3 {
  height: 110px;
  width: auto;
}
</style>
