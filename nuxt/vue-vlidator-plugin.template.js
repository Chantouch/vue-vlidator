import Vue from 'vue';
import Validator from 'vue-vlidator';

export default ({ app }) => {
    // inject options from module
    const i18n = app.i18n;
    const [pluginOptions] = [<%= serialize(options) %>]
    if (i18n && i18n.locale) {
        const lang = require('@/lang/' + i18n.locale)
        const { attributes = {}, messages = {} } = lang.default ? lang.default : lang
        Object.assign(pluginOptions, {
            locale: i18n.locale,
            customAttributes: attributes,
            customMessages: messages
        })
    } else if (pluginOptions.locale) {
        Object.assign(pluginOptions, {
            locale: pluginOptions.locale
        })
    }
    Vue.use(Validator, pluginOptions); // add vue-vlidator as Vue plugin
    app.$vlidator = new Validator(pluginOptions);
}
