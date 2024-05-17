/**
 * Sorts an array of objects by a date property in descending order.
 * @param array - The array to sort.
 * @param dateKey - The key of the date property in the objects.
 * @returns The sorted array.
 */
export function sortByDateDesc<T>(array: T[], dateKey: keyof T): T[] {
  return array.sort((a, b) => {
    const dateA = new Date(a[dateKey] as unknown as string)
    const dateB = new Date(b[dateKey] as unknown as string)
    return dateB.getTime() - dateA.getTime()
  })
}

/**
 * Formats a date string from 'YYYY-MM-DD HH:MM:SS' to 'DD/MM/YYYY HH:MM'.
 * @param dateTimeStr - The date string to format.
 * @returns The formatted date string.
 */
export function formatDateTime(dateTimeStr: string): string {
  try {
    const [datePart, timePart] = dateTimeStr.split(' ')
    if (!datePart || !timePart) throw new Error('Invalid date-time format')

    const [year, month, day] = datePart.split('-')
    const [hour, minute] = timePart.split(':')

    if (!year || !month || !day || !hour || !minute) throw new Error('Invalid date-time format')

    return `${day}/${month}/${year} ${hour}:${minute}`
  } catch (error) {
    return 'Invalid date-time format'
  }
}

export function calculateTotalHours(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
    return NaN
  }

  const differenceInMillis = end.getTime() - start.getTime()
  const differenceInHours = differenceInMillis / (1000 * 60 * 60)

  return differenceInHours
}
