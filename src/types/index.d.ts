import Vue, { PluginFunction } from 'vue';


type AsyncFunction = ((arg0: any) => Promise<any>) | Promise<any>;

export default class Validator extends ValidatorInstance {
  constructor(options?: ValidatorOptions);

  static install(): PluginFunction<any>;
}

/**
 * The vue-wait Instance
 */

export class ValidatorInstance {
  /**
   * Returns boolean value if any loader exists in page.
   *
   * @returns {boolean}
   * @memberof ValidatorInstance
   */
  any(): boolean;

  /**
   * Returns boolean value if some of given loaders exists in page.
   *
   * @param {(string|string[])} attribute
   * @returns {boolean}
   * @memberof ValidatorInstance
   */
  first(attribute: string|string[]): string;
  has(attribute: string|string[]): boolean;

  /**
   * Sets the progress of the given loader.
   *
   * @param {string} waiter
   * @param {number} current
   * @param {number} [total]
   * @memberof ValidatorInstance
   */
  progress(waiter: string, current: number, total?: number): Promise<any>;

  keydown<T extends Function | AsyncFunction>(waiter: string, callback: T, forceSync?: false): T;
}

export interface ValidatorOptions{
  locale?: string
}
