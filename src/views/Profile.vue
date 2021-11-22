<template>
  <div class="wrapper">
    <Snackbar></Snackbar>
    <div class="overlaycontainer" v-click-outside="onClickOutside">
      <div class="container">
        <p class="title">Profile</p>
        <div class="iconandusername">
          <img class="" alt="" :src="url" />
          <p>{{ username }}</p>
        </div>
        <div class="emailandediticon">
          <p>{{ email }}</p>
          <a @click="emailoverlay = !emailoverlay">
            <i class="fas fa-edit"></i
          ></a>
        </div>
        <div class="passwordandediticon">
          <p>Password</p>
          <a @click="passwordoverlay = !passwordoverlay">
            <i class="fas fa-edit"></i
          ></a>
        </div>
        <button @click="logOut">Sign Out</button>
        <button
          class="buttondelete"
          @click="confirmdeleteaccountoverlay = !confirmdeleteaccountoverlay"
        >
          Delete Account
        </button>
      </div>

      <div class="overlay" v-show="emailoverlay">
        <ul @keyup.enter="changeEmail">
          <li class="list_items">
            <input
              placeholder="New Email"
              v-model="newEmail"
              type="email"
              name="Email"
              autocomplete="off"
              required
            />
          </li>
          <li class="list_items">
            <input
              placeholder="Password"
              v-model="currentPassword"
              type="password"
              name="Password"
              autocomplete="off"
              required
            />
          </li>
          <button @click="changeEmail">Update Email</button>
        </ul>
      </div>
      <div class="overlay" v-show="passwordoverlay">
        <ul @keyup.enter="changePassword">
          <li class="list_items">
            <input
              placeholder="Current Password"
              v-model="currentPassword"
              type="password"
              name="Password"
              autocomplete="off"
              required
            />
          </li>
          <li class="list_items">
            <input
              placeholder="New Password"
              v-model="newPassword"
              type="password"
              name="Password"
              autocomplete="off"
              required
            />
          </li>
          <button @click="changePassword">Update Password</button>
        </ul>
      </div>
      <div class="overlay" v-show="confirmdeleteaccountoverlay">
        <ul>
          <li class="list_items">
            <input
              placeholder="Password"
              v-model="currentPassword"
              type="password"
              name="Password"
              autocomplete="off"
              required
            />
          </li>
          <li class="list_items">
            <div class="confirmandrejectbuttons">
              <button @click="confirmDelete">Confirm Delete</button>
              <button
                @click="
                  confirmdeleteaccountoverlay = !confirmdeleteaccountoverlay
                "
              >
                Cancel
              </button>
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
  data() {
    return {
      url:
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      emailoverlay: false,
      passwordoverlay: false,
      confirmdeleteaccountoverlay: false,
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      username: "",
      email: "",
    };
  },

  computed: {},
  mounted() {},
  created() {
    this.retrieveEmail();
    this.retrieveUsername();
  },

  methods: {
    retrieveEmail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.providerData.forEach((profile) => {
            this.email = profile.email;
          });
        }
      });
    },
    retrieveUsername() {
      if (
        firebase.auth().currentUser.uid != undefined ||
        firebase.auth().currentUser.uid != null
      ) {
        firebase
          .database()
          .ref("users/" + firebase.auth().currentUser.uid)
          .once("value", (snapshot) => {
            if (snapshot != null || snapshot.val().username != undefined) {
              this.username = snapshot.val().username;
            }
          });
      }
    },
    onClickOutside() {
      this.emailoverlay = false;
      this.passwordoverlay = false;
      this.confirmoverlay = false;
      this.usernameoverlay = false;
    },

    logOut() {
      this.$store.dispatch("logout");
    },
    changeEmail() {
      this.$store
        .dispatch("changeemail", {
          currentpassword: this.currentPassword,
          newemail: this.newEmail,
        })
        .then(() => {
          this.retrieveEmail();
          this.newEmail = "";
          this.currentPassword = "";
          this.emailoverlay = false;
        })
        .catch((error) => {
          this.$store.dispatch("actionLoading", false);
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
        });
    },

    changePassword() {
      this.$store
        .dispatch("changepassword", {
          currentpassword: this.currentPassword,
          newpassword: this.newPassword,
        })
        .then(() => {
          this.newPassword = "";
          this.currentPassword = "";
          this.passwordoverlay = false;
        })
        .catch((error) => {
          this.$store.dispatch("actionLoading", false);
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
        });
    },

    confirmDelete() {
      this.$store
        .dispatch("deleteaccount", {
          email: this.email,
          currentpassword: this.currentPassword,
        })
        .catch((error) => {
          console.log("profile", error.message);
          this.$store.dispatch("actionLoading", false);
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error"
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

*,
p {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.wrapper {
  width: 70%;
  height: 90vh;
  margin: auto;
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
.title {
  margin: auto;
}
img {
  width: 50px;
}
.iconandusername {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.emailandediticon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.passwordandediticon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

button {
  margin-top: 20px;
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
.buttondelete {
  color: indianred;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, #8e9eab, #eef2f3);
}
ul {
  width: 90%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0%;
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
li {
  margin: 2%;
  width: 100%;
}
i {
  cursor: pointer;
}

.confirmandrejectbuttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media only screen and (max-width: 700px) {
  .wrapper {
    height: 90vh;
    width: auto;
    padding: 10%;
    margin: auto;
  }
}
</style>
