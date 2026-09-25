<script setup>
import EventCardPetite from '../components/EventCardPetite.vue'
import { useEvenementsStore } from '../stores/evenements.js'

const store = useEvenementsStore()
</script>

<template>
  <main>
    <section class="hero">
      <img :src="store.festival.image" alt="" class="hero-image" />
      <div class="hero-texte">
        <h1>{{ store.festival.nom }}</h1>
        <p class="hero-infos">
          <span>{{ store.festival.dates }}</span>
          <span>-</span>
          <span>{{ store.festival.lieu }}</span>
        </p>
        <div class="hero-boutons">
          <RouterLink to="/programmation" class="bouton bouton-hero">Découvrir le programme</RouterLink>
          <a href="#" class="bouton bouton-hero">Billetterie</a>
        </div>
      </div>
    </section>

    <section class="programme">
      <div class="programme-titre">
        <h2>Au programme</h2>
        <RouterLink to="/programmation">Voir plus →</RouterLink>
      </div>
      <div class="defilement">
        <EventCardPetite v-for="evenement in store.evenementsPhares" :key="evenement.id" :evenement="evenement" />
      </div>
    </section>

    <section class="infos">
      <div class="infos-contenu">
        <div class="infos-texte">
          <h2>Infos pratiques</h2>
          <p v-for="info in store.festival.infosPratiques" :key="info.titre">
            {{ info.titre }} : {{ info.texte }}
          </p>
        </div>
        <iframe
          class="carte"
          :src="store.festival.carte"
          title="Carte du lieu du festival"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background: var(--violet-dream-800);
}
.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero-texte {
  position: relative;
  padding: var(--spacing-1000) 64px 56px;
  color: var(--color-text-display);
}
h1 {
  margin: 0;
  font-family: var(--font-family-brand);
  font-weight: var(--font-weight-regular);
  font-size: clamp(56px, 9vw, var(--font-size-brand));
  line-height: 1;
  color: var(--color-text-display);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
}
.hero-infos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-200) var(--spacing-600);
  margin: var(--spacing-200) 0 var(--spacing-800);
  font-size: clamp(20px, 3vw, var(--font-size-heading-1));
  font-weight: var(--font-weight-bold);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}
.hero-boutons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-400);
}
.bouton-hero {
  background: var(--color-bg-body);
  color: var(--color-text-secondary);
}
.bouton-hero:hover {
  background: var(--color-bg-surface);
}

.programme {
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--spacing-1000) var(--spacing-600);
}
.programme-titre {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
h2 {
  margin: 0;
  font-size: var(--font-size-heading-2);
  line-height: var(--line-height-heading-2);
  color: var(--color-text-h1);
}
.programme-titre a {
  color: var(--color-btn-link-text-default);
  font-size: var(--font-size-small);
}
.defilement {
  display: flex;
  gap: var(--spacing-600);
  overflow-x: auto;
  padding: var(--spacing-600) 0 var(--spacing-400);
}

.infos {
  background: var(--violet-dream-800);
  color: var(--color-bg-body);
  margin-top: var(--spacing-1000);
  padding: var(--spacing-800) var(--spacing-600);
}
.infos-contenu {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  gap: var(--spacing-1000);
  align-items: center;
  justify-content: center;
}
.infos-texte {
  max-width: 620px;
}
.infos h2 {
  color: var(--color-bg-body);
  margin-bottom: var(--spacing-600);
}
.infos p {
  font-size: var(--font-size-large);
  line-height: 1.4;
  margin: 0 0 var(--spacing-600);
}
.carte {
  width: 350px;
  height: 350px;
  border: none;
  flex-shrink: 0;
  background: var(--color-bg-surface);
}

@media (max-width: 900px) {
  .hero {
    min-height: 480px;
  }
  .hero-texte {
    padding: var(--spacing-600);
  }
  .infos-contenu {
    flex-direction: column;
    align-items: flex-start;
  }
  .carte {
    width: 100%;
  }
}
</style>
