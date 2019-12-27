export function flat(arr, result = []) {
  if (!Array.isArray(arr)) return [arr]
  let len = arr.length
  let index = 0
  while (index < len) {
    result = result.concat(arr[index++])
  }
  return result
}
