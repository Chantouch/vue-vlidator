'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var replacements=exports.replacements={/**
   * Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */between:function between(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{min:c[0],max:c[1]})},/**
   * Digits-Between replacement (replaces :min and :max)
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */digits_between:function digits_between(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{min:c[0],max:c[1]})},/**
   * Required_if replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */required_if:function required_if(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{other:this._getAttributeName(c[0]),value:c[1]})},/**
   * Required_unless replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */required_unless:function required_unless(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{other:this._getAttributeName(c[0]),value:c[1]})},/**
   * Required_with replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */required_with:function required_with(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{field:this._getAttributeName(c[0])})},/**
   * Required_with_all replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */required_with_all:function required_with_all(a,b){var c=b.getParameters(),d=this._getAttributeName.bind(this);return this._replacePlaceholders(b,a,{fields:c.map(d).join(', ')})},/**
   * Required_without replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */required_without:function required_without(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{field:this._getAttributeName(c[0])})},/**
   * Required_without_all replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */required_without_all:function required_without_all(a,b){var c=b.getParameters(),d=this._getAttributeName.bind(this);return this._replacePlaceholders(b,a,{fields:c.map(d).join(', ')})},/**
   * After replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */after:function after(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{after:this._getAttributeName(c[0])})},/**
   * Before replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */before:function before(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{before:this._getAttributeName(c[0])})},/**
   * After_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */after_or_equal:function after_or_equal(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{after_or_equal:this._getAttributeName(c[0])})},/**
   * Before_or_equal replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */before_or_equal:function before_or_equal(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{before_or_equal:this._getAttributeName(c[0])})},/**
   * Same replacement.
   *
   * @param  {string} template
   * @param  {Rules} rule
   * @return {string}
   */same:function same(a,b){var c=b.getParameters();return this._replacePlaceholders(b,a,{same:this._getAttributeName(c[0])})}},formatter=exports.formatter=function formatter(a){return a.replace(/[_\[]/g,' ').replace(/]/g,'')};exports.default={replacements:replacements,formatter:formatter};