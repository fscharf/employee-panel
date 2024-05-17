import { describe, it, expect } from 'vitest'
import { isLastIndex } from '@/utils/array'

describe('isLastIndex', () => {
  it('returns true if the index is the last index in the array', () => {
    const array = [1, 2, 3, 4]
    const index = 3

    expect(isLastIndex(index, array)).toBe(true)
  })

  it('returns false if the index is not the last index in the array', () => {
    const array = [1, 2, 3, 4]
    const index = 2

    expect(isLastIndex(index, array)).toBe(false)
  })

  it('returns false for an empty array', () => {
    const array: number[] = []
    const index = 0

    expect(isLastIndex(index, array)).toBe(false)
  })

  it('returns true for a single-element array if index is 0', () => {
    const array = [1]
    const index = 0

    expect(isLastIndex(index, array)).toBe(true)
  })

  it('returns false for a single-element array if index is not 0', () => {
    const array = [1]
    const index = 1

    expect(isLastIndex(index, array)).toBe(false)
  })
})
