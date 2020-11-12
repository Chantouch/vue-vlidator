<template>
  <b-form @submit.prevent="submit">
    <b-form-group
        id="fieldset-1"
        description="Let us know your name."
        label="Enter your name"
        label-for="input-1"
        valid-feedback="Thank you!"
        :invalid-feedback="invalidFeedback"
        :state="state"
    >
      <b-form-input id="input-1" v-model="name" :state="state" trim></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">{{ $t('actions.submit') }}</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
export default {
  computed: {
    state() {
      return this.name.length >= 4
    },
    invalidFeedback() {
      if (this.name.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    }
  },
  vlidator: {
    rules: { name: 'required' }
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    submit() {
      if (!this.validate()) return
      console.log('submitted')
    }
  },
}
</script>
