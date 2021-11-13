<template>
  <!-- <div>
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
  </div> -->

   <div>
    <div class="wrapper">
      <div class="container">
        <ul>
          <li class="list_items">
            <input
              placeholder="Username"
              v-model="username"
              type="text"
              name="Username"
              autocomplete="off"
              required
            />
          </li>
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
            <div class="loginandalreadyuser">
              <button @click="register">Register</button>
              <router-link to="/LogIn">Already have an account</router-link>
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
      // this.$refs.form.validate();
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
.loginandalreadyuser {
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
a {
  text-decoration: none;
  font-size: 14px;
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