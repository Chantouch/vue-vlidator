import validator from 'validator'

function isExists(value) {
  if (value === null || value === undefined) {
    return false
  } else if (Array.isArray(value)) {
    return value.length > 0
  } else if (typeof value === 'string') {
    return value.trim().length > 0
  } else if (typeof value === 'object') {
    return Object.keys(value).length > 0
  } else if (value instanceof Date) {
    return true
  } else {
    return true
  }
}

const checker = {
  alpha_numeric: (value, args) => {
    const options = args.length ? { locale: args[0] } : undefined
    return validator.isAlphanumeric(value, options)
  },
  integer: (value, args) => {
    return validator.isInt(value)
  },
  isExists,
  length: (value, args) => {
    return validator.equals('' + value.length, args[0])
  },
  lengthrange: (value, args) => {
    return validator.isLength(value, { min: args[0], max: args[1] })
  },
  min: (value, args) => {
    return validator.isLength(value, { min: args[0], max: undefined })
  },
  max: (value, args) => {
    return validator.isLength(value, { min: undefined, max: args[0] })
  },
  minval: (value, args) => {
    return validator.isFloat(value, { min: args[0], max: undefined })
  },
  maxval: (value, args) => {
    return validator.isFloat(value, { min: undefined, max: args[0] })
  },
  number: (value, args) => {
    return validator.isFloat(value)
  },
  required: isExists,
  phone: (value, args) => {
    return validator.isMobilePhone(value, args[0])
  },
  regex: (value, args) => {
    console.log(args[0], args[1])
    const regexp = new RegExp(args[0], args[1])
    return regexp.test(value)
  }
}

const validatorItems = [
  'after',
  'alpha',
  'base64',
  'before',
  'boolean',
  'IP',
  'IPRange',
  'boolean',
  'creditCard',
  'currency',
  'decimal',
  'divisibleBy',
  'empty',
  'isHexColor',
  'hexColor',
  'hexadecimal',
  'LatLong',
  'lowercase',
  'UUID',
  'URL',
  'uppercase',
  'matches',
  'PostalCode',
  'port',
  'JWT',
  'JSON',
  'hash',
  'in',
  'email',
  'MD5',
  'MACAddress'
]
validatorItems.forEach((item) => {
  checker[item.toLowerCase()] = (value, args) => {
    const name =
      'is' + item.charAt(0).toUpperCase() + item.substr(1, item.length - 1)
    return validator[name](value, args.length ? args[0] : undefined)
  }
})

export default checker
