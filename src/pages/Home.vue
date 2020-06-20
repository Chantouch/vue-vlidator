<template>
    <b-form @submit.prevent="onSubmit">
        <b-form-group
                id="fieldset-1"
                description="Let us know your name."
                label="Enter your name"
                label-for="input-1"
                :state="false"
        >
            <b-form-input id="input-1" v-model="name" :state="true" trim></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
</template>

<script>
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
      rules: {
        name: 'required|min:4',
        email: 'required|email',
        age: 'min:18'
      }
    },
    methods: {
      onSubmit () {
        console.log(this.$vlidator.passes())
      }
    },
  }
</script>
