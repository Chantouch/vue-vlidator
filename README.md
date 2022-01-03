# Vue Vlidator

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-vlidator.svg?style=flat-square)](https://npmjs.com/package/vue-vlidator)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-vlidator.svg?style=flat-square)](https://npmjs.com/package/vue-vlidator)
[![npm](https://img.shields.io/npm/dm/vue-vlidator.svg?style=flat-square)](https://npmjs.com/package/vue-vlidator)

## Installation

### Using npm

```npm
npm install vue-vlidator
```

### Using yarn

```yarn
yarn add vue-vlidator
```

## Use with NuxtJS

Put it on top of `nuxt-i18n`

``nuxt.config.js``
```js
  export default {
    modules: [
        'vue-vlidator/nuxt',
        'nuxt-i18n',
      ],
    vlidator: {}
  }
```

### Vue plugins

```js
import Vue from 'vue';
import Validator from 'vue-vlidator';

const options = { locale: 'km', customAttributes: {}, customMessages: {} }

Vue.use(Validator, options);
```

#### Available options
1. locale {string}
2. customMessages {Object}
3. customAttributes {Object}

#### Example in Vue component
```vue
<template>
    <b-form @submit.prevent="onSubmit">
        <b-form-group
                id="fieldset-1"
                description="Let us know your name."
                label="Enter your name"
                label-for="input-1"
                :state="$vlidator.errors.has('form.name')"
                :invalid-feedback="$vlidator.errors.first('form.name')"
        >
            <b-form-input
                    id="input-1"
                    v-model="form.name"
                    :state="!$vlidator.errors.has('form.name')"
                    trim
            />
        </b-form-group>
        <b-form-group
                id="fieldset-2"
                description="Let us know your email."
                label="Enter your email"
                label-for="input-2"
                :state="$vlidator.errors.has('form.email')"
                :invalid-feedback="$vlidator.errors.first('form.email')"
        >
            <b-form-input
                    id="input-2"
                    v-model="form.email"
                    :state="!$vlidator.errors.has('form.email')"
                    type="email"
                    trim
            />
        </b-form-group>
        <b-form-group
                id="fieldset-3"
                description="Let us know your age."
                label="Enter your age"
                label-for="input-3"
                :state="$vlidator.errors.has('form.age')"
                :invalid-feedback="$vlidator.errors.first('form.age')"
        >
            <b-form-input
                    id="input-3"
                    v-model.number="form.age"
                    :state="!$vlidator.errors.has('form.age')"
                    type="number"
                    trim
            />
        </b-form-group>
        <b-button type="submit" variant="primary" :disabled="$vlidator.errors.any()">
            Submit
        </b-button>
    </b-form>
</template>

<script>
  export default {
    name: "HomePage",
    data () {
      return {
        form: {
          name: 'John',
          email: 'johndoe@gmail.com',
          age: 18
        }
      }
    },
    vlidator: {
      rules: {
        form: {
          name: 'required|min:4',
          email: 'required|email',
          age: 'required|numeric|min:18|max:50'
        }
      }
    },
    methods: {
      onSubmit () {
        if (!this.validate()) return
        alert(JSON.stringify(this.form))
      }
    },
  }
</script>
```

---

### License

Copyright &copy; 2020 Chantouch Sek

Released under the MIT license

### Credits

vue-vlidator re-write by Chantouch Sek

E-Mail: [chantouchsek.cs83@gmail.com](mailto:chantouchsek.cs93@gmail.com)

Twitter [@DevidCs83](https://twitter.com/DevidCs83)

Website: [chantouch.me](https://chantouch.me)
