<template>
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

  computed: {
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
  margin: auto;
  height: 100vh;
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
  text-decoration-line: none;
  color: black;
  font-size: 14px;
}
a:hover{
  color: red;
}
.list_items {
  list-style: none;
}
input {
  border: 1px solid rgb(45, 209, 154);
  border-radius: 0.25rem;
  padding: 0.5em 0.75em;
  color: black;
  background-color: transparent;
  width: 100%;
}
input::placeholder {
  opacity: 0.56;
  color: black;
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
  width: 100%;
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