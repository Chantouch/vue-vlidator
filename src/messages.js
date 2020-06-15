import toUpper from 'lodash/toUpper'

const messages = {
  alpha: 'The {0} field must contain only letters',
  alpha_numeric: 'The {0} field must contain only letters and numbers',
  base64: 'The {0} is not valid base64 string',
  decimal: 'The {0} field should be decimal',
  email: 'The {0} field should be valid email address',
  hash: 'The {0} field is invalid hash',
  in: 'The {0} field is not proper value',
  ip: 'The {0} field is not valid ip address',
  json: 'The {0} field is not valid json token',
  jwt: 'The {0} field is not valid jwt token',
  lengthrange: 'The {0} field should be from {1} to {2} length',
  length: 'The {0} field should be equal {1} length',
  macaddress: 'The {0} field invalid MAC address',
  max: 'The {0} field should be less than {1} length',
  maxval: 'The {0} field should be less than {1}',
  min: 'The {0} field should be greater than {1}',
  minval: 'The {0} field should be greater than {1}',
  md5: 'The {0} field is invalid MD5 hash',
  number: 'The {0} field should be number',
  postalcode: 'The {0} field is invalid postal code',
  phone: 'The {0} field should be valid phone number',
  required: 'The {0} field is required',
  uuid: 'The {0} field is invalid uuid',
  regex: 'The {0} field is not valid value'
}
const fields = { name: 'Name' }
const format = function(message, args) {
  if (!message) {
    return ''
  }
  return message.replace(/\{(\d+)\}/g, function(m, n) {
    return args[n] ? args[n] : m
  })
}
export function getMessage(rule, args) {
  return format(messages[rule], args)
}
export function getFieldName(field = '') {
  if (fields[field] !== 'undefined') {
    return fields[field]
  }
  field = field.replace('_', ' ')
  field = toUpper(field)
  return field
}

export default messages
