"use strict";var _createClass=function(){function defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(a,b,c){return b&&defineProperties(a.prototype,b),c&&defineProperties(a,c),a}}();Object.defineProperty(exports,"__esModule",{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var Errors=function(){function Errors(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};_classCallCheck(this,Errors),this.errors=a}/**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */return _createClass(Errors,[{key:"add",value:function add(a,b){this.has(a)||(this.errors[a]=[]),-1===this.errors[a].indexOf(b)&&this.errors[a].push(b)}/**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */},{key:"get",value:function get(a){return this.has(a)?this.errors[a]:[]}/**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|boolean} First error message or false
   */},{key:"first",value:function first(a){return this.has(a)?this.errors[a][0]:void 0}/**
   * Get all error messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */},{key:"all",value:function all(){return this.errors}/**
   * Determine if we have any errors.
   */},{key:"any",value:function any(){return 0<Object.keys(this.errors).length}/**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */},{key:"has",value:function has(a){var b=this.errors.hasOwnProperty(a);if(!b){var c=Object.keys(this.errors).filter(function(b){return b.startsWith(a+".")||b.startsWith(a+"[")});b=0<c.length}return b}/**
   * Fill the error object
   * @param errors
   */},{key:"fill",value:function fill(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.errors=a}/**
   * Flush error
   */},{key:"flush",value:function flush(){this.errors={}}/**
   * Clear one or all error fields.
   *
   * @param {String|undefined} attribute
   */},{key:"clear",value:function clear(a){if(!a)return this.flush();var b=Object.assign({},this.errors);Object.keys(b).filter(function(b){return b===a||b.startsWith(a+".")||b.startsWith(a+"[")}).forEach(function(a){return delete b[a]}),this.fill(b)}/**
   * Clear errors on keydown.
   *
   * @param {KeyboardEvent} event
   */},{key:"keydown",value:function keydown(a){var b=a.target.name;b||this.clear(b)}}]),Errors}();exports.default=Errors;