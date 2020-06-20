class Vlidator {
  install (Vue, options = {}) {
    Vue.mixin({});
  }
}

export { default as Validator } from './validator';
export default new Vlidator();
