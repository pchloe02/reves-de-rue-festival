const mois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const moisCourts = ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUIN', 'JUIL', 'AOÛT', 'SEP', 'OCT', 'NOV', 'DÉC']

function versDate(dateTexte) {
  return new Date(dateTexte + 'T00:00:00')
}

export function formaterDateLongue(dateTexte) {
  const d = versDate(dateTexte)
  return d.getDate() + ' ' + mois[d.getMonth()] + ' ' + d.getFullYear()
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
