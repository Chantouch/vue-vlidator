import Validator from './validator';

export const install = (Vue, options = {}) => {
  Vue.mixin();
};

export default { install, Validator };
