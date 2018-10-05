export function dataToEntities(array, primaryKey = 'id') {
  return array.reduce((acc, current) => {
    acc[current[primaryKey]] = current
    return acc
  }, {})
}
