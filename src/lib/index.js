import Validator from './validator';

const install = (Vue, options = {}) => {
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
};

export default { install, Validator };
