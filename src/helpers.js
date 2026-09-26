const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const moisCourts = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC']

function versDate(dateTexte) {
  return new Date(dateTexte + 'T00:00:00')
}

export function formaterJourMois(dateTexte) {
  const d = versDate(dateTexte)
  return d.getDate() + ' ' + mois[d.getMonth()]
}

export function formaterDateLongue(dateTexte) {
  const d = versDate(dateTexte)
  return formaterJourMois(dateTexte) + ' ' + d.getFullYear()
}

export function formaterDateBouton(dateTexte) {
  const d = versDate(dateTexte)
  return d.getDate() + ' ' + mois[d.getMonth()].slice(0, 4) + ' ' + d.getFullYear()
}

export function jourEtMois(dateTexte) {
  const d = versDate(dateTexte)
  let jour = String(d.getDate())
  if (jour.length === 1) {
    jour = '0' + jour
  }
  return { jour: jour, mois: moisCourts[d.getMonth()] }
}

export function formaterHeure(heure) {
  const morceaux = heure.split(':')
  if (morceaux[1] === '00') {
    return parseInt(morceaux[0]) + 'h'
  }
  return parseInt(morceaux[0]) + 'h' + morceaux[1]
}

export function premierePhrase(texte) {
  const position = texte.indexOf('. ')
  if (position === -1) {
    return texte
  }
  return texte.slice(0, position + 1)
}

export function heureDeFin(heureDebut, duree) {
  const morceaux = heureDebut.split(':')
  const total = parseInt(morceaux[0]) * 60 + parseInt(morceaux[1]) + duree
  const h = Math.floor(total / 60) % 24
  const m = total % 60
  if (m === 0) {
    return h + 'h'
  }
  return h + 'h' + (m < 10 ? '0' + m : m)
}
