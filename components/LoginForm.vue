<template>
  <v-card width="400px">
    <v-card-text>
      <v-form 
      @submit.prevent="login"
      ref="form" 
      v-model="valid" 
      lazy-validation>
        <v-text-field
          v-model="form.email"
          label="E-mail"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          :rules="passwordRules"
          type="password"
          required
        ></v-text-field>
        <v-btn block type="submit"> Login </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      form: {
        email: '',
        password: '',
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [(v) => !!v || 'password is required'],
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          await this.$store.dispatch('admin/signin', this.form)
          this.$refs.form.resetValidation()
          this.$router.push({ name: 'store' })
        } catch (error) {
          this.$refs.form.reset()
          this.$refs.form.resetValidation()
        }
      }
    },
  },
}
</script>

<style>
</style>