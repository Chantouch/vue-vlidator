/**
 * Extends interfaces in Vue.js
 */

import Vlidator from './index';

declare module 'vue/types/vue' {
  interface Vue {
    $vlidator: Vlidator;
  }
}
