import Vue from 'vue';
import Vlidator from '../lib';
// import Validator from '../../dist';

const customAttributes = {
  form: {
    name: 'name'
  }
};

Vue.use(Vlidator, { locale: 'en', customAttributes });
