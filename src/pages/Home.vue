<template>
    <b-form @submit.prevent="onSubmit" @keydown="$vlidator.errors.keydown($event, 'form')">
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
                    name="name"
                    @keydown="$vlidator.errors.clear(['form.name'])"
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
                    name="email"
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
        <b-form-group
                id="fieldset-4"
                description="Let us know your email."
                label="Enter your password"
                label-for="input-2"
                :state="$vlidator.errors.has('form.password')"
                :invalid-feedback="$vlidator.errors.first('form.password')"
        >
            <b-form-input
                    id="input-4"
                    v-model="form.password"
                    :state="!$vlidator.errors.has('form.password')"
                    type="password"
                    trim
                    name="password"
            />
        </b-form-group>
        <b-form-group
                id="fieldset-5"
                description="Let us know your password confirmation."
                label="Enter your password confirmation"
                label-for="input-2"
                :state="$vlidator.errors.has('form.passwordConfirmation')"
                :invalid-feedback="$vlidator.errors.first('form.passwordConfirmation')"
        >
            <b-form-input
                    id="input-5"
                    v-model="form.passwordConfirmation"
                    :state="!$vlidator.errors.has('form.passwordConfirmation')"
                    type="password"
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
          name: '',
          email: 'johndoe@gmail.com',
          age: 18,
          passwordConfirmation: '',
          password: ''
        }
      }
    },
    vlidator: {
      rules: {
        form: {
          name: 'required|min:4|string',
          email: 'required|email',
          age: 'required|numeric|min:18|max:50',
          password: 'required|min:3|confirmed'
        }
      }
    },
    methods: {
      async onSubmit () {
        try {
          const { data } = await this.validate()
          console.log(data)
          alert(JSON.stringify(this.form))
        } catch (e) {
          console.log(e)
        }
      }
    },
  }
</script>
