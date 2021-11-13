<template>
  <!-- <div>
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
  </div> -->
  
   <div>
    <div class="wrapper">
      <div class="container">
        <ul>
          <li class="list_items">
            <input
              placeholder="Email"
              v-model="email"
              type="email"
              name="Email"
              autocomplete="off"
              required
            />
          </li>
          <li class="list_items">
            <input
              placeholder="Password"
              v-model="password"
              type="password"
              name="Password"
              autocomplete="off"
              required
            />
          </li>
          <li class="list_items">
            <div class="loginandforgotpassword">
              <button @click="validate">Log In</button>
              <p href="#">
                <router-link to="/ForgotPassword">Reset password?</router-link>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
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
      // this.$refs.form.validate();

      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
      console.log("logged in!!!")
      this.loading = false;
      //this.$router.push("/Profile"); //this needs to be fixed
      // this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

html {
  background-color: #151515;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 70%;
  height: auto;
  margin: auto;
  /* position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.loginandforgotpassword {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

li,
button {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 18px;
  color: aliceblue;
  text-decoration: none;
}
p {
  font-size: 16px;
}
.list_items {
  list-style: none;
}
input {
  border: 1px solid rgb(45, 209, 154);
  border-radius: 0.25rem;
  padding: 0.5em 0.75em;
  color: white;
  background-color: #151515;
  width: 100%;
}
input::placeholder {
  opacity: 0.56;
  color: white;
}

input:hover {
  border-color: yellow;
}

input:focus {
  outline: none;
  border: 1px solid transparent;
  box-shadow: 0px 0px 1px 1px yellow;
}
.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  padding: 8px 20px;
  background-color: rgb(45, 209, 154);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  border: none;
  border-radius: 50px;
}
button:hover {
  background-color: rgb(7, 146, 100);
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}
li {
  margin: 2%;
  width: 50%;
}
@media only screen and (max-width: 700px) {
  .wrapper {
    height: 100%;
    width: auto;
    padding: 10%;
    margin: auto;
  }

  li {
    margin: 2%;
    width: 100%;
  }
}
</style>
