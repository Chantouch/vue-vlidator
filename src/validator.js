import haye from 'haye/dist/haye.es'
import get from 'lodash/get'
import isObject from 'lodash/isObject'
import isString from 'lodash/isString'
import isArray from 'lodash/isArray'
import checker from './checker'

const parseFromString = (rules) => {
  return haye.fromPipe(rules).toArray()
}

export default class Validator {
  constructor(rules, options = {}) {
    this.options = options
    this.init(rules)
  }

  init(rules) {
    this.errors = {}
    this.rules = {}
    this.handles = {}
    this.fields = []
    Object.keys(rules).forEach((field) => {
      const rule = rules[field]
      if (rule) {
        this.rules[field] = new ValidatorItem(rule, this)
        this.handles[field] = this.rules[field].handle
        this.fields.push(field)
      }
    })
  }

  validateField(field, value, silent) {
    const res = this.rules[field].validate(value)
    if (res !== true) {
      this.errors[field] = res
      !silent && this.options.onError(field, res)
    } else {
      delete this.errors[field]
      !silent && this.options.onSuccess(field)
    }
    return res
  }

  get isValid() {
    return !Object.keys(this.errors).length
  }

  validate(data, silent) {
    let isValid = true
    this.fields.forEach((field) => {
      const value = get(data, field)
      const res = this.validateField(field, value, silent)
      isValid = isValid && res === true
    })
    return isValid
  }
}

export class ValidatorItem {
  constructor(rules, parent) {
    this.parent = parent
    this.init(rules)
  }

  init(rules) {
    if (isObject(rules)) {
      // Todo check object type
      rules = []
    }
    if (isString(rules)) {
      rules = parseFromString(rules)
    }
    if (isArray(rules)) {
      const stringRules = rules
        .filter((rule) => typeof rule === 'string')
        .join('|')
      rules = rules.filter((rule) => typeof rule === 'object')
      if (stringRules) {
        rules = rules.concat(parseFromString(stringRules))
      }
    }
    this.hasRequired = !!rules.find(
      (rule) => rule.required || rule.name === 'required'
    )
    this.rules = rules
    this.handle = (value) => {
      return this.validate(value)
    }
    return rules
  }

  validate(value) {
    if (!this.hasRequired && !checker.isExists(value)) {
      return true
    }
    for (const rule of this.rules) {
      const validatorFn = rule.handle || checker[rule.name]
      if (!validatorFn) {
        console.warn('no validator', rule)
        continue
      }
      if (isObject(value)) {
        value = null
      }
      if (!validatorFn(value, rule.args)) {
        return rule
      }
    }
    return true
  }
}
