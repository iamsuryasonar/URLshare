<template>
  <div>
    <v-card height="0" max-width="400" class="mx-auto">
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            :rules="passwordRules"
            label="Password"
            required
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            name="password"
            hint="At least 8 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
        </v-form>
      </v-container>
      <v-container>
        <v-btn
          :disabled="isDisabled"
          color="success"
          class="mr-4"
          :loading="loading"
          @click="validate"
          
        >
          Log In
        </v-btn>
        <p class="forgot-password text-right">
          Forgot Password
          <router-link to="/ForgotPassword">Reset?</router-link>
        </p>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    show: false,
    loading: false,
    valid: false,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 20) || "Password must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    error: null,
  }),

  // beforeCreated() {
  //   if(this.$store.state.auth){
  //     this.$router.push('./Profile')
  //   }
  // },
  computed: {
    isDisabled() {
      if(this.email!= "" && this.password != ""){
        return false
      }else{
        return true
      }
      },

    user() {
      return this.$store.getters.user;
    },
  },


  methods: {
    validate() {
      this.loading = true;
      this.$refs.form.validate();

      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
      this.loading = false;
      //this.$router.push("/Profile"); //this needs to be fixed
      this.$refs.form.reset();
    },
  },
};
</script>
