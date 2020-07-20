/**
 * Extends interfaces in Vue.js
 */

import Validator from './index';

declare module 'vue/types/vue' {
    interface Vue {
        $vlidator: Validator;
    }
}
