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
            <b-form-input id="input-1" v-model="form.name" :state="!$vlidator.errors.has('form.name')" trim/>
        </b-form-group>
        <b-form-group
                id="fieldset-2"
                description="Let us know your email."
                label="Enter your email"
                label-for="input-2"
                :state="$vlidator.errors.has('form.email')"
                :invalid-feedback="$vlidator.errors.first('form.email')"
        >
            <b-form-input id="input-2" v-model="form.email" :state="!$vlidator.errors.has('form.email')"
                          type="email"/>
        </b-form-group>
        <b-form-group
                id="fieldset-3"
                description="Let us know your age."
                label="Enter your age"
                label-for="input-3"
                :state="$vlidator.errors.has('form.age')"
                :invalid-feedback="$vlidator.errors.first('form.age')"
        >
            <b-form-input id="input-3" v-model.number="form.age" :state="!$vlidator.errors.has('form.age')"
                          type="number"/>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
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
        },
        errors: {}
      }
    },
    vlidator: {
      rules: {
        form: {
          name: 'required|min:4',
          email: 'required|email',
          age: 'min:18'
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.$vlidator.passes())
      }
    },
  }
</script>
