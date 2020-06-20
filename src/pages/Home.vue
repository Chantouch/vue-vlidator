<template>
    <b-form @submit.prevent="onSubmit">
        <div role="group">
            <label>Name:</label>
            <b-form-input
                    id="input-live"
                    v-model="name"
                    :state="false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Enter your name"
                    trim
            />
            <b-form-invalid-feedback id="input-live-feedback">
                Enter at least 3 letters
            </b-form-invalid-feedback>
            <b-form-text id="input-live-help">Your full name.</b-form-text>
        </div>
        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>

<script>
  import { Validator } from '../lib';

  export default {
    name: "HomePage",
    data () {
      return {
        name: 'John',
        email: 'johndoe@gmail.com',
        age: 18,
        errors: {}
      }
    },
    vlidator: {
      name: 'size:3',
      email: 'required|email'
    },
    methods: {
      onSubmit () {
        let data = {
          name: this.name,
          email: this.email,
          age: this.age
        };
        let rules = {
          name: 'required|min:2|number',
          email: 'required|email',
          age: 'min:18'
        };
        let validation = new Validator(data, rules);
        console.log(validation.passes())
        this.errors = validation.errors.all()
      }
    },
  }
</script>
