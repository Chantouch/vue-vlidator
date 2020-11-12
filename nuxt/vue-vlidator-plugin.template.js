import Vue from 'vue';
import ValidatorJs, { Validator } from 'vue-vlidator';

export default async (context) => {
    // inject options from module
    const { app } = context
    const i18n = app.i18n;
    const [pluginOptions] = [<%= serialize(options) %>]
    if (i18n && i18n.locale && !pluginOptions.locale) {
        const module = await import(/* webpackChunkName: "lang-[request]" */ '~/<%= options.langDir %>/' + i18n.locale)
        const lang = module.default ? module.default : module
        const result = typeof lang === 'function' ? await Promise.resolve(lang(context, i18n.locale)) : lang
        const { attributes = {}, messages = {} } = result
        Object.assign(pluginOptions, {
            locale: i18n.locale,
            customAttributes: attributes,
            customMessages: messages
        })
    } else if (pluginOptions.locale) {
        Object.assign(pluginOptions, { locale: pluginOptions.locale })
    }
    Vue.use(ValidatorJs, pluginOptions); // add vue-vlidator as Vue plugin
    app.$vlidator = new Validator(pluginOptions);
}
