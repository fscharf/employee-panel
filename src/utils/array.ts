export const isLastIndex = <T extends any[]>(index: number, array: T): boolean => {
  return index === array.length - 1
}
