<template>
  <div>
    <v-card height="0" max-width="400" class="mx-auto">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          counter
          :rules="passwordRules"
          label="Password"
          required
          hint="At least 8 characters"
        ></v-text-field>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          :loading="loading"
        >
          Validate
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    valid: true,
    loading: false,
    username: "",
    password: "",
    email: "",

    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 20) || "Password must be greater than 8 characters",
    ],

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    error: null,
  }),

  // beforeCreate() {
  //   if(this.$store.state.auth){
  //     this.$router.push('./Profile')
  //   }
  // },

  computed: {
    /*  user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    }, */
  },

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/Profile");
      }
    },
  },

  methods: {
    validate() {
      this.$refs.form.validate();
      this.loading = true;
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password,
        username: this.username,
      });
      this.$refs.form.reset();
    },
  },
};
</script>