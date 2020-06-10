
const messages = {
  alpha: 'This field must contain only letters',
  alpha_numeric: 'This field must contain only letters and numbers',
  base64: 'Not valid base64 string',
  decimal: 'Field should be decimal',
  email: 'E-mail address should be valid',
  hash: 'Invalid hash',
  in: 'Not proper value',
  ip: 'Not valid ip address',
  json: 'Not valid json token',
  jwt: 'Not valid jwt token',
  lengthrange: 'Length should be from {0} to {1}',
  length: 'Length should be equal {0}',
  macaddress: 'Invalid MAC accdess',
  max: 'Length should be less than {0}',
  maxval: 'Value of field should be less than {0}',
  min: 'Length should be greater than {0}',
  minval: 'Value of field should be greater than {0}',
  md5: 'Invalid MD5 hash',
  number: 'Field should be number',
  postalcode: 'Invalid postal code',
  phone: 'Phone number should be valid',
  required: 'This field is required',
  uuid: 'Invalid uuid',
  regex: 'Not valid value'
}

const format = function (message, args) {
  if (!message) {
    return ''
  }
  return message.replace(/\{(\d+)\}/g, function(m,n){
		return args[n] ? args[n] : m;
	});
}
export function getMessage(rule, args) {
  return format(messages[rule], args)
}

export default messages
