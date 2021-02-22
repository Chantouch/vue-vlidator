<template>
  <b-form @submit.prevent="submit">
    <b-form-group
        id="fieldset-1"
        description="Let us know your name."
        label="Enter your name"
        label-for="input-1"
        valid-feedback="Thank you!"
        :invalid-feedback="$vlidator.errors.first(['name'])"
        :state="$vlidator.errors.has(['name'])"
        name="name"
    >
      <b-form-input
          id="input-1"
          v-model="name"
          :state="!$vlidator.errors.has(['name'])"
          trim
          @keypress="$vlidator.errors.clear(['name'])"
      />
    </b-form-group>
    <b-button type="submit" variant="primary">{{ $t('actions.submit') }}</b-button>
    <b-button type="reset" variant="danger">Reset</b-button>
  </b-form>
</template>

<script>
export default {
  computed: {
    state () {
      return this.name.length >= 4
    },
    invalidFeedback () {
      if (this.name.length > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    }
  },
  vlidator: {
    rules: { name: 'required' },
    messages: {
      required: 'THIS FIELD IS REQUIRED'
    }
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    submit () {
      if (!this.validate()) return
      console.log('submitted:', this.name)
    }
  },
}
</script>
