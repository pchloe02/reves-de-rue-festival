<script setup>
import { computed } from 'vue'
import EventCardPetite from '../../components/EventCardPetite.vue'
import BoutonFavori from '../../components/BoutonFavori.vue'
import { useEvenementsStore } from '../../stores/evenements.js'
import { formaterJourMois, formaterHeure, premierePhrase } from '../../helpers.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const store = useEvenementsStore()

const evenement = computed(() => store.trouverEvenement(props.id))

const artistes = computed(() => store.artistesDe(evenement.value))

const nomsArtistes = computed(() => artistes.value.map((a) => a.nom).join(', '))

const quand = computed(() => {
  const e = evenement.value
  return formaterJourMois(e.date) + ' - À partir de ' + formaterHeure(e.heureDebut)
})

const accroche = computed(() => premierePhrase(evenement.value.description))

const suggestions = computed(() => store.suggestionsPour(evenement.value))
</script>

<template>
  <main>
    <div class="page haut">
      <article class="evenement">
        <div class="visuel">
          <img :src="evenement.image" alt="" />
          <div class="degrade"></div>

          <div class="visuel-bas" aria-hidden="true">
            <p class="visuel-type">{{ evenement.type }}</p>
            <p class="visuel-titre">{{ evenement.titre }}</p>
          </div>
        </div>

        <div class="colonne">
          <div class="resume">
            <div class="resume-haut">
              <div class="categorie">
                <p class="categorie-type">{{ evenement.type }}</p>
                <p v-if="evenement.zone">{{ evenement.zone }}</p>
              </div>
              <BoutonFavori :taille="32" />
            </div>

            <div class="titre-date">
              <h1>{{ evenement.titre }}</h1>
              <p>{{ quand }}</p>
            </div>

            <p>{{ accroche }}</p>
          </div>

          <a href="#" class="bouton bouton-primaire bouton-artiste">À propos de l'artiste</a>
        </div>
      </article>
    </div>

    <section class="info-section">
      <div class="info-contenu">
        <div class="description">
          <h2>Description</h2>
          <p>{{ evenement.description }}</p>
        </div>

        <div class="informations">
          <div class="bloc-info">
            <h2>Informations</h2>
            <p v-if="artistes.length > 0">Artiste : {{ nomsArtistes }}</p>
            <p class="categorie-type">Type : {{ evenement.type }}</p>
          </div>
          <div class="bloc-info">
            <h3>Emplacement :</h3>
            <p>{{ evenement.lieu }}</p>
          </div>
        </div>
      </div>
    </section>

    <div class="page">
      <section class="suggestions">
        <div class="suggestions-titre">
          <h2>Suggestions</h2>
          <RouterLink to="/programmation">Voir plus →</RouterLink>
        </div>
        <div class="defilement">
          <EventCardPetite v-for="s in suggestions" :key="s.id" :evenement="s" />
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.haut {
  padding-bottom: var(--spacing-800);
}
.evenement {
  display: flex;
  gap: var(--spacing-1000);
  padding-top: var(--spacing-800);
}

.visuel {
  position: relative;
  flex: 0 0 55%;
  aspect-ratio: 817 / 618;
  border-radius: var(--radius-300);
  overflow: hidden;
  background: var(--violet-dream-700);
  display: flex;
  align-items: flex-end;
}
.visuel img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.degrade {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0));
}
.visuel-bas {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-200);
  padding: 23px 36px var(--spacing-800);
  min-width: 0;
}
.visuel-type,
.visuel-titre {
  margin: 0;
  color: var(--color-text-display);
  font-weight: var(--font-weight-bold);
}
.visuel-type {
  font-size: var(--font-size-heading-2);
}
.visuel-titre {
  font-size: var(--font-size-display);
  line-height: 1.05;
  overflow-wrap: break-word;
}
.categorie-type::first-letter,
.visuel-type::first-letter {
  text-transform: uppercase;
}

.colonne {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1000);
  color: var(--color-text-body);
  font-size: var(--font-size-large);
}
.colonne p {
  margin: 0;
}
.resume {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  padding: var(--spacing-600) 0;
}
.resume-haut {
  display: flex;
  align-items: center;
  gap: var(--spacing-400);
}
.categorie {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
}
.titre-date {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
}
h1 {
  margin: 0;
  color: var(--color-text-body);
  font-size: var(--font-size-heading-1);
  font-weight: var(--font-weight-bold);
}
.bouton-artiste {
  margin-top: auto;
  align-self: flex-start;
}

.info-section {
  border-top: var(--border-width-050) solid var(--color-text-body);
  border-bottom: var(--border-width-050) solid var(--color-text-body);
  padding: var(--spacing-600) 0;
}
.info-contenu {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-600);
  display: flex;
  align-items: center;
  gap: var(--spacing-1000);
  color: var(--color-text-body);
  font-size: var(--font-size-large);
}
.info-contenu p {
  margin: 0;
}
.description {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-400);
  padding: var(--spacing-600) var(--spacing-400);
  border-right: var(--border-width-050) solid var(--color-text-body);
}
.description h2 {
  margin: 0;
  color: var(--color-text-h2);
  font-size: var(--font-size-heading-3);
  font-weight: var(--font-weight-semi-bold);
}
.informations {
  flex: 0 0 35%;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-600);
  padding: var(--spacing-600) var(--spacing-400);
}
.bloc-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-150);
}
.bloc-info h2,
.bloc-info h3 {
  margin: 0 0 var(--spacing-050);
  color: var(--color-text-body);
}
.bloc-info h2 {
  font-size: var(--font-size-heading-2);
  font-weight: var(--font-weight-bold);
}
.bloc-info h3 {
  font-size: var(--font-size-heading-3);
  font-weight: var(--font-weight-semi-bold);
}

.suggestions {
  margin-top: var(--spacing-800);
}
.suggestions-titre {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-600);
}
.suggestions-titre h2 {
  font-size: var(--font-size-heading-2);
  line-height: var(--line-height-heading-2);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-h1);
  margin: 0;
}
.suggestions-titre a {
  color: var(--color-btn-link-text-default);
  font-size: var(--font-size-small);
}
.defilement {
  display: flex;
  gap: var(--spacing-400);
  overflow-x: auto;
  padding: var(--spacing-600) 0 var(--spacing-400);
}

@media (max-width: 900px) {
  .evenement {
    flex-direction: column;
    padding-top: var(--spacing-600);
  }
  .visuel {
    flex-basis: auto;
    width: 100%;
  }
  .visuel-titre {
    font-size: 34px;
  }
  .info-contenu {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .description {
    border-right: none;
    border-bottom: var(--border-width-050) solid var(--color-text-body);
  }
}
</style>
