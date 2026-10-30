import { describe, it, expect } from 'vitest'
import { formatTime, getDayMonth, formatLongDate, formatDateButton, firstSentence } from './helpers.ts'

describe('formatTime', () => {
  it('enlève les minutes quand elles sont à 00', () => {
    expect(formatTime('14:00')).toBe('14h')
  })

  it('garde les minutes sinon', () => {
    expect(formatTime('21:30')).toBe('21h30')
  })
})

describe('getDayMonth', () => {
  it('renvoie le jour et le mois abrégé', () => {
    expect(getDayMonth('2026-09-22')).toEqual({ day: '22', month: 'SEP' })
  })

  it('ajoute un zéro devant les jours à un chiffre', () => {
    expect(getDayMonth('2026-09-02')).toEqual({ day: '02', month: 'SEP' })
  })
})

describe('formatLongDate', () => {
  it('écrit la date en toutes lettres', () => {
    expect(formatLongDate('2026-09-22')).toBe('22 septembre 2026')
  })
})

describe('formatDateButton', () => {
  it('écrit une date courte pour les boutons', () => {
    expect(formatDateButton('2026-09-22')).toBe('22 sept 2026')
  })
})

describe('firstSentence', () => {
  it('coupe le texte après la première phrase', () => {
    expect(firstSentence('Une fresque en direct. Venez nombreux.')).toBe('Une fresque en direct.')
  })

  it('renvoie tout le texte quand il n’y a qu’une phrase', () => {
    expect(firstSentence('Une seule phrase.')).toBe('Une seule phrase.')
  })
})
