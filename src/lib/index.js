import Errors from './errors';
import Rules from './rules';
import Lang from './lang';
import Attributes from './attributes';
import AsyncResolvers  from './async';
import { isObject, isString, isUndefined, isFunction, isNull, get } from 'lodash';
import flatten from './flatten';

const numericRules = ['integer', 'numeric'];

export default class Validator {
  constructor (options = {}) {
    const defaults = {
      accessorName: '$vlidator',
      input: {},
      rules: {},
      locale: 'en',
      customMessages: {},
      customAttributes: {}
    };
    this.options = {
      ...defaults,
      ...options
    };
    const {
      input = {},
      locale,
      customMessages,
      customAttributes,
      rules
    } = this.options;
    this.input = input;
    this.messages = Lang._make(locale);
    this.messages._setCustom(customMessages);
    this.setAttributeNames(customAttributes);
    this.setAttributeFormatter(this.attributeFormatter());
    this.errors = new Errors();
    this.errorCount = 0;
    this.hasAsync = false;
    this.rules = this._parseRules(rules);
    this.locale = locale;
  }

  /**
   * Default language
   *
   * @type {string}
   */
  getLang() {
    return this.locale;
  }

  /**
   * Default language
   *
   * @type {string}
   */
  setLang(lang) {
    this.locale = lang;
  }

  /**
   * Attribute formatter.
   *
   * @type {function}
   */
  attributeFormatter() {
    return Attributes.formatter;
  }

  /**
   * Run validator
   *
   * @return {boolean} Whether it passes; true = passes, false = fails
   */
  check () {
    const self = this;
    for (const attribute in self.rules) {
      const attributeRules = self.rules[attribute];
      const inputValue = self._objectPath(self.input, attribute);
      if (self._hasRule(attribute, ['sometimes']) && !self._suppliedWithData(attribute)) {
        continue;
      }
      let i = 0, len = attributeRules.length, rule, ruleOptions, rulePassed;
      for (; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = self.getRule(ruleOptions.name);
        if (!self._isValidatable(rule, inputValue)) {
          continue;
        }
        rulePassed = rule.validate(inputValue, ruleOptions.value, attribute);
        if (!rulePassed) {
          self._addFailure(rule);
        }
        if (self._shouldStopValidating(attribute, rulePassed)) {
          break;
        }
      }
    }
    return this.errorCount === 0;
  }
  /**
   * Run async validator
   *
   * @param {function} passes
   * @param {function} fails
   * @return {void}
   */
  checkAsync (passes, fails = undefined) {
    const _this = this;
    passes = passes || function () {};
    fails = fails || function () {};
    const failsOne = function (rule, message) {
      _this._addFailure(rule, message);
    };
    const resolvedAll = function (allPassed) {
      if (allPassed) {
        passes();
      } else {
        fails();
      }
    };
    const asyncResolvers = new AsyncResolvers(failsOne, resolvedAll);
    const validateRule = function (inputValue, ruleOptions, attribute, rule) {
      return function () {
        const resolverIndex = asyncResolvers.add(rule);
        rule.validate(inputValue, ruleOptions.value, attribute, function () {
          asyncResolvers.resolve(resolverIndex);
        });
      };
    };
    for (const attribute in this.rules) {
      const attributeRules = this.rules[attribute];
      const inputValue = this._objectPath(this.input, attribute);
      if (this._hasRule(attribute, ['sometimes']) && !this._suppliedWithData(attribute)) {
        continue;
      }
      let i = 0, len = attributeRules.length, rule, ruleOptions;
      for (; i < len; i++) {
        ruleOptions = attributeRules[i];
        rule = this.getRule(ruleOptions.name);
        if (!this._isValidatable(rule, inputValue)) {
          continue;
        }
        validateRule(inputValue, ruleOptions, attribute, rule)();
      }
    }
    asyncResolvers.enableFiring();
    asyncResolvers.fire();
  }
  /**
   * Add failure and error message for given rule
   *
   * @param {Rules} rule
   * @param message
   */
  _addFailure (rule, message = null) {
    const msg = this.messages.render(rule);
    this.errors.add(rule.attribute, msg);
    this.errorCount++;
  }
  /**
   * Flatten nested object, normalizing { foo: { bar: 1 } } into: { 'foo.bar': 1 }
   *
   * @return {object} flattened object
   * @param obj
   */
  _flattenObject (obj) {
    return flatten(obj);
  }
  /**
   * Extract value from nested object using string path with dot notation
   *
   * @param obj
   * @param  {string} path inside object
   * @return {any|void} value under the path
   */
  _objectPath (obj, path) {
    if (Object.prototype.hasOwnProperty.call(obj, path)) {
      return obj[path];
    }
    const keys = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
    let copy = {};
    for (const attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        copy[attr] = obj[attr];
      }
    }
    let i = 0, l = keys.length;
    for (; i < l; i++) {
      if (isObject(copy) && !isNull(copy) && Object.hasOwnProperty.call(copy, keys[i])) {
        copy = copy[keys[i]];
      } else {
        return;
      }
    }
    return copy;
  }
  /**
   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
   *
   * @param  {object} rules
   * @return {object}
   */
  _parseRules (rules) {
    const parsedRules = {};
    rules = this._flattenObject(rules);
    for (const attribute in rules) {
      const rulesArray = rules[attribute];
      this._parseRulesCheck(attribute, rulesArray, parsedRules);
    }
    return parsedRules;
  }
  _parseRulesCheck (attribute, rulesArray, parsedRules, wildCardValues) {
    if (attribute.indexOf('*') > -1) {
      this._parsedRulesRecurse(attribute, rulesArray, parsedRules, wildCardValues);
    } else {
      this._parseRulesDefault(attribute, rulesArray, parsedRules, wildCardValues);
    }
  }
  _parsedRulesRecurse (attribute, rulesArray, parsedRules, wildCardValues) {
    const parentPath = attribute.substr(0, attribute.indexOf('*') - 1);
    const propertyValue = this._objectPath(this.input, parentPath);
    if (propertyValue) {
      for (let propertyNumber = 0; propertyNumber < propertyValue.length; propertyNumber++) {
        const workingValues = wildCardValues ? wildCardValues.slice() : [];
        workingValues.push(propertyNumber);
        this._parseRulesCheck(attribute.replace('*', propertyNumber), rulesArray, parsedRules, workingValues);
      }
    }
  }
  _parseRulesDefault (attribute, rulesArray, parsedRules, wildCardValues) {
    const attributeRules = [];
    if (rulesArray instanceof Array) {
      rulesArray = this._prepareRulesArray(rulesArray);
    }
    if (isString(rulesArray)) {
      rulesArray = rulesArray.split('|');
    }
    let i = 0, len = rulesArray.length, rule;
    for (; i < len; i++) {
      rule = isString(rulesArray[i]) ? this._extractRuleAndRuleValue(rulesArray[i]) : rulesArray[i];
      if (rule.value) {
        rule.value = this._replaceWildCards(rule.value, wildCardValues);
        this._replaceWildCardsMessages(wildCardValues);
      }
      if (Rules.isAsync(rule.name)) {
        this.hasAsync = true;
      }
      attributeRules.push(rule);
    }
    parsedRules[attribute] = attributeRules;
  }
  _replaceWildCards (path, nums) {
    if (!nums) {
      return path;
    }
    let path2 = path;
    nums.forEach(function (value) {
      if(Array.isArray(path2)){
        path2 = path2[0];
      }
      const pos = path2.indexOf('*');
      if (pos === -1) {
        return path2;
      }
      path2 = path2.substr(0, pos) + value + path2.substr(pos + 1);
    });
    if(Array.isArray(path)){
      path[0] = path2;
      path2 = path;
    }
    return path2;
  }
  _replaceWildCardsMessages (nums) {
    const customMessages = this.messages.customMessages;
    const self = this;
    Object.keys(customMessages).forEach(function (key) {
      if (nums) {
        const newKey = self._replaceWildCards(key, nums);
        customMessages[newKey] = customMessages[key];
      }
    });
    this.messages._setCustom(customMessages);
  }
  /**
   * Prepare rules if it comes in Array. Check for objects. Need for type validation.
   *
   * @param  {array} rulesArray
   * @return {array}
   */
  _prepareRulesArray (rulesArray) {
    const rules = [];
    let i = 0, len = rulesArray.length;
    for (; i < len; i++) {
      if (isObject(rulesArray[i])) {
        for (const rule in rulesArray[i]) {
          rules.push({
            name: rule,
            value: rulesArray[i][rule]
          });
        }
      } else {
        rules.push(rulesArray[i]);
      }
    }
    return rules;
  }
  /**
   * Determines if the attribute is supplied with the original data object.
   *
   * @param  {string} attribute
   * @return {boolean}
   */
  _suppliedWithData (attribute) {
    return this.input.hasOwnProperty(attribute);
  }
  /**
   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
   *
   * @param  {string} ruleString min:3
   * @return {object} object containing the name of the rule and value
   */
  _extractRuleAndRuleValue (ruleString) {
    const rule = {};
    let ruleArray;
    rule.name = ruleString;
    if (ruleString.indexOf(':') >= 0) {
      ruleArray = ruleString.split(':');
      rule.name = ruleArray[0];
      rule.value = ruleArray.slice(1).join(':');
    }
    return rule;
  }
  /**
   * Determine if attribute has any of the given rules
   *
   * @param  {string}  attribute
   * @param  {Array}   findRules
   * @return {boolean}
   */
  _hasRule (attribute, findRules = []) {
    const rules = this.rules[attribute] || [];
    let i = 0, len = rules.length;
    for (; i < len; i++) {
      if (findRules.indexOf(rules[i].name) > -1) {
        return true;
      }
    }
    return false;
  }
  /**
   * Determine if attribute has any numeric-based rules.
   *
   * @param  {string}  attribute
   * @return {Boolean}
   */
  _hasNumericRule (attribute) {
    return this._hasRule(attribute, numericRules);
  }
  /**
   * Determine if rule is validatable
   *
   * @param  {Rules}   rule
   * @param  {any|void}  value
   * @return {boolean}
   */
  _isValidatable (rule, value = null) {
    if (Rules.isImplicit(rule.name)) {
      return true;
    }
    return this.getRule('required').validate(value);
  }
  /**
   * Determine if we should stop validating.
   *
   * @param  {string} attribute
   * @param  {boolean} rulePassed
   * @return {boolean}
   */
  _shouldStopValidating (attribute, rulePassed) {
    const stopOnAttributes = this.stopOnAttributes;
    if (isUndefined(stopOnAttributes) || stopOnAttributes === false || rulePassed === true) {
      return false;
    }
    if (stopOnAttributes instanceof Array) {
      return stopOnAttributes.indexOf(attribute) > -1;
    }
    return true;
  }
  /**
   * Set custom attribute names.
   *
   * @param {object} attributes
   * @return {void}
   */
  setAttributeNames (attributes) {
    this.messages._setAttributeNames(attributes);
  }
  /**
   * Set the attribute formatter.
   *
   * @param {function} func
   * @return {void}
   */
  setAttributeFormatter (func) {
    this.messages._setAttributeFormatter(func);
  }
  /**
   * Get validation rule
   *
   * @param  {string} name
   * @return {Rules}
   */
  getRule (name) {
    return Rules.make(name, this);
  }
  /**
   * Stop on first error.
   *
   * @return {void}
   * @param attributes
   */
  stopOnError (attributes) {
    this.stopOnAttributes = attributes;
  }
  /**
   * Determine if validation passes
   *
   * @param {function} passes
   * @return {void|boolean}
   */
  passes (passes = undefined) {
    const async = this._checkAsync('passes', passes);
    if (async) {
      return this.checkAsync(passes);
    }
    return this.check();
  }
  /**
   * Determine if validation fails
   *
   * @param {function} fails
   * @return {boolean|undefined|void}
   */
  fails (fails = undefined) {
    const async = this._checkAsync('fails', fails);
    if (async) {
      return this.checkAsync(function () {}, fails);
    }
    return !this.check();
  }
  /**
   * Check if validation should be called asynchronously
   *
   * @param  {string}   funcName Name of the caller
   * @param  {function} callback
   * @return {boolean}
   */
  _checkAsync (funcName, callback) {
    const hasCallback = isFunction(callback);
    if (this.hasAsync && !hasCallback) {
      throw funcName + ' expects a callback when async rules are being tested.';
    }
    return this.hasAsync || hasCallback;
  }
  /**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} messages
   * @return {this}
   */
  setMessages (lang, messages) {
    Lang._set(lang, messages);
    return this;
  }
  /**
   * Get messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */
  getMessages (lang) {
    return Lang._get(lang);
  }
  /**
   * Set default language to use
   *
   * @param {string} lang
   * @return {void}
   */
  useLang (lang) {
    this.locale = lang;
  }
  /**
   * Get default language
   *
   * @return {string}
   */
  getDefaultLang () {
    return this.locale;
  }
  /**
   * Register custom validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */
  register (name, fn, message) {
    const lang = this.getDefaultLang();
    Rules.register(name, fn);
    Lang._setRuleMessage(lang, name, message);
  }
  /**
   * Register custom validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */
  registerImplicit (name, fn, message) {
    const lang = this.getDefaultLang();
    Rules.registerImplicit(name, fn);
    Lang._setRuleMessage(lang, name, message);
  }
  /**
   * Register asynchronous validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */
  registerAsync (name, fn, message) {
    const lang = this.getDefaultLang();
    Rules.registerAsync(name, fn);
    Lang._setRuleMessage(lang, name, message);
  }
  /**
   * Register asynchronous validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */
  registerAsyncImplicit (name, fn, message) {
    const lang = this.getDefaultLang();
    Rules.registerAsyncImplicit(name, fn);
    Lang._setRuleMessage(lang, name, message);
  }
  /**
   * Register validator for missed validation rule
   *
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */
  registerMissedRuleValidator (fn, message) {
    Rules.registerMissedRuleValidator(fn, message);
  }
}

export function install (Vue, options = {}) {
  const defaults = {
    locale: 'en',
    input: {},
    rules: {},
    customMessages: {},
    customAttributes: {},
    ...options
  };
  Vue.mixin({
    beforeCreate () {
      this.$options.$vlidator = {};
      const input = this.$data || {};
      Object.assign(defaults, { input });
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
      const vlidator = this_.$options.vlidator;
      let locale = this_.$options.$vlidator.getDefaultLang();
      if (vlidator && vlidator.rules) {
        const { rules = {} } = vlidator;
        Object.entries(flatten(this_.$data)).forEach(([path, _]) => {
          let validations = get(rules, path);
          if (validations !== undefined) {
            this_.$watch(path, () => {
              this_.validate({ locale });
            });
          }
        });
      }
    },
    methods: {
      validate () {
        const this_ = this;
        let locale = this_.$options.$vlidator.getDefaultLang();
        const vlidator = this_.$options.vlidator;
        const { rules = {} } = vlidator;
        const input = getData({ rules, data: this_.$data });
        Object.assign(defaults, { locale, ...vlidator, input });
        const validator = new Validator(defaults);
        validator.check();
        this_.$options.$vlidator = validator;
        if (!isUndefined(this_.$errors) && isFunction(this_.$errors.fill)) {
          const errors = validator.errors.all() || {};
          this_.$errors.fill(errors);
        }
      }
    },
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

Validator.install = install;

const validator = new Validator();

export { validator as Validator };
