<template>
  <div>
    <div class="wrapper">
      <Snackbar></Snackbar>
      <div class="container">
        <ul @keyup.enter="register">
          <li class="list_items">
            <input
              class="textsize"
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
              class="textsize"
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
              class="textsize"
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
              <router-link to="/LogIn">Already have an account?</router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Snackbar from "../components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data: () => ({
    username: "",
    password: "",
    email: "",
    emailregex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
  }),

  computed: {},

  watch: {},

  methods: {
    register() {
      if (this.email == "") {
        this.$store.dispatch("actionSnackbar", {
          content: "Please enter your Email",
          type: "error",
        });
        return;
      } else if (!this.emailregex.test(this.email)) {
        this.$store.dispatch("actionSnackbar", {
          content: "Please enter a valid Email",
          type: "error",
        });
        return;
      } else if (this.password.length < 6) {
        this.$store.dispatch("actionSnackbar", {
          content: "Password must be greater than 6 characters",
          type: "error",
        });
        return;
      } else if (this.username.length < 6) {
        this.$store.dispatch("actionSnackbar", {
          content: "Username must be greater than 6 characters",
          type: "error",
        });
        return;
      }
      firebase
        .database()
        .ref("usernames/")
        .child(this.username.trim())
        .once("value", (snapshot) => {
          if (!snapshot.exists()) {
            this.$store
              .dispatch("signUserUp", {
                email: this.email,
                password: this.password,
                username: this.username.trim(),
              })
              .then(() => {
                (this.email = ""), (this.password = ""), (this.username = "");
              });
          } else {
            this.$store.dispatch("actionSnackbar", {
              content: "username already exist",
              type: "error",
            });
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
  height: 90vh;
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
  align-self: center;
  text-decoration-line: none;
  color: black;
  font-size: 14px;
}
a:hover {
  color: rgb(45, 209, 154);
  border-bottom: 2px solid #e4e403;
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
  width: 80%;
  align-self: center;
}
li {
  margin: 2%;
  width: 100%;
}
.textsize {
  font-size: 22px;
}

@media only screen and (max-width: 700px) {
  .wrapper {
    height: 80vh;
    width: auto;
    padding: 10%;
    margin: auto;
  }

  li {
    margin: 2%;
    width: 100%;
  }
  .textsize {
    font-size: 16px;
  }
}
</style>
