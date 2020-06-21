'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _createClass=function(){function defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(a,b,c){return b&&defineProperties(a.prototype,b),c&&defineProperties(a,c),a}}(),_attributes=require('./attributes'),_attributes2=_interopRequireDefault(_attributes),_flatten=require('./flatten'),_flatten2=_interopRequireDefault(_flatten),_lodash=require('lodash');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var Messages=function(){function Messages(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:[];_classCallCheck(this,Messages),this.lang=a,this.messages=b,this.customMessages={},this.attributeNames={}}/**
   * Set custom messages
   *
   * @param {object} customMessages
   * @return {void}
   */return _createClass(Messages,[{key:'_setCustom',value:function _setCustom(a){this.customMessages=a||{}}/**
   * Set custom attribute names.
   *
   * @param {object} attributes
   */},{key:'_setAttributeNames',value:function _setAttributeNames(a){this.attributeNames=a}/**
   * Set the attribute formatter.
   *
   * @param {function} func
   * @return {void}
   */},{key:'_setAttributeFormatter',value:function _setAttributeFormatter(a){this.attributeFormatter=a}/**
   * Get attribute name to display.
   *
   * @param  {string} attribute
   * @return {string}
   */},{key:'_getAttributeName',value:function _getAttributeName(a){var b=a,c=(0,_flatten2.default)(this.messages.attributes);return this.attributeNames.hasOwnProperty(a)?this.attributeNames[a]:(c.hasOwnProperty(a)&&(b=c[a]),this.attributeFormatter&&(b=this.attributeFormatter(b)),b)}/**
   * Get all messages
   *
   * @return {object}
   */},{key:'all',value:function all(){return this.messages}/**
   * Render message
   *
   * @param  {Rules} rule
   * @return {string}
   */},{key:'render',value:function render(a){if(a.customMessage)return a.customMessage;var b=this._getTemplate(a),c=void 0;return c=_attributes2.default.replacements[a.name]?_attributes2.default.replacements[a.name].apply(this,[b,a]):this._replacePlaceholders(a,b,{}),c}/**
   * Get the template to use for given rule
   *
   * @param  {Rules} rule
   * @return {string}
   */},{key:'_getTemplate',value:function _getTemplate(a){for(var b=this.messages,c=b.def,d=this.customMessages,e=[a.name+'.'+a.attribute,a.name],f=0,g=void 0;f<e.length;f++)if(g=e[f],d.hasOwnProperty(g)){c=d[g];break}else if(b.hasOwnProperty(g)){c=b[g];break}return(0,_lodash.isObject)(c)&&(c=c[a._getValueType()]),c}/**
   * Replace placeholders in the template using the data object
   *
   * @param  {Rules} rule
   * @param  {string} template
   * @param  {object} data
   * @return {string}
   */},{key:'_replacePlaceholders',value:function _replacePlaceholders(a,b,c){var d=void 0,e=void 0;if(c.attribute=this._getAttributeName(a.attribute),c[a.name]=c[a.name]||a.getParameters().join(','),(0,_lodash.isString)(b)&&(0,_lodash.isObject)(c))for(e in d=b,c)d=d.replace(new RegExp(':'+e,'g'),c[e]);return d}}]),Messages}();exports.default=Messages;