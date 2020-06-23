import Vue from 'vue';
import Validator from '../lib';
// import Validator from '../../dist';

const customAttributes = {
  form: {
    name: 'name'
  }
};

Vue.use(Validator, { locale: 'en', customAttributes });
