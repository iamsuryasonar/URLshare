<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
    <v-card height="0" max-width="400" class="mx-auto">
      <v-form class="mt-10" ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
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
          :disabled="isDisabled"
          color="success"
          class="mr-4"
          @click="register"
          :loading="loading"
        >
          Register
        </v-btn>
      </v-form>
    </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    valid: true,
    loading: false,
    username: "test",
    password: "11111111",
    email: "test@test.com",
    usernameRules: [(v) => !!v || "Username is required",],
    
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
    isDisabled() {
      if (this.username != "" && this.email != "" && this.password != "") {
        return false;
      } else {
        return true;
      }
    },
  },

  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/Profile");
      }
    },
  },

  methods: {
    register() {
      this.$refs.form.validate();
      this.loading = true;
      firebase
        .database()
        .ref("usernames/")
        .child(this.username)
        .once("value", (snapshot) => {
          if (!snapshot.exists()) {
            this.$store.dispatch("signUserUp", {
              email: this.email,
              password: this.password,
              username: this.username,
            });
            this.loading = false;
          } else {
            this.loading = false;
            alert("Username already exists!!!");
          }
        });
    },
  },
};
</script>
