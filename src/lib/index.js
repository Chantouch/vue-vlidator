import Validator from './validator';
import _get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import flatten from './flatten';

class Vlidator {
  install (Vue, options = {}) {
    const { locale = 'en', customMessages = {} } = options;
    Vue.mixin({
      beforeCreate() {
        this.$options.$vlidator = {};
        const input = this.$data || {};
        const rules = {};
        Vue.util.defineReactive(this.$options, '$vlidator', new Validator(input, rules, locale, customMessages));
        if (!this.$options.computed) {
          this.$options.computed = {};
        }
        this.$options.computed.$vlidator = function() {
          return this.$options.$vlidator;
        };
      },
      created () {
        const this_ = this;
        const vlidator = this_.$options.vlidator;
        if (vlidator && vlidator.rules) {
          const { rules = {} } = vlidator;
          Object.entries(flatten(this_.$data)).forEach(([path, _]) => {
            let validations = _get(rules, path);
            if (validations !== undefined) {
              this_.$watch(path, () => {
                const input = getData({ rules, data: this_.$data });
                const validator = new Validator(input, rules, locale, customMessages);
                validator.check();
                this_.$options.$vlidator = validator;
                if (!isUndefined(this_.$errors) && isFunction(this_.$errors.fill)) {
                  const errors = validator.errors.all() || {};
                  this_.$errors.fill(errors);
                }
              });
            }
          });
        }
      }
    });
  }
}

/**
 * Get Data
 * @param {Object} payload
 * @returns {Object}
 */
const getData = (payload = {}) => {
  const input = {};
  const { rules = {}, data = {} } = payload;
  for (const item in rules) {
    if (data.hasOwnProperty(item)) {
      Object.assign(input, {
        [item]: data[item]
      });
    }
  }
  return input;
};

export { default as Validator } from './validator';
export default new Vlidator();
