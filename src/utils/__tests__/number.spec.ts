import { describe, expect, it } from 'vitest'
import { sortByNumberAsc, sortByNumberDesc } from '../number'

describe('sortByNumberAsc', () => {
  it('sorts an array of objects by a number property in ascending order', () => {
    const array = [
      { id: 1, number: 5 },
      { id: 2, number: 3 },
      { id: 3, number: 7 }
    ]
    const sortedArray = sortByNumberAsc(array, 'number')
    expect(sortedArray[0].id).toBe(2)
    expect(sortedArray[1].id).toBe(1)
    expect(sortedArray[2].id).toBe(3)
  })

  it('handles sorting an empty array', () => {
    const array: { id: number; number: number }[] = []
    const sortedArray = sortByNumberAsc(array, 'number')
    expect(sortedArray).toEqual([])
  })

  it('handles sorting an array with a single object', () => {
    const array = [{ id: 1, number: 5 }]
    const sortedArray = sortByNumberAsc(array, 'number')
    expect(sortedArray[0].id).toBe(1)
  })

  it('handles sorting an array with negative numbers', () => {
    const array = [
      { id: 1, number: -5 },
      { id: 2, number: -3 },
      { id: 3, number: -7 }
    ]
    const sortedArray = sortByNumberAsc(array, 'number')
    expect(sortedArray[0].id).toBe(3)
    expect(sortedArray[1].id).toBe(1)
    expect(sortedArray[2].id).toBe(2)
  })

  it('handles sorting an array with duplicate numbers', () => {
    const array = [
      { id: 1, number: 5 },
      { id: 2, number: 3 },
      { id: 3, number: 7 },
      { id: 4, number: 5 }
    ]
    const sortedArray = sortByNumberAsc(array, 'number')
    expect(sortedArray[0].id).toBe(2)
    expect(sortedArray[1].id).toBe(1)
    expect(sortedArray[2].id).toBe(4)
    expect(sortedArray[3].id).toBe(3)
  })
})

describe('sortByNumberDesc', () => {
  it('sorts an array of objects by a number property in descending order', () => {
    const array = [
      { id: 1, number: 5 },
      { id: 2, number: 3 },
      { id: 3, number: 7 }
    ]
    const sortedArray = sortByNumberDesc(array, 'number')
    expect(sortedArray[0].id).toBe(3)
    expect(sortedArray[1].id).toBe(1)
    expect(sortedArray[2].id).toBe(2)
  })

  it('handles sorting an empty array', () => {
    const array: { id: number; number: number }[] = []
    const sortedArray = sortByNumberDesc(array, 'number')
    expect(sortedArray).toEqual([])
  })

  it('handles sorting an array with a single object', () => {
    const array = [{ id: 1, number: 5 }]
    const sortedArray = sortByNumberDesc(array, 'number')
    expect(sortedArray[0].id).toBe(1)
  })

  it('handles sorting an array with negative numbers', () => {
    const array = [
      { id: 1, number: -5 },
      { id: 2, number: -3 },
      { id: 3, number: -7 }
    ]
    const sortedArray = sortByNumberDesc(array, 'number')
    expect(sortedArray[0].id).toBe(2)
    expect(sortedArray[1].id).toBe(1)
    expect(sortedArray[2].id).toBe(3)
  })

  it('handles sorting an array with duplicate numbers', () => {
    const array = [
      { id: 1, number: 5 },
      { id: 2, number: 3 },
      { id: 3, number: 7 },
      { id: 4, number: 5 }
    ]
    const sortedArray = sortByNumberDesc(array, 'number')
    expect(sortedArray[0].id).toBe(3)
    expect(sortedArray[1].id).toBe(1)
    expect(sortedArray[2].id).toBe(4)
    expect(sortedArray[3].id).toBe(2)
  })
})
