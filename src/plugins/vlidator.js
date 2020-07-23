import Vue from 'vue';
import Validator from '../lib';

const customAttributes = {
  form: {
    name: 'name'
  }
};
const options = {
  locale: 'en',
  customAttributes,
  langDir: 'lib/lang/',
  confirmedReverse: true,
};

Vue.use(Validator, options);
