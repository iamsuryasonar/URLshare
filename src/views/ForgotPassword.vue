<template>
  <div>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card height="0" max-width="400" class="mx-auto">
          <v-form class="mt-10" ref="form" lazy-validation>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-btn
              color="success"
              class="mr-4"
              @click="reset"
              :loading="loading"
            >
              Reset
            </v-btn>
            <v-btn
              color="success"
              class="mr-4"
              @click="cancel"
              :loading="loading"
            >
              Cancel
            </v-btn>
          </v-form>

          <v-snackbar
            :timeout="-1"
            v-model="emailSending"
            bottom
            color="success"
            centered
            middle
          >
            Sending...
          </v-snackbar>

          <v-snackbar
            :timeout="-1"
            v-model="sent"
            centered
            bottom
            color="success"
            middle
          >
            Email sent. Please check your email.
          </v-snackbar>

          <v-snackbar
            :timeout="-1"
            v-model="errorOcurred"
            bottom
            centered
            color="error"
            middle
            text
          >
            {{ error }}
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    error: "",
    errorOcurred: false,
    emailSending: false,
    sent: false,
    loading: false,
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  computed: {},

  watch: {},

  methods: {
    reset() {
      if (!this.email) {
        this.error = "Please type in a valid email address.";
        return;
      }
      this.error = null;
      this.emailSending = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.emailSending = false;
          this.sent = true;
          setTimeout(() => {
            this.$router.push("/LogIn");
          }, 2000);
        })
        .catch((error) => {
          this.emailSending = false;
          this.errorOcurred = true;
          this.error = error.message;
        });
    },
    cancel() {
      this.$router.push("/LogIn");
    },
  },
};
</script>
