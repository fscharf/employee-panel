/**
 * Sorts an array of objects by a number property in descending order.
 * @param array - The array to sort.
 * @param numberKey - The key of the date property in the objects.
 * @returns The sorted array.
 */
export function sortByNumberDesc<T>(array: T[], numberKey: keyof T): T[] {
  return array.sort((a, b) => {
    const dateA = Number(a[numberKey])
    const dateB = Number(b[numberKey])
    return dateB - dateA
  })
}

/**
 * Sorts an array of objects by a number property in ascending order.
 * @param array - The array to sort.
 * @param numberKey - The key of the date property in the objects.
 * @returns The sorted array.
 */
export function sortByNumberAsc<T>(array: T[], numberKey: keyof T): T[] {
  return array.sort((a, b) => {
    const dateA = Number(a[numberKey])
    const dateB = Number(b[numberKey])
    return dateA - dateB
  })
}
