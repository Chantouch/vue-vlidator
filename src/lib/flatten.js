import { isObject, isNaN } from 'lodash';

const flatten = (source, flatKey) => {
  let newSource = {};

  Object.keys(source).forEach(key => {
    let value = source[key];
    let currentFlatKey = flatKey ? `${flatKey}.${key}` : key;

    if (isObject(value)) {
      newSource = Object.assign(newSource, flatten(value, currentFlatKey));
    } else {
      newSource[currentFlatKey] = value;
    }
  });

  return newSource;
};

export const unflatten = (data) => {
  const result = {};
  for (const i in data) {
    const keys = i.split('.');
    keys.reduce(function (r, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? data[i] : {}) : []);
    }, result);
  }
  return result;
};

export default flatten;
