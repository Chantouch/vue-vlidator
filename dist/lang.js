'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.Lang=void 0;var _messages=require('./messages'),_messages2=_interopRequireDefault(_messages),_lodash=require('lodash');function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var Lang=exports.Lang={messages:{},/**
   * Set messages for language
   *
   * @param {string} lang
   * @param {object} rawMessages
   * @return {void}
   */_set:function _set(a,b){this.messages[a]=b},/**
   * Set message for given language's rule.
   *
   * @param {string} lang
   * @param {string} attribute
   * @param {string|object} message
   * @return {void}
   */_setRuleMessage:function _setRuleMessage(a,b,c){this._load(a),(0,_lodash.isUndefined)(c)&&(c=this.messages[a].def),this.messages[a][b]=c},/**
   * Load messages (if not already loaded)
   *
   * @param  {string} lang
   * @return {void}
   */_load:function _load(a){if(!this.messages[a])try{var b=require('./lang/'+a);this._set(a,b)}catch(b){var c=require('./lang/en');this._set(a,c)}},/**
   * Get raw messages for language
   *
   * @param  {string} lang
   * @return {object}
   */_get:function _get(a){return this._load(a),this.messages[a]},/**
   * Make messages for given language
   *
   * @param  {string} lang
   * @return {Messages}
   */_make:function _make(a){return this._load(a),new _messages2.default(a,this.messages[a])}};exports.default=Lang;