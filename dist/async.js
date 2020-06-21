"use strict";var _createClass=function(){function defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(a,b,c){return b&&defineProperties(a.prototype,b),c&&defineProperties(a,c),a}}();Object.defineProperty(exports,"__esModule",{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var AsyncResolvers=function(){function AsyncResolvers(a,b){_classCallCheck(this,AsyncResolvers),this.onResolvedAll=b,this.onFailedOne=a,this.resolvers={},this.resolversCount=0,this.passed=[],this.failed=[],this.firing=!1}/**
   * Add resolver
   *
   * @param {Object} rule
   * @return {integer}
   */return _createClass(AsyncResolvers,[{key:"add",value:function add(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},b=this.resolversCount;return this.resolvers[b]=a,this.resolversCount++,b}/**
   * Resolve given index
   *
   * @param  {integer} index
   * @return {void}
   */},{key:"resolve",value:function resolve(a){var b=this.resolvers[a];!0===b.passes?this.passed.push(b):!1===b.passes&&(this.failed.push(b),this.onFailedOne(b)),this.fire()}/**
   * Determine if all have been resolved
   *
   * @return {boolean}
   */},{key:"isAllResolved",value:function isAllResolved(){return this.passed.length+this.failed.length===this.resolversCount}/**
   * Attempt to fire final all resolved callback if completed
   *
   * @return {void}
   */},{key:"fire",value:function fire(){!this.firing||this.isAllResolved()&&this.onResolvedAll(0===this.failed.length)}/**
   * Enable firing
   *
   * @return {void}
   */},{key:"enableFiring",value:function enableFiring(){this.firing=!0}}]),AsyncResolvers}();exports.default=AsyncResolvers;