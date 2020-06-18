class Errors {
  constructor (errors = {}) {
    this.errors = errors;
  }
  /**
   * Add new error message for given attribute
   *
   * @param  {string} attribute
   * @param  {string} message
   * @return {void}
   */
  add(attribute, message) {
    if (!this.has(attribute)) {
      this.errors[attribute] = [];
    }
    if (this.errors[attribute].indexOf(message) === -1) {
      this.errors[attribute].push(message);
    }
  }

  /**
   * Returns an array of error messages for an attribute, or an empty array
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {array} An array of error messages
   */
  get(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute];
    }
    return [];
  }

  /**
   * Returns the first error message for an attribute, false otherwise
   *
   * @param  {string} attribute A key in the data object being validated
   * @return {string|boolean} First error message or false
   */
  first(attribute) {
    if (this.has(attribute)) {
      return this.errors[attribute][0];
    }
    return false;
  }

  /**
   * Get all error messages from all failing attributes
   *
   * @return {Object} Failed attribute names for keys and an array of messages for values
   */
  all() {
    return this.errors;
  }

  /**
   * Determine if there are any error messages for an attribute
   *
   * @param  {string}  attribute A key in the data object being validated
   * @return {boolean}
   */
  has(attribute) {
    return this.errors.hasOwnProperty(attribute);
  }
}

export default Errors;
