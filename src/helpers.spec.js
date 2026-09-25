import { describe, it, expect } from 'vitest'
import { formaterHeure, jourEtMois, formaterDateLongue, formaterDateBouton } from './helpers.js'

describe('formaterHeure', () => {
  it('enlève les minutes quand elles sont à 00', () => {
    expect(formaterHeure('14:00')).toBe('14h')
  })

  it('garde les minutes sinon', () => {
    expect(formaterHeure('21:30')).toBe('21h30')
  })
})

describe('jourEtMois', () => {
  it('renvoie le jour et le mois abrégé', () => {
    expect(jourEtMois('2026-09-22')).toEqual({ jour: '22', mois: 'SEP' })
  })

  it('ajoute un zéro devant les jours à un chiffre', () => {
    expect(jourEtMois('2026-09-02')).toEqual({ jour: '02', mois: 'SEP' })
  })
})

describe('formaterDateLongue', () => {
  it('écrit la date en toutes lettres', () => {
    expect(formaterDateLongue('2026-09-22')).toBe('22 septembre 2026')
  })
})

describe('formaterDateBouton', () => {
  it('écrit une date courte pour les boutons', () => {
    expect(formaterDateBouton('2026-09-22')).toBe('22 sept 2026')
  })
})
