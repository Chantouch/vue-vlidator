'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _createClass=function(){function defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(a,b,c){return b&&defineProperties(a.prototype,b),c&&defineProperties(a,c),a}}(),_errors=require('./errors'),_errors2=_interopRequireDefault(_errors),_rules=require('./rules'),_rules2=_interopRequireDefault(_rules),_lang=require('./lang'),_lang2=_interopRequireDefault(_lang),_attributes=require('./attributes'),_attributes2=_interopRequireDefault(_attributes),_async=require('./async'),_async2=_interopRequireDefault(_async),_lodash=require('lodash'),_flatten=require('./flatten'),_flatten2=_interopRequireDefault(_flatten);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var numericRules=['integer','numeric'],Validator=function(){/**
   * The constructor of validator
   * @param input
   * @param {Object} rules
   * @param {Object} customMessages
   * @param {string} locale
   */function Validator(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:'en',d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};_classCallCheck(this,Validator),this.input=a||{},this.messages=_lang2.default._make(c),this.messages._setCustom(d),this.setAttributeFormatter(this.attributeFormatter()),this.errors=new _errors2.default,this.errorCount=0,this.hasAsync=!1,this.rules=this._parseRules(b),this.locale=c}/**
   * Default language
   *
   * @type {string}
   */return _createClass(Validator,[{key:'attributeFormatter',/**
   * Attribute formatter.
   *
   * @type {function}
   */value:function attributeFormatter(){return _attributes2.default.formatter}/**
   * Run validator
   *
   * @return {boolean} Whether it passes; true = passes, false = fails
   */},{key:'check',value:function check(){var a=this;for(var d in a.rules){var b=a.rules[d],c=a._objectPath(a.input,d);if(!a._hasRule(d,['sometimes'])||a._suppliedWithData(d))for(var e=0,f=b.length,g=void 0,h=void 0,i=void 0;e<f&&!((h=b[e],g=a.getRule(h.name),!!a._isValidatable(g,c))&&(i=g.validate(c,h.value,d),i||a._addFailure(g),a._shouldStopValidating(d,i)));e++);}return 0===this.errorCount}/**
   * Run async validator
   *
   * @param {function} passes
   * @param {function} fails
   * @return {void}
   */},{key:'checkAsync',value:function checkAsync(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:void 0,c=this;a=a||function(){},b=b||function(){};var d=function d(c){c?a():b()},e=new _async2.default(function failsOne(a,b){c._addFailure(a,b)},d),f=function f(a,b,c,d){return function(){var f=e.add(d);d.validate(a,b.value,c,function(){e.resolve(f)})}};for(var j in this.rules){var g=this.rules[j],h=this._objectPath(this.input,j);if(!this._hasRule(j,['sometimes'])||this._suppliedWithData(j))for(var k=0,i=g.length,l=void 0,m=void 0;k<i;k++)(m=g[k],l=this.getRule(m.name),!!this._isValidatable(l,h))&&f(h,m,j,l)()}e.enableFiring(),e.fire()}/**
   * Add failure and error message for given rule
   *
   * @param {Rules} rule
   * @param message
   */},{key:'_addFailure',value:function _addFailure(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,c=this.messages.render(a);this.errors.add(a.attribute,c),this.errorCount++}/**
   * Flatten nested object, normalizing { foo: { bar: 1 } } into: { 'foo.bar': 1 }
   *
   * @return {object} flattened object
   * @param obj
   */},{key:'_flattenObject',value:function _flattenObject(a){return(0,_flatten2.default)(a)}/**
   * Extract value from nested object using string path with dot notation
   *
   * @param obj
   * @param  {string} path inside object
   * @return {any|void} value under the path
   */},{key:'_objectPath',value:function _objectPath(a,b){if(Object.prototype.hasOwnProperty.call(a,b))return a[b];var c=b.replace(/\[(\w+)\]/g,'.$1').replace(/^\./,'').split('.'),d={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(d[e]=a[e]);for(var f=0,g=c.length;f<g;f++)if((0,_lodash.isObject)(d)&&!(0,_lodash.isNull)(d)&&Object.hasOwnProperty.call(d,c[f]))d=d[c[f]];else return;return d}/**
   * Parse rules, normalizing format into: { attribute: [{ name: 'age', value: 3 }] }
   *
   * @param  {object} rules
   * @return {object}
   */},{key:'_parseRules',value:function _parseRules(a){var b={};for(var c in a=this._flattenObject(a),a){var d=a[c];this._parseRulesCheck(c,d,b)}return b}},{key:'_parseRulesCheck',value:function _parseRulesCheck(a,b,c,d){-1<a.indexOf('*')?this._parsedRulesRecurse(a,b,c,d):this._parseRulesDefault(a,b,c,d)}},{key:'_parsedRulesRecurse',value:function _parsedRulesRecurse(a,b,c,d){var e=a.substr(0,a.indexOf('*')-1),f=this._objectPath(this.input,e);if(f)for(var g,h=0;h<f.length;h++)g=d?d.slice():[],g.push(h),this._parseRulesCheck(a.replace('*',h),b,c,g)}},{key:'_parseRulesDefault',value:function _parseRulesDefault(a,b,c,d){var e=[];b instanceof Array&&(b=this._prepareRulesArray(b)),(0,_lodash.isString)(b)&&(b=b.split('|'));for(var f,g=0,h=b.length;g<h;g++)f=(0,_lodash.isString)(b[g])?this._extractRuleAndRuleValue(b[g]):b[g],f.value&&(f.value=this._replaceWildCards(f.value,d),this._replaceWildCardsMessages(d)),_rules2.default.isAsync(f.name)&&(this.hasAsync=!0),e.push(f);c[a]=e}},{key:'_replaceWildCards',value:function _replaceWildCards(a,b){if(!b)return a;var c=a;return b.forEach(function(a){Array.isArray(c)&&(c=c[0]);var b=c.indexOf('*');return-1===b?c:void(c=c.substr(0,b)+a+c.substr(b+1))}),Array.isArray(a)&&(a[0]=c,c=a),c}},{key:'_replaceWildCardsMessages',value:function _replaceWildCardsMessages(a){var b=this.messages.customMessages,c=this;Object.keys(b).forEach(function(d){if(a){var e=c._replaceWildCards(d,a);b[e]=b[d]}}),this.messages._setCustom(b)}/**
   * Prepare rules if it comes in Array. Check for objects. Need for type validation.
   *
   * @param  {array} rulesArray
   * @return {array}
   */},{key:'_prepareRulesArray',value:function _prepareRulesArray(a){for(var b=[],c=0,d=a.length;c<d;c++)if((0,_lodash.isObject)(a[c]))for(var e in a[c])b.push({name:e,value:a[c][e]});else b.push(a[c]);return b}/**
   * Determines if the attribute is supplied with the original data object.
   *
   * @param  {string} attribute
   * @return {boolean}
   */},{key:'_suppliedWithData',value:function _suppliedWithData(a){return this.input.hasOwnProperty(a)}/**
   * Extract a rule and a value from a ruleString (i.e. min:3), rule = min, value = 3
   *
   * @param  {string} ruleString min:3
   * @return {object} object containing the name of the rule and value
   */},{key:'_extractRuleAndRuleValue',value:function _extractRuleAndRuleValue(a){var b={},c=void 0;return b.name=a,0<=a.indexOf(':')&&(c=a.split(':'),b.name=c[0],b.value=c.slice(1).join(':')),b}/**
   * Determine if attribute has any of the given rules
   *
   * @param  {string}  attribute
   * @param  {Array}   findRules
   * @return {boolean}
   */},{key:'_hasRule',value:function _hasRule(a){for(var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[],c=this.rules[a]||[],d=0,e=c.length;d<e;d++)if(-1<b.indexOf(c[d].name))return!0;return!1}/**
   * Determine if attribute has any numeric-based rules.
   *
   * @param  {string}  attribute
   * @return {Boolean}
   */},{key:'_hasNumericRule',value:function _hasNumericRule(a){return this._hasRule(a,numericRules)}/**
   * Determine if rule is validatable
   *
   * @param  {Rules}   rule
   * @param  {any|void}  value
   * @return {boolean}
   */},{key:'_isValidatable',value:function _isValidatable(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;return!!_rules2.default.isImplicit(a.name)||this.getRule('required').validate(b)}/**
   * Determine if we should stop validating.
   *
   * @param  {string} attribute
   * @param  {boolean} rulePassed
   * @return {boolean}
   */},{key:'_shouldStopValidating',value:function _shouldStopValidating(a,b){var c=this.stopOnAttributes;return!((0,_lodash.isUndefined)(c)||!1===c||!0===b)&&(!(c instanceof Array)||-1<c.indexOf(a))}/**
   * Set custom attribute names.
   *
   * @param {object} attributes
   * @return {void}
   */},{key:'setAttributeNames',value:function setAttributeNames(a){this.messages._setAttributeNames(a)}/**
   * Set the attribute formatter.
   *
   * @param {function} func
   * @return {void}
   */},{key:'setAttributeFormatter',value:function setAttributeFormatter(a){this.messages._setAttributeFormatter(a)}/**
   * Get validation rule
   *
   * @param  {string} name
   * @return {Rules}
   */},{key:'getRule',value:function getRule(a){return _rules2.default.make(a,this)}/**
   * Stop on first error.
   *
   * @return {void}
   * @param attributes
   */},{key:'stopOnError',value:function stopOnError(a){this.stopOnAttributes=a}/**
   * Determine if validation passes
   *
   * @param {function} passes
   * @return {void|boolean}
   */},{key:'passes',value:function passes(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:void 0,b=this._checkAsync('passes',a);return b?this.checkAsync(a):this.check()}/**
   * Determine if validation fails
   *
   * @param {function} fails
   * @return {boolean|undefined|void}
   */},{key:'fails',value:function fails(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:void 0,b=this._checkAsync('fails',a);return b?this.checkAsync(function(){},a):!this.check()}/**
   * Check if validation should be called asynchronously
   *
   * @param  {string}   funcName Name of the caller
   * @param  {function} callback
   * @return {boolean}
   */},{key:'_checkAsync',value:function _checkAsync(a,b){var c=(0,_lodash.isFunction)(b);if(this.hasAsync&&!c)throw a+' expects a callback when async rules are being tested.';return this.hasAsync||c}/**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} messages
   * @return {this}
   */},{key:'useLang',/**
   * Set default language to use
   *
   * @param {string} lang
   * @return {void}
   */value:function useLang(a){this.locale=a}/**
   * Get default language
   *
   * @return {string}
   */}],[{key:'getLang',value:function getLang(){return this.locale}/**
   * Default language
   *
   * @type {string}
   */},{key:'setLang',value:function setLang(a){this.locale=a}},{key:'setMessages',value:function setMessages(a,b){return _lang2.default._set(a,b),this}/**
   * Get messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */},{key:'getMessages',value:function getMessages(a){return _lang2.default._get(a)}},{key:'getDefaultLang',value:function getDefaultLang(){return this.locale}/**
   * Register custom validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */},{key:'register',value:function register(a,b,c){var d=this.getDefaultLang();_rules2.default.register(a,b),_lang2.default._setRuleMessage(d,a,c)}/**
   * Register custom validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */},{key:'registerImplicit',value:function registerImplicit(a,b,c){var d=this.getDefaultLang();_rules2.default.registerImplicit(a,b),_lang2.default._setRuleMessage(d,a,c)}/**
   * Register asynchronous validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */},{key:'registerAsync',value:function registerAsync(a,b,c){var d=this.getDefaultLang();_rules2.default.registerAsync(a,b),_lang2.default._setRuleMessage(d,a,c)}/**
   * Register asynchronous validation rule
   *
   * @param  {string}   name
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */},{key:'registerAsyncImplicit',value:function registerAsyncImplicit(a,b,c){var d=this.getDefaultLang();_rules2.default.registerAsyncImplicit(a,b),_lang2.default._setRuleMessage(d,a,c)}/**
   * Register validator for missed validation rule
   *
   * @param  {function} fn
   * @param  {string}   message
   * @return {void}
   */},{key:'registerMissedRuleValidator',value:function registerMissedRuleValidator(a,b){_rules2.default.registerMissedRuleValidator(a,b)}}]),Validator}();exports.default=Validator;