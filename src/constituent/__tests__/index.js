import constituent, { extendedDoodson, sortedDoodson } from '../index'
import astro from '../../astronomy'
import nodalCorrections from '../../node-corrections'

const sampleTime = {
  year: 2019,
  month: 10,
  day: 4,
  hour: 10,
  minute: 15,
  second: 40,
  microsecond: 10
}

const testAstro = astro(sampleTime)

//This is a made-up doodson number for a test coefficient
const testConstituent = new constituent('A AYZ ZZA')

describe('constituent', () => {
  test('it sorts Doodson numbers', () => {
    expect(extendedDoodson.K).toBe(11)
    expect(sortedDoodson[11]).toBe('K')
  })

  test('it converts Doodson numbers to cooeficient', () => {
    const testCooefficient = new constituent(null, [])
    const coefficient = testCooefficient.doodsonNumberToCooeficient('A BZY ZZY')
    expect(coefficient).toEqual(expect.arrayContaining([1, 2, 0, -1, 0, 0, -1]))
  })

  test('it converts cooeficient to Doodson number', () => {
    const testCooefficient = new constituent(null, [])
    const doodsonNumber = testCooefficient.cooeficientToDoodsonNumber([
      1,
      2,
      0,
      -1,
      0,
      0,
      -1
    ])
    expect(doodsonNumber).toEqual('ABZYZZY')
  })

  test('it creates cooeficient hashes', () => {
    const testCooefficient = new constituent(null, [1, 2, 0, -1, 0, 0, -1])
    const hash = testCooefficient.hash()
    expect(hash).toEqual('120m100m1')
  })

  test('it fetches astronimic Doodson Number values', () => {
    const values = testConstituent.astronimicDoodsonNumber(testAstro)
    expect(values[0].value).toBe(testAstro['T+h-s'].value)
  })

  test('it fetches astronimic speed', () => {
    const values = testConstituent.astronomicSpeed(testAstro)
    expect(values[0]).toBe(testAstro['T+h-s'].speed)
  })

  test('it fetches astronimic values', () => {
    const values = testConstituent.astronomicValues(testAstro)
    expect(values[0]).toBe(testAstro['T+h-s'].value)
  })

  test('it computes constituent value', () => {
    expect(testConstituent.value(testAstro)).toBeCloseTo(423.916666657, 4)
  })

  test('it computes constituent speed', () => {
    expect(testConstituent.speed(testAstro)).toBe(15)
  })
})
