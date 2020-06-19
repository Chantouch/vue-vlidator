import { parseISO, isValid } from 'date-fns';

const leapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
const isValidDate = (inDate) => {
  if (inDate instanceof Date) {
    return !isNaN(inDate);
  }
  // reformat if supplied as mm.dd.yyyy (period delimiter)
  if (typeof inDate === 'string') {
    const pos = inDate.indexOf('.');
    if (pos > 0 && pos <= 6) {
      inDate = inDate.replace(/\./g, '-');
    }
    if (inDate.length === 10) {
      return isValid(parseISO(inDate));
    }
  }
  const testDate = new Date(inDate);
  const yr = testDate.getFullYear();
  const mo = testDate.getMonth();
  const day = testDate.getDate();
  const daysInMonth = [31, leapYear(yr) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (yr < 1000) {
    return false;
  }
  if (isNaN(mo)) {
    return false;
  }
  if (mo + 1 > 12) {
    return false;
  }
  if (isNaN(day)) {
    return false;
  }
  return day <= daysInMonth[mo];
};

const rules = {
  required (val) {
    let str;
    if (val === undefined || val === null) {
      return false;
    }
    str = String(val).replace(/\s/g, '');
    return str.length > 0;
  },
  required_if (val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) === req[1]) {
      return this.validator.getRule('required').validate(val);
    }
    return true;
  },
  required_unless (val, req, attribute) {
    req = this.getParameters();
    if (this.validator._objectPath(this.validator.input, req[0]) !== req[1]) {
      return this.validator.getRule('required').validate(val);
    }
    return true;
  },
  required_with (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return this.validator.getRule('required').validate(val);
    }
    return true;
  },
  required_with_all (val, req, attribute) {
    req = this.getParameters();
    for (let i = 0; i < req.length; i++) {
      if (!this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }
    return this.validator.getRule('required').validate(val);
  },
  required_without (val, req, attribute) {
    if (this.validator._objectPath(this.validator.input, req)) {
      return true;
    }
    return this.validator.getRule('required').validate(val);
  },
  required_without_all (val, req, attribute) {
    req = this.getParameters();
    for (let i = 0; i < req.length; i++) {
      if (this.validator._objectPath(this.validator.input, req[i])) {
        return true;
      }
    }
    return this.validator.getRule('required').validate(val);
  },
  boolean (val) {
    return (
      val === true ||
      val === false ||
      val === 0 ||
      val === 1 ||
      val === '0' ||
      val === '1' ||
      val === 'true' ||
      val === 'false'
    );
  },
  // compares the size of strings
  // with numbers, compares the value
  size (val, req, attribute) {
    if (val) {
      req = parseFloat(req);
      const size = this.getSize();
      return size === req;
    }
    return true;
  },
  string (val, req, attribute) {
    return typeof val === 'string';
  },
  sometimes (val) {
    return true;
  },
  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  min (val, req, attribute) {
    const size = this.getSize();
    return size >= req;
  },
  /**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */
  max (val, req, attribute) {
    const size = this.getSize();
    return size <= req;
  },
  between (val, req, attribute) {
    req = this.getParameters();
    const size = this.getSize();
    const min = parseFloat(req[0], 10);
    const max = parseFloat(req[1], 10);
    return size >= min && size <= max;
  },
  email (val) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val);
  },
  numeric (val) {
    let num;
    num = Number(val); // tries to convert value to a number. useful if value is coming from form element
    return typeof num === 'number' && !isNaN(num) && typeof val !== 'boolean';
  },
  array (val) {
    return val instanceof Array;
  },
  url (url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(url);
  },
  alpha (val) {
    return /^[a-zA-Z]+$/.test(val);
  },
  alpha_dash (val) {
    return /^[a-zA-Z0-9_\-]+$/.test(val);
  },
  alpha_num (val) {
    return /^[a-zA-Z0-9]+$/.test(val);
  },
  same (val, req) {
    const val1 = this.validator._flattenObject(this.validator.input)[req];
    return val1 === val;
  },
  different (val, req) {
    const val1 = this.validator._flattenObject(this.validator.input)[req];
    return val1 !== val;
  },
  in (val, req) {
    let list, i;
    if (val) {
      list = this.getParameters();
    }
    if (val && !(val instanceof Array)) {
      let localValue = val;
      for (i = 0; i < list.length; i++) {
        if (typeof list[i] === 'string') {
          localValue = String(val);
        }
        if (localValue === list[i]) {
          return true;
        }
      }
      return false;
    }
    if (val && val instanceof Array) {
      for (i = 0; i < val.length; i++) {
        if (list.indexOf(val[i]) < 0) {
          return false;
        }
      }
    }
    return true;
  },
  not_in (val, req) {
    const list = this.getParameters();
    const len = list.length;
    let returnVal = true;
    for (let i = 0; i < len; i++) {
      let localValue = val;
      if (typeof list[i] === 'string') {
        localValue = String(val);
      }
      if (localValue === list[i]) {
        returnVal = false;
        break;
      }
    }
    return returnVal;
  },
  accepted (val) {
    return val === 'on' || val === 'yes' || val === 1 || val === '1' || val === true;
  },
  confirmed (val, req, key) {
    const confirmedKey = key + '_confirmation';
    return this.validator.input[confirmedKey] === val;
  },
  integer (val) {
    return String(parseInt(val, 10)) === String(val);
  },
  digits (val, req) {
    const numericRule = this.validator.getRule('numeric');
    return numericRule.validate(val) && String(val).length === parseInt(req);
  },
  digits_between (val) {
    const numericRule = this.validator.getRule('numeric');
    const req = this.getParameters();
    const valueDigitsCount = String(val).length;
    const min = parseFloat(req[0], 10);
    const max = parseFloat(req[1], 10);
    return numericRule.validate(val) && valueDigitsCount >= min && valueDigitsCount <= max;
  },
  regex (val, req) {
    const mod = /[g|i|m]{1,3}$/;
    let flag = req.match(mod);
    flag = flag ? flag[0] : '';
    req = req.replace(mod, '').slice(1, -1);
    req = new RegExp(req, flag);
    return !!req.test(val);
  },
  date (val, format) {
    return isValidDate(val);
  },
  present (val) {
    return typeof val !== 'undefined';
  },
  after (val, req) {
    const val1 = this.validator.input[req];
    const val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    return new Date(val1).getTime() < new Date(val2).getTime();
  },
  after_or_equal (val, req) {
    const val1 = this.validator.input[req];
    const val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    return new Date(val1).getTime() <= new Date(val2).getTime();
  },
  before (val, req) {
    const val1 = this.validator.input[req];
    const val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    return new Date(val1).getTime() > new Date(val2).getTime();
  },
  before_or_equal (val, req) {
    const val1 = this.validator.input[req];
    const val2 = val;
    if (!isValidDate(val1)) {
      return false;
    }
    if (!isValidDate(val2)) {
      return false;
    }
    return new Date(val1).getTime() >= new Date(val2).getTime();
  },
  hex (val) {
    return /^[0-9a-f]+$/i.test(val);
  }
};
let missedRuleValidator = () => {
  throw new Error('Validator `' + this.name + '` is not defined!');
};
let missedRuleMessage;

class Rules {
  constructor (name, fn, async) {
    this.name = name;
    this.fn = fn;
    this.passes = null;
    this._customMessage = undefined;
    this.async = async;
  }

  /**
   * Validate rule
   *
   * @param  {any|void} inputValue
   * @param  {any|void} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {void|boolean}
   */
  validate(inputValue, ruleValue = null, attribute = '', callback = null) {
    const _this = this;
    this._setValidatingData(attribute, inputValue, ruleValue);
    if (typeof callback === 'function') {
      this.callback = callback;
      const handleResponse = function (passes, message) {
        _this.response(passes, message);
      };
      if (this.async) {
        return this._apply(inputValue, ruleValue, attribute, handleResponse);
      } else {
        return handleResponse(this._apply(inputValue, ruleValue, attribute));
      }
    }
    return this._apply(inputValue, ruleValue, attribute);
  }

  /**
   * Apply validation function
   *
   * @param  {mixed} inputValue
   * @param  {mixed} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */
  _apply(inputValue, ruleValue, attribute, callback = null) {
    const fn = this.isMissed() ? missedRuleValidator : this.fn;
    return fn.apply(this, [inputValue, ruleValue, attribute, callback]);
  }

  /**
   * Set validating data
   *
   * @param {string} attribute
   * @param {any|void} inputValue
   * @param {any|void} ruleValue
   * @return {void}
   */
  _setValidatingData(attribute, inputValue, ruleValue) {
    this.attribute = attribute;
    this.inputValue = inputValue;
    this.ruleValue = ruleValue;
  }

  /**
   * Get parameters
   *
   * @return {array}
   */
  getParameters() {
    let value = [];
    if (typeof this.ruleValue === 'string') {
      value = this.ruleValue.split(',');
    }
    if (typeof this.ruleValue === 'number') {
      value.push(this.ruleValue);
    }
    if (this.ruleValue instanceof Array) {
      value = this.ruleValue;
    }
    return value;
  }

  /**
   * Get true size of value
   *
   * @return {integer|float|mixed|number}
   */
  getSize() {
    const value = this.inputValue;
    if (value instanceof Array) {
      return value.length;
    }
    if (typeof value === 'number') {
      return value;
    }
    if (this.validator._hasNumericRule(this.attribute)) {
      return parseFloat(value, 10);
    }
    return value.length;
  }

  /**
   * Get the type of value being checked; numeric or string.
   *
   * @return {string}
   */
  _getValueType() {
    if (typeof this.inputValue === 'number' || this.validator._hasNumericRule(this.attribute)) {
      return 'numeric';
    }
    return 'string';
  }

  /**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */
  response(passes, message) {
    this.passes = passes === undefined || passes === true;
    this._customMessage = message;
    this.callback(this.passes, message);
  }

  /**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */
  setValidator(validator) {
    this.validator = validator;
  }

  /**
   * Check if rule is missed
   *
   * @return {boolean}
   */
  isMissed() {
    return typeof this.fn !== 'function';
  }
  get customMessage() {
    return this.isMissed() ? missedRuleMessage : this._customMessage;
  }
}

export const manager = {
  /**
   * List of async rule names
   *
   * @type {Array}
   */
  asyncRules: [],

  /**
   * Implicit rules (rules to always validate)
   *
   * @type {Array}
   */
  implicitRules: [
    'required',
    'required_if',
    'required_unless',
    'required_with',
    'required_with_all',
    'required_without',
    'required_without_all',
    'accepted',
    'present'
  ],

  /**
   * Get rule by name
   *
   * @param  {string} name
   * @param validator
   * @return {Rules}
   */
  make(name, validator) {
    const async = this.isAsync(name);
    const rule = new Rules(name, rules[name], async);
    rule.setValidator(validator);
    return rule;
  },

  /**
   * Determine if given rule is async
   *
   * @param  {string}  name
   * @return {boolean}
   */
  isAsync(name) {
    let i = 0, len = this.asyncRules.length;
    for (; i < len; i++) {
      if (this.asyncRules[i] === name) {
        return true;
      }
    }
    return false;
  },

  /**
   * Determine if rule is implicit (should always validate)
   *
   * @param {string} name
   * @return {boolean}
   */
  isImplicit(name) {
    return this.implicitRules.indexOf(name) > -1;
  },

  /**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  register(name, fn) {
    rules[name] = fn;
  },

  /**
   * Register new implicit rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerImplicit(name, fn) {
    this.register(name, fn);
    this.implicitRules.push(name);
  },

  /**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsync(name, fn) {
    this.register(name, fn);
    this.asyncRules.push(name);
  },

  /**
   * Register implicit async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */
  registerAsyncImplicit(name, fn) {
    this.registerImplicit(name, fn);
    this.asyncRules.push(name);
  },

  registerMissedRuleValidator(fn, message) {
    missedRuleValidator = fn;
    missedRuleMessage = message;
  }
};

export default manager;
