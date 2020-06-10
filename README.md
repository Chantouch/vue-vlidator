# Vuelidator

### This package will help you to validate your datas in vue components

> This module uses [validator.js](https://github.com/chriso/validator.js) and [haye](https://github.com/poppinss/haye) packages

<p align="center">
  <a href="https://www.npmjs.org/package/vuelidator">
    <img src="https://img.shields.io/npm/v/vuelidator.svg?style=flat-square&logo=npm">
  </a>
</p>


## Setup

Install the package from npm

```npm
npm install vuelidator
```

and use in your component

```js
import { Validatable } from 'vuelidator'
...

{
  mixins: [ Validatable ]
  ...
}
```

## Config validator rules

Rules can be in string format:
'required|min:5|alpha'

To config your data rules fill validationRules in component computed propetry

```js
  ...
  computed: {
    validationRules () {
      return {
        slug: 'required|alpha|min:5|max:16',
        name: 'required|lengthrange:5,16',
        permissions: [
          {
            name: 'required',
            message: this.$t('Please select at least one permission')
          }
        ]
      }
    },
  }
```

## Validators

### Locales
Several validators receives `locale` param, there locales.<br/>
Locale is one of `['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG', 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE', 'bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM', 'es-ES', 'fr-FR', 'hu-HU', 'it-IT', 'ku-IQ', 'nb-NO', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sl-SI', 'sk-SK', 'sr-RS', 'sr-RS@latin', 'sv-SE', 'tr-TR', 'uk-UA']`) and defaults to `en-US`. 

Validator                   | Description
--------------------------- | --------------------------------------
**contains**                | check if the string contains the seed.
**equals**                  | check if the string matches the comparison.
**after**                   | check if the string is a date that's after the specified date (defaults to now).
**alpha**                   | check if the string contains only letters. Params: `locale`
**alpha_numeric**           | check if the string contains only letters and numbers. Params: `locale`
**base64**                  | check if a string is base64 encoded.
**before**                  | check if the string is a date that's before the specified date.
**boolean**                 | check if a string is a boolean.
**creditcard**              | check if the string is a credit card.
**currency**                | check if the string is a valid currency amount
**decimal**                 | check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.<br/> Params: `locale`
**divisibleby**             | check if the string is a number that's divisible by another.
**email**                   | check if the string is an email
**empty**                   | check if the string has a length of zero
**max**                     | check length of string should be less than max
**maxval**                  | check value of field should be less than max,
**min**                     | check length of string should be greater than min
**minval**                  | check value should be greater than min
**numeric**                 | check if the string is a float.
**hash**                    | check if the string is a hash of type algorithm.<br/><br/>Algorithm is one of `['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']`
**hexcolor**                | check if the string is a hexadecimal color.
**hexadecimal**             | check if the string is a hexadecimal number.
**ip**                      | check if the string is an IP (version 4 or 6).
**iprange**                 | check if the string is an IP Range(version 4 only).
**in**                      | check if the string is in a array of allowed values.
**integer**                     | check if the string is an integer
**json**                    | check if the string is valid JSON (note: uses JSON.parse).
**jwt**                     | check if the string is valid JWT token.
**latlong**                 | check if the string is a valid latitude-longitude coordinate in the format `lat,long` or `lat, long`.
**length**                  | check if the string's or array length equals value
**lengthrange**          | check if the string's length falls in a range
**lowercase**               | check if the string is lowercase.
**macaddress**              | check if the string is a MAC address
**md5**                     | check if the string is a MD5 hash.
**phone**                   | check if the string is a mobile phone number. Locale
**number**                 | check if the string contains only numbers
**port**                    | check if the string is a valid port number.
**postalcode**              | check if the string is a postal code,<br/><br/>(locale is one of `[ 'AD', 'AT', 'AU', 'BE', 'BG', 'CA', 'CH', 'CZ', 'DE', 'DK', 'DZ', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IL', 'IN', 'IS', 'IT', 'JP', 'KE', 'LI', 'LT', 'LU', 'LV', 'MX', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SA', 'SE', 'SI', 'TN', 'TW', 'US', 'ZA', 'ZM' ]` OR 'any'. If 'any' is used, function will check if any of the locals match.
**url**                     | check if the string is an URL
**uuid**                    | check if the string is a UUID (version 3, 4 or 5).
**uppercase**               | check if the string is uppercase.
**matches**                 | check if string matches the pattern.<br/><br/>Either `matches('foo', /foo/i)` or `matches('foo', 'foo', 'i')`.



## Messages

The library tries to get messages from i18n plugin by tag `validators.${rule.name}`
If i18n not instaled, messages will get from default options

If you need own message options, just override `onValidationMessage` method
```js
  methods: {
    onValidationMessage ({ field, rule }) {
      return this.$i18n ? this.$t(`validators.${rule.name}`, rule.args) : rule.name
    },
    ...
```

## Properties added by mixin:

 - `isValid`: checks is all data is valid. In first getter call validation will start in silent mode without provide errors

 - `errors`: objects with error messages by filed name. To show error, just use for instance `v-if="errors.name"`

 - `successes`: object with successed flags by filed name

## Methods added by mixin

- Start validation with rules, provided in `validationRules` and data in vm.$data
```js
  this.validate()
```

- Start validation with specific rules and data in vm.$data
```js
  this.validate(rules)
```

- Start validation with specific rules and data
```js
  this.validate(rules, data)
```
