/* ============
 * Bootstrap File
 * ============
 *
 * This will configure and bootstrap the application.
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise';
import 'core-js/es6/string';
import 'core-js/es7/array';
/* ===========
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from './routes';

Vue.config.performance = true;
Vue.config.debug = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = true;

require('./plugins');

Vue.use(VueRouter);

export const router = createRouter();

/**
 * Create a new router instance.
 *
 * @return {VueRouter}
 */
function createRouter () {
  return new VueRouter({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior,
    routes
  });
}

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.router = router;

export default { router };

/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
function scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    setTimeout(() => {
      resolve({ x: 0, y: 0 });
    }, 500);
  });
}
