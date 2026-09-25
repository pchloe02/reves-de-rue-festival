import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import evenementsJson from '../data/evenements.json'
import artistesJson from '../data/artistes.json'
import festivalJson from '../data/festival.json'

export const useEvenementsStore = defineStore('evenements', () => {
  const festival = ref(festivalJson)
  const evenements = ref(evenementsJson)
  const artistes = ref(artistesJson)

  const filtres = ref({
    date: '',
    recherche: '',
  })

  const vue = ref('liste')

  const evenementsTries = computed(() => {
    return [...evenements.value].sort((a, b) => {
      const dateA = a.date + ' ' + a.heureDebut
      const dateB = b.date + ' ' + b.heureDebut
      return dateA.localeCompare(dateB)
    })
  })

  const evenementsPhares = computed(() => {
    return evenementsTries.value.filter((e) => e.phare === true)
  })

  const dates = computed(() => {
    const liste = []
    for (let i = 0; i < evenementsTries.value.length; i++) {
      const d = evenementsTries.value[i].date
      if (!liste.includes(d)) {
        liste.push(d)
      }
    }
    return liste
  })

  function artistesDe(evenement) {
    return artistes.value.filter((a) => evenement.artistes.includes(a.id))
  }

  const evenementsFiltres = computed(() => {
    let resultat = evenementsTries.value

    if (filtres.value.date !== '') {
      resultat = resultat.filter((e) => e.date === filtres.value.date)
    }
    if (filtres.value.recherche !== '') {
      const mot = filtres.value.recherche.toLowerCase()
      resultat = resultat.filter((e) => {
        const noms = artistesDe(e).map((a) => a.nom).join(' ')
        const texte = (e.titre + ' ' + e.type + ' ' + e.lieu + ' ' + noms).toLowerCase()
        return texte.includes(mot)
      })
    }
    return resultat
  })

  const evenementsParJour = computed(() => {
    const groupes = []
    for (let i = 0; i < evenementsFiltres.value.length; i++) {
      const e = evenementsFiltres.value[i]
      let groupe = groupes.find((g) => g.date === e.date)
      if (!groupe) {
        groupe = { date: e.date, evenements: [] }
        groupes.push(groupe)
      }
      groupe.evenements.push(e)
    }
    return groupes
  })

  function changerFiltre(nom, valeur) {
    filtres.value[nom] = valeur
  }

  return {
    festival,
    filtres,
    vue,
    evenementsPhares,
    dates,
    evenementsFiltres,
    evenementsParJour,
    changerFiltre,
  }
})
