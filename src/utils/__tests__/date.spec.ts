import { describe, it, expect } from 'vitest'
import { calculateTotalHours, formatDateTime, sortByDateDesc } from '@/utils/date'

describe('sortByDateDesc', () => {
  it('sorts an array of objects by a date property in descending order', () => {
    const array = [
      { id: 1, date: '2023-05-01' },
      { id: 2, date: '2023-05-03' },
      { id: 3, date: '2023-05-02' }
    ]

    const sortedArray = sortByDateDesc(array, 'date')

    expect(sortedArray[0].id).toBe(2)
    expect(sortedArray[1].id).toBe(3)
    expect(sortedArray[2].id).toBe(1)
  })

  it('handles an empty array', () => {
    const array: { id: number; date: string }[] = []

    const sortedArray = sortByDateDesc(array, 'date')

    expect(sortedArray).toEqual([])
  })

  it('handles an array with a single element', () => {
    const array = [{ id: 1, date: '2023-05-01' }]

    const sortedArray = sortByDateDesc(array, 'date')

    expect(sortedArray[0].id).toBe(1)
  })

  it('handles an array with invalid date formats gracefully', () => {
    const array = [
      { id: 1, date: 'invalid-date' },
      { id: 2, date: '2023-05-03' },
      { id: 3, date: '2023-05-02' }
    ]

    const sortedArray = sortByDateDesc(array, 'date')

    expect(sortedArray[0].id).toBe(1)
    expect(sortedArray[1].id).toBe(2)
    expect(sortedArray[2].id).toBe(3)
  })

  it('handles an array with mixed valid and invalid date formats', () => {
    const array = [
      { id: 1, date: 'invalid-date' },
      { id: 2, date: '2023-05-03' },
      { id: 3, date: '2023-05-01' },
      { id: 4, date: '2023-05-02' }
    ]

    const sortedArray = sortByDateDesc(array, 'date')

    expect(sortedArray[0].id).toBe(1)
    expect(sortedArray[1].id).toBe(2)
    expect(sortedArray[2].id).toBe(4)
    expect(sortedArray[3].id).toBe(3)
  })
})

describe('formatDateTime', () => {
  it('formats a standard date-time string correctly', () => {
    const dateTimeStr = '2023-05-01 14:30:00'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('01/05/2023 14:30')
  })

  it('handles a date-time string without seconds', () => {
    const dateTimeStr = '2023-05-01 14:30'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('01/05/2023 14:30')
  })

  it('returns an error message for an invalid date-time string', () => {
    const dateTimeStr = 'invalid-date-time'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('Invalid date-time format')
  })

  it('returns an error message for a date-time string with different delimiters', () => {
    const dateTimeStr = '2023/05/01 14:30:00'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('Invalid date-time format')
  })

  it('returns an error message for a date-time string with only date part', () => {
    const dateTimeStr = '2023-05-01'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('Invalid date-time format')
  })

  it('returns an error message for a date-time string with incomplete time part', () => {
    const dateTimeStr = '2023-05-01 14'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('Invalid date-time format')
  })

  it('returns an error message for a date-time string with incomplete date part', () => {
    const dateTimeStr = '2023-05 14:30:00'
    const formattedDateTime = formatDateTime(dateTimeStr)
    expect(formattedDateTime).toBe('Invalid date-time format')
  })
})

describe('calculateTotalHours', () => {
  it('calculates total hours correctly for valid dates', () => {
    const startDate = '2023-05-01T08:00:00'
    const endDate = '2023-05-01T16:30:00'
    const totalHours = calculateTotalHours(startDate, endDate)
    expect(totalHours).toBe(8.5)
  })

  it('handles start and end dates with the same timestamp', () => {
    const startDate = '2023-05-01T08:00:00'
    const endDate = '2023-05-01T08:00:00'
    const totalHours = calculateTotalHours(startDate, endDate)
    expect(totalHours).toBe(0)
  })

  it('handles an invalid start date', () => {
    const startDate = 'invalid-start-date'
    const endDate = '2023-05-01T08:00:00'
    const totalHours = calculateTotalHours(startDate, endDate)
    expect(totalHours).toBeNaN()
  })

  it('handles an invalid end date', () => {
    const startDate = '2023-05-01T08:00:00'
    const endDate = 'invalid-end-date'
    const totalHours = calculateTotalHours(startDate, endDate)
    expect(totalHours).toBeNaN()
  })

  it('handles end date before start date', () => {
    const startDate = '2023-05-02T08:00:00'
    const endDate = '2023-05-01T16:30:00'
    const totalHours = calculateTotalHours(startDate, endDate)
    expect(totalHours).toBeNaN()
  })
})
