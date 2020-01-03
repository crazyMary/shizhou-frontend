export function flat(arr, result = []) {
  if (!Array.isArray(arr)) return [arr]
  let len = arr.length
  let index = 0
  while (index < len) {
    result = result.concat(arr[index++])
  }
  return result
}

function isType(type) {
  return function(n) {
    return {}.toString.call(n).slice(8, -1) === type
  }
}

export const isNum = isType('Number')
export const isStr = isType('String')
export const isObj = isType('Object')
export const isFunc = isType('Function')
