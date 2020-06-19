import get from 'lodash/get'
import upperFirst from 'lodash/upperFirst'
import isUndefined from 'lodash/isUndefined'
import Validator from './validator'
import { getMessage, getFieldName } from './messages'

export default {
  mounted() {
    if (Object.keys(this.validationRules).length > 0) {
      this._validator = this.createValidator(this.validationRules)
    }
  },
  data() {
    return {
      errors: {},
      successes: {},
      isValidationSuccess: undefined
    }
  },
  computed: {
    isValid() {
      if (!this._validator) {
        return true
      }
      if (this.isValidationSuccess === undefined) {
        this._validator.validate(this.$data, true)
        this.isValidationSuccess = this._validator.isValid
      }
      return this.isValidationSuccess
    },
    validationRules() {
      return {}
    },
    validationData() {
      return this.$data
    }
  },
  methods: {
    onValidationMessage({ field, rule }) {
      if (this.$i18n && this.$t) {
        const fieldName = `validation.attributes.${field}`
        field = field.replace('_', ' ')
        field = upperFirst(field)
        field = this.$te(fieldName) ? this.$t(fieldName) : field
        return this.$t(`validation.${rule.name}`, [field, ...rule.args])
      }
      field = getFieldName(field)
      return getMessage(rule.name, [field, ...rule.args])
    },
    createValidator(rules, { watch = true } = {}) {
      const validator = new Validator(rules, {
        onError: (field, rule) => {
          if (!rule.message) {
            rule.message = this.onValidationMessage({ field, rule })
          }
          this.$set(this, 'isValidationSuccess', false)
          this.$set(this.errors, field, [rule.message])
          this.$set(this.successes, field, false)
          if (typeof this.$errors !== 'undefined') {
            const errors = {}
            for (const error in this.errors) {
              if (this.errors.hasOwnProperty(error)) {
                const errs = error.split('.')
                const [field1, field2] = errs
                const msg = isUndefined(this.errors[error])
                  ? ['']
                  : this.errors[error]
                if (errs.length > 1) {
                  Object.assign(errors, {
                    [field2]: [
                      upperFirst(msg[0].replace(`${upperFirst(field1)}.`, ''))
                    ]
                  })
                } else {
                  Object.assign(errors, {
                    [field1]: this.errors[error]
                  })
                }
              }
            }
            this.$errors.fill(errors)
          }
        },
        onSuccess: (field) => {
          this.$set(this.errors, field, undefined)
          this.$set(this.successes, field, true)
          this.$set(this, 'isValidationSuccess', validator.isValid)
          if (typeof this.$errors !== 'undefined') {
            this.$errors.clear(field)
          }
        }
      })
      if (watch) {
        validator.watchers = []
        validator.fields.forEach((field) => {
          const watcher = this.$watch(field, (newVal, oldVal) => {
            validator.validateField(field, newVal)
          })
          validator.watchers.push(watcher)
        })
      }
      return validator
    },
    validate(rules, data) {
      const validator = rules
        ? this.createValidator(rules, { watch: !data })
        : this._validator
      // if sent filed name
      if (typeof rules === 'string') {
        validator.validateField(rules, get(this.validationData, rules))
      }
      if (validator instanceof Validator) {
        return validator.validate(data || this.validationData)
      }
    }
  }
}
