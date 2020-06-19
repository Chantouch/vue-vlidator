import isArray from 'lodash/isArray'

const isObject = (item) => {
  return !!(item && typeof item === 'object' && !isArray(item) && true)
}
export const flatten = (source, flatKey) => {
  let newSource = {}
  Object.keys(source).forEach((key) => {
    const value = source[key]
    const currentFlatKey = flatKey ? `${flatKey}.${key}` : key
    if (isObject(value)) {
      newSource = Object.assign(newSource, flatten(value, currentFlatKey))
    } else {
      newSource[currentFlatKey] = value
    }
  })
  return newSource
}

export const flattenObject = (obj = {}) => {
  const flattened = {}
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, flattenObject(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })
  return flattened
}

export default { flatten, flattenObject }
