'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.manager=void 0;var _createClass=function(){function defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(a,b,c){return b&&defineProperties(a.prototype,b),c&&defineProperties(a,c),a}}(),_dateFns=require('date-fns'),_lodash=require('lodash');function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var leapYear=function leapYear(a){return 0==a%4&&0!=a%100||0==a%400},isValidDate=function isValidDate(a){if(a instanceof Date)return!(0,_lodash.isNaN)(a);// reformat if supplied as mm.dd.yyyy (period delimiter)
if((0,_lodash.isString)(a)){var g=a.indexOf('.');if(0<g&&6>=g&&(a=a.replace(/\./g,'-')),10===a.length)return(0,_dateFns.isValid)((0,_dateFns.parseISO)(a))}var b=new Date(a),c=b.getFullYear(),d=b.getMonth(),e=b.getDate(),f=[31,leapYear(c)?29:28,31,30,31,30,31,31,30,31,30,31];return!(1e3>c)&&!(0,_lodash.isNaN)(d)&&!(12<d+1)&&!(0,_lodash.isNaN)(e)&&e<=f[d]},rules={required:function required(a){var b;return void 0!==a&&null!==a&&(b=(a+'').replace(/\s/g,''),0<b.length)},required_if:function required_if(a,b){return b=this.getParameters(),this.validator._objectPath(this.validator.input,b[0])!==b[1]||this.validator.getRule('required').validate(a)},required_unless:function required_unless(a,b){return b=this.getParameters(),this.validator._objectPath(this.validator.input,b[0])===b[1]||this.validator.getRule('required').validate(a)},required_with:function required_with(a,b){return!this.validator._objectPath(this.validator.input,b)||this.validator.getRule('required').validate(a)},required_with_all:function required_with_all(a,b){b=this.getParameters();for(var c=0;c<b.length;c++)if(!this.validator._objectPath(this.validator.input,b[c]))return!0;return this.validator.getRule('required').validate(a)},required_without:function required_without(a,b){return!!this.validator._objectPath(this.validator.input,b)||this.validator.getRule('required').validate(a)},required_without_all:function required_without_all(a,b){b=this.getParameters();for(var c=0;c<b.length;c++)if(this.validator._objectPath(this.validator.input,b[c]))return!0;return this.validator.getRule('required').validate(a)},boolean:function boolean(a){return!0===a||!1===a||0===a||1===a||'0'===a||'1'===a||'true'===a||'false'===a},// compares the size of strings
// with numbers, compares the value
size:function size(a,b){if(a){b=parseFloat(b);var c=this.getSize();return c===b}return!0},string:function string(a){return(0,_lodash.isString)(a)},sometimes:function sometimes(){return!0},/**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */min:function min(a,b){var c=this.getSize();return c>=b},/**
   * Compares the size of strings or the value of numbers if there is a truthy value
   */max:function max(a,b){var c=this.getSize();return c<=b},between:function between(a,b){b=this.getParameters();var c=this.getSize(),d=parseFloat(b[0],10),e=parseFloat(b[1],10);return c>=d&&c<=e},email:function email(a){var b=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return b.test(a)},numeric:function numeric(a){var b;// tries to convert value to a number. useful if value is coming from form element
return b=+a,(0,_lodash.isNumber)(b)&&!(0,_lodash.isNaN)(b)&&!(0,_lodash.isBoolean)(_lodash.isBoolean)},array:function array(a){return a instanceof Array},url:function url(a){return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_\+.~#?&/=]*)/i.test(a)},alpha:function alpha(a){return /^[a-zA-Z]+$/.test(a)},alpha_dash:function alpha_dash(a){return /^[a-zA-Z0-9_\-]+$/.test(a)},alpha_num:function alpha_num(a){return /^[a-zA-Z0-9]+$/.test(a)},same:function same(a,b){var c=this.validator._flattenObject(this.validator.input)[b];return c===a},different:function different(a,b){var c=this.validator._flattenObject(this.validator.input)[b];return c!==a},in:function _in(a){var b,c;if(a&&(b=this.getParameters()),a&&!(a instanceof Array)){var d=a;for(c=0;c<b.length;c++)if((0,_lodash.isString)(b[c])&&(d=a+''),d===b[c])return!0;return!1}if(a&&a instanceof Array)for(c=0;c<a.length;c++)if(0>b.indexOf(a[c]))return!1;return!0},not_in:function not_in(a){for(var b,c=this.getParameters(),d=c.length,e=!0,f=0;f<d;f++)if(b=a,(0,_lodash.isString)(c[f])&&(b=a+''),b===c[f]){e=!1;break}return e},accepted:function accepted(a){return'on'===a||'yes'===a||1===a||'1'===a||!0===a},confirmed:function confirmed(a,b,c){return this.validator.input[c+'_confirmation']===a},integer:function integer(a){return parseInt(a,10)+''===a+''},digits:function digits(a,b){var c=this.validator.getRule('numeric');return c.validate(a)&&(a+'').length===parseInt(b)},digits_between:function digits_between(a){var b=this.validator.getRule('numeric'),c=this.getParameters(),d=(a+'').length,e=parseFloat(c[0],10),f=parseFloat(c[1],10);return b.validate(a)&&d>=e&&d<=f},regex:function regex(a,b){var c=/[g|i|m]{1,3}$/,d=b.match(c);return d=d?d[0]:'',b=b.replace(c,'').slice(1,-1),b=new RegExp(b,d),!!b.test(a)},date:function date(a){return isValidDate(a)},present:function present(a){return!(0,_lodash.isUndefined)(a)},after:function after(a,b){var c=this.validator.input[b],d=a;return!!isValidDate(c)&&!!isValidDate(d)&&new Date(c).getTime()<new Date(d).getTime()},after_or_equal:function after_or_equal(a,b){var c=this.validator.input[b],d=a;return!!isValidDate(c)&&!!isValidDate(d)&&new Date(c).getTime()<=new Date(d).getTime()},before:function before(a,b){var c=this.validator.input[b],d=a;return!!isValidDate(c)&&!!isValidDate(d)&&new Date(c).getTime()>new Date(d).getTime()},before_or_equal:function before_or_equal(a,b){var c=this.validator.input[b],d=a;return!!isValidDate(c)&&!!isValidDate(d)&&new Date(c).getTime()>=new Date(d).getTime()},hex:function hex(a){return /^[0-9a-f]+$/i.test(a)},password:function password(a){return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(a)}},missedRuleValidator=function missedRuleValidator(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:null;throw new Error('Validator `'+a+'` is not defined!')},missedRuleMessage=void 0,Rules=function(){function Rules(a,b,c){_classCallCheck(this,Rules),this.name=a,this.fn=b,this.passes=null,this._customMessage=void 0,this.async=c}/**
   * Validate rule
   *
   * @param  {any|void} inputValue
   * @param  {any|void} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {void|boolean}
   */return _createClass(Rules,[{key:'validate',value:function validate(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:'',d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,e=this;if(this._setValidatingData(c,a,b),(0,_lodash.isFunction)(d)){this.callback=d;var f=function f(a,b){e.response(a,b)};return this.async?this._apply(a,b,c,f):f(this._apply(a,b,c))}return this._apply(a,b,c)}/**
   * Apply validation function
   *
   * @param  {any|void} inputValue
   * @param  {any|void} ruleValue
   * @param  {string} attribute
   * @param  {function} callback
   * @return {boolean|undefined}
   */},{key:'_apply',value:function _apply(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,e=this.isMissed()?missedRuleValidator(this.name):this.fn;return e.apply(this,[a,b,c,d])}/**
   * Set validating data
   *
   * @param {string} attribute
   * @param {any|void} inputValue
   * @param {any|void} ruleValue
   * @return {void}
   */},{key:'_setValidatingData',value:function _setValidatingData(a,b,c){this.attribute=a,this.inputValue=b,this.ruleValue=c}/**
   * Get parameters
   *
   * @return {array}
   */},{key:'getParameters',value:function getParameters(){var a=[];return(0,_lodash.isString)(this.ruleValue)&&(a=this.ruleValue.split(',')),(0,_lodash.isNumber)(this.ruleValue)&&a.push(this.ruleValue),this.ruleValue instanceof Array&&(a=this.ruleValue),a}/**
   * Get true size of value
   *
   * @return {any|integer|float|mixed|number}
   */},{key:'getSize',value:function getSize(){var a=this.inputValue;return a instanceof Array?a.length:(0,_lodash.isNumber)(a)?a:this.validator._hasNumericRule(this.attribute)?parseFloat(a,10):a.length}/**
   * Get the type of value being checked; numeric or string.
   *
   * @return {string}
   */},{key:'_getValueType',value:function _getValueType(){return(0,_lodash.isNumber)(this.inputValue)||this.validator._hasNumericRule(this.attribute)?'numeric':'string'}/**
   * Set the async callback response
   *
   * @param  {boolean|undefined} passes  Whether validation passed
   * @param  {string|undefined} message Custom error message
   * @return {void}
   */},{key:'response',value:function response(a,b){this.passes=void 0===a||!0===a,this._customMessage=b,this.callback(this.passes,b)}/**
   * Set validator instance
   *
   * @param {Validator} validator
   * @return {void}
   */},{key:'setValidator',value:function setValidator(a){this.validator=a}/**
   * Check if rule is missed
   *
   * @return {boolean}
   */},{key:'isMissed',value:function isMissed(){return!(0,_lodash.isFunction)(this.fn)}},{key:'customMessage',get:function get(){return this.isMissed()?missedRuleMessage:this._customMessage}}]),Rules}(),manager=exports.manager={/**
   * List of async rule names
   *
   * @type {Array}
   */asyncRules:[],/**
   * Implicit rules (rules to always validate)
   *
   * @type {Array}
   */implicitRules:['required','required_if','required_unless','required_with','required_with_all','required_without','required_without_all','accepted','present'],/**
   * Get rule by name
   *
   * @param  {string} name
   * @param validator
   * @return {Rules}
   */make:function make(a,b){var c=this.isAsync(a),d=new Rules(a,rules[a],c);return d.setValidator(b),d},/**
   * Determine if given rule is async
   *
   * @param  {string}  name
   * @return {boolean}
   */isAsync:function isAsync(a){for(var b=0,c=this.asyncRules.length;b<c;b++)if(this.asyncRules[b]===a)return!0;return!1},/**
   * Determine if rule is implicit (should always validate)
   *
   * @param {string} name
   * @return {boolean}
   */isImplicit:function isImplicit(a){return-1<this.implicitRules.indexOf(a)},/**
   * Register new rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */register:function register(a,b){rules[a]=b},/**
   * Register new implicit rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */registerImplicit:function registerImplicit(a,b){this.register(a,b),this.implicitRules.push(a)},/**
   * Register async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */registerAsync:function registerAsync(a,b){this.register(a,b),this.asyncRules.push(a)},/**
   * Register implicit async rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @return {void}
   */registerAsyncImplicit:function registerAsyncImplicit(a,b){this.registerImplicit(a,b),this.asyncRules.push(a)},registerMissedRuleValidator:function registerMissedRuleValidator(a,b){missedRuleValidator=a,missedRuleMessage=b}};exports.default=manager;