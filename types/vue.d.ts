/**
 * Extends interfaces in Vue.js
 */

import Validator from './index';
import Vue from "vue";
interface ObjectLiteral { [key: string]: string }
interface IVlidator {
    rules: ObjectLiteral
    messages?: ObjectLiteral
    attributes?: ObjectLiteral
}

declare module 'vue/types/vue' {
    interface Vue {
        $vlidator: Validator;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        vlidator?: IVlidator
    }
}
