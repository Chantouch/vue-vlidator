import checker from './checker'
import haye from 'haye/dist/haye.es'
import get from 'lodash/get'

const parseFromString = (rules) => {
  return haye.fromPipe(rules).toArray()
}

export default class Validator {
  constructor (rules, options = {}) {
    this.options = options
    this.init(rules)
  }

  init (rules) {
    this.errors = {}
    this.rules = {}
    this.handles = {}
    this.fields = []
    Object.keys(rules).forEach(field => {
      let rule = rules[field]
      if (rule) {
        this.rules[field] = new ValidatorItem(rule, this)
        this.handles[field] = this.rules[field].handle
        this.fields.push(field)
      }
    })
  }

  validateField (field, value, silent) {
    let res = this.rules[field].validate(value)
    if (res !== true) {
      this.errors[field] = res
      !silent && this.options.onError(field, res)
    } else {
      delete this.errors[field]
      !silent && this.options.onSuccess(field)
    }
    return res
  }

  get isValid () {
    return !Object.keys(this.errors).length
  }

  validate (data, silent) {
    let isValid = true
    this.fields.forEach(field => {
      let value = get(data, field)
      let res = this.validateField(field, value, silent)
      isValid = isValid && res === true
    })
    return isValid
  }
}

export class ValidatorItem {
  constructor (rules, parent) {
    this.parent = parent
    this.init(rules)
  }

  init (rules) {
    if (typeof rules === 'string') {
      rules = parseFromString(rules)
    } else {
      const string_rules = rules.filter(rule => typeof rule === 'string').join('|')
      rules = rules.filter(rule => typeof rule === 'object')
      if (string_rules) {
        rules = rules.concat(parseFromString(string_rules))
      }
    }

    this.hasRequired = !!rules.find(rule => rule.required || rule.name === 'required')

    this.rules = rules

    this.handle = value => {
      return this.validate(value)
    }
    return rules
  }

  validate (value) {
    if (!this.hasRequired && !checker.isExists(value)) {
      return true
    }
    for (let rule of this.rules) {
      const validatorFn = rule.handle || checker[rule.name]
      if (!validatorFn) {
        console.warn('no validator', rule)
        continue
      }
      if (!validatorFn(value, rule.args)) {
        return rule
      }
    }
    return true
  }
}
