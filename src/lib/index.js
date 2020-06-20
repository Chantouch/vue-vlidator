import Validator from './validator';
import _get from 'lodash/get';
import flatten from './flatten';

class Vlidator {
  install (Vue, options = {}) {
    Vue.mixin({
      beforeCreate() {
        this.$options.vlidator = {};
        this.$options.$vlidator = {};
        Vue.util.defineReactive(this.$options, '$vlidator', Validator);
        if (!this.$options.computed) {
          this.$options.computed = {};
        }
        this.$options.computed.$vlidator = function() {
          return this.$options.$vlidator;
        };
      }
    });
  }
}

export { default as Validator } from './validator';
export default new Vlidator();
