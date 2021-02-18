import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import merge from 'lodash/merge';
import flatten from './flatten';
import Validator from '@chantouchsek/validatorjs';

export function install (Vue, options = {}) {
  const defaults = {
    locale: 'en',
    input: {},
    rules: {},
    customMessages: {},
    customAttributes: {},
    watch: false,
    immediate: true,
    langDir: 'lang',
    ...options
  };
  Vue.mixin({
    beforeCreate () {
      this.$options.$vlidator = {};
      const input = this.$data || {};
      Object.assign(defaults, { input, rules: {} });
      Vue.util.defineReactive(this.$options, '$vlidator', new Validator(defaults));
      if (!this.$options.computed) {
        this.$options.computed = {};
      }
      this.$options.computed.$vlidator = function () {
        return this.$options.$vlidator;
      };
    },
    created () {
      const this_ = this;
      const { watch = false, immediate = false } = defaults;
      const vlidator = this_.$options.vlidator;
      if (vlidator && vlidator.rules) {
        const { rules = {} } = vlidator;
        Object.entries(flatten(this_.$data)).forEach(([path, _]) => {
          const validations = get(rules, path);
          if (validations !== undefined && watch) {
            this_.$watch(
              path,
              (value) => {
                this_.validate({ value });
              },
              { deep: true, immediate }
            );
          }
        });
      }
    },
    methods: {
      async validate (payload = {}) {
        const this_ = this;
        const { langDir = 'lang' } = merge(defaults, payload);
        let locale = this_.$options.$vlidator.getDefaultLang();
        if (this_.$i18n) {
          locale = this_.$i18n.locale;
        }
        const vlidator = this_.$options.vlidator;
        const {
          messages: vMessage,
          attributes: vAttributes,
          rules = {}
        } = vlidator
        const input = getData({ rules, data: this_.$data });
        const { attributes = {}, messages = {} } = await this.loadLanguageAsync(langDir, locale);
        Object.assign(defaults, { locale, ...vlidator, input, customAttributes: attributes, customMessages: messages });
        const options = {
          locale,
          rules,
          input,
          confirmedReverse: false,
          customMessages: { ...messages, ...vMessage },
          customAttributes: { ...attributes, ...vAttributes },
        }
        const validator = new Validator(options);
        if (validator.passes()) {
          return Promise.resolve({ data: input });
        }
        this_.$options.$vlidator = validator;
        if (!isUndefined(this_.$errors) && isFunction(this_.$errors.fill)) {
          const errors = validator.errors.all() || {};
          this_.$errors.fill(errors);
        }
        return Promise.reject({ errors: validator.errors.all() });
      },
      loadLanguageAsync (langDir, locale) {
        try {
          const langFileModule = require('~/lang/' + locale);
          const { attributes = {}, messages = {} } = langFileModule.default || langFileModule;
          return { attributes, messages };
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    }
  });
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

export default { install };
export { Validator };
