import Vue, {PluginFunction} from 'vue';


type AsyncFunction = ((arg0: any) => Promise<any>) | Promise<any>;

export default class Validator extends ValidatorInstance {
    constructor(options?: ValidatorOptions);

    static install(): PluginFunction<any>;
}

/**
 * The vue-wait Instance
 */

export class ValidatorInstance {
    errors: ErrorsInstance;
    messages: any;
    errorCount: number;
    hasAsync: boolean;
    rules: RulesOptions;
    locale: string;
    setAttributeNames: Function;
    setAttributeFormatter: Function;
    options: object;

    /**
     * Get current locale
     * @return {string}
     */
    getLang(): string;

    /**
     * Set locale for validator
     * @return {string}
     * @param lang
     */
    setLang(lang: string): string;

    /**
     * Get default language of validator
     * @return {string}
     * @memberOf ValidatorInstance
     */
    getDefaultLang(): string;

    /**
     * Set locale for messages and attributes
     * @return {string}
     * @param lang
     */
    useLang(lang: string): string

    /**
     * To set messages
     * @return self
     * @param lang
     * @param messages
     */
    setMessages(lang: string, messages: object): object
}

export class ErrorsInstance {
    constructor(errors?: ErrorsOptions);

    /**
     * Return object errors
     * @memberOf ErrorsInstance
     */
    all(): object

    /**
     * Returns boolean value if any loader exists in page.
     *
     * @returns {boolean}
     * @memberOf ErrorsInstance
     */
    any(): boolean;

    /**
     * Add error to errors object
     * @return {object}
     * @param {string} attribute
     * @param {Array} message
     * @memberOf ErrorsInstance
     */
    add(attribute: string, message: string[]): object

    /**
     * Get error message by attribute
     * @return {string}
     * @param {string} attribute
     * @memberOf ErrorsInstance
     */
    get(attribute: string): string

    /**
     * Returns boolean value if some of given loaders exists in page.
     *
     * @param {(string|string[])} attribute
     * @returns {boolean}
     * @memberOf ErrorsInstance
     */
    first(attribute: string | string[]): string;

    /**
     * Check if attribute give has error
     * @return {boolean}
     * @param attribute
     * @memberOf ErrorsInstance
     */
    has(attribute: string | string[]): boolean;

    /**
     * Clear error for given attribute
     * @return {string}
     * @param attribute
     * @memberOf ErrorsInstance
     */
    clear(attribute: string | string[]): string;

    /**
     * Clear all errors
     * @return {string}
     * @memberOf ErrorsInstance
     */
    flush(): string;

    /**
     * Fill errors object
     * @return {Object}
     * @param errors
     * @memberOf ErrorsInstance
     */
    fill(errors: object): object

    /**
     * On change keyboard events for the form
     * @param {KeyboardEvent} event
     * @memberOf ErrorsInstance
     */
    keydown<T extends Function | AsyncFunction>(event: KeyboardEvent): T;
}

export interface ValidatorOptions {
    accessorName?: string,
    input: {
        [key: string]: string | object
    },
    rules?: {
        [key: string]: string | object
    },
    locale?: string,
    customMessages?: {
        [key: string]: string | object
    },
    customAttributes?: {
        [key: string]: string | object
    }
}

export interface ErrorsOptions {
    errors: {
        [key: string]: any;
    }
}

export interface RulesOptions {
    name: string,
    fn: Function | string
    async: boolean
}
