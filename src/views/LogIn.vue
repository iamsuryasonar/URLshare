<template>
  <div class="wrapper">
    <Snackbar></Snackbar>
    <div class="overlaycontainer" v-click-outside="onClickOutside">
      <div class="container">
        <ul @keyup.enter="validate">
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
                <a @click="forgotpasswordoverlay = !forgotpasswordoverlay"
                  >Reset password?</a
                >
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="forgotpasswordoverlay" v-show="forgotpasswordoverlay">
        <ul @keyup.enter="reset">
          <li class="list_items">
            <input
              placeholder="Email"
              v-model="email"
              type="email"
              name="Email"
              autocomplete="off"
              required
            />
            <div class="overlaybuttons">
              <button @click="forgotpasswordoverlay = !forgotpasswordoverlay">
                Cancel
              </button>
              <button @click="reset">Send Email</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import Snackbar from "../components/Snackbar.vue";

Vue.directive("click-outside", {
  bind(el, binding, vnode) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener("click", el.clickOutsideEvent);
  },
  unbind(el) {
    document.body.removeEventListener("click", el.clickOutsideEvent);
  },
});

export default {
  components: {
    Snackbar,
  },
  data: () => ({
    password: "",
    forgotpasswordoverlay: false,
    email: "",
    emailregex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
  }),

  computed: {
    // user() {
    //   return this.$store.getters.user;
    // },
  },

  methods: {
    validate() {
      if (!this.email || !this.password) {
        this.$store.dispatch("actionSnackbar", {
          content: "Both email and password are required",
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
      }

      this.$store
        .dispatch("signUserIn", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          (this.email = ""), (this.password = "");
        });
    },

    onClickOutside() {
      this.forgotpasswordoverlay = false;
    },
    reset() {
      if (!this.email) {
        this.$store.dispatch("actionSnackbar", {
          content: "Enter valid email",
          type: "warning",
        });
        return;
      }

      //todo: push below function to store
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.forgotpasswordoverlay = false;
          this.$store.dispatch("actionSnackbar", {
            content: "Email sent",
            type: "success",
          });
        })
        .catch((error) => {
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
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
.overlaycontainer {
  position: relative;
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
  align-self: center;
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
a {
  cursor: pointer;
  text-decoration-line: none;
  color: black;
  font-size: 14px;
}
a:hover {
  color: rgb(45, 209, 154);
  border-bottom: 2px solid #e4e403;
}
.forgotpasswordoverlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, #8e9eab, #eef2f3);
}
.forgotpasswordoverlay ul {
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0%;
}
.overlaybuttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
}
</style>
