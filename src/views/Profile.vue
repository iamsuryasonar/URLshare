<template>
  <!-- <v-card class="mx-auto" color="#26c6da" dark max-width="400">
    <v-card-title>
      <v-col cols="12">
        <span class="title font-weight-light">Profile</span>
      </v-col>
    </v-card-title>
    <v-col cols="12">
      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" alt="" :src="url"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="headline font-weight-bold">{{
              username
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-col>

    <v-card-actions>
      <v-list-item class="grow">
        <v-col cols="9">
          <v-list-item-content>
            <v-list-item-title class="title font-weight-light">{{
              email
            }}</v-list-item-title>
          </v-list-item-content>
        </v-col>

        <v-row align="center" justify="end">
          <v-col cols="9">
            <v-btn fab icon right @click="emailoverlay = !emailoverlay">
              <v-icon class="mr-1"> mdi-pen </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-card-actions>

    <v-overlay
      color="#26c6da"
      :absolute="absolute"
      :opacity="opacity"
      :value="emailoverlay"
    >
      <v-container v-click-outside="onClickOutside">
        <v-text-field
          v-model="newEmail"
          label="Enter New Email"
          required
          class="title"
        ></v-text-field>
        <v-text-field
          v-model="currentPassword"
          label="Enter Password"
          required
          class="title"
        ></v-text-field>

        <v-btn color="orange lighten-2" @click="changeEmail" :loading="loading">
          Update Email
        </v-btn>
      </v-container>
    </v-overlay>

    <v-card-actions>
      <v-list-item class="grow">
        <v-col cols="9">
          <v-list-item-content>
            <v-list-item-title class="title font-weight-light"
              >Password</v-list-item-title
            >
          </v-list-item-content>
        </v-col>

        <v-row align="center" justify="end">
          <v-col cols="9">
            <v-btn fab icon right @click="passoverlay = !passoverlay">
              <v-icon class="mr-1"> mdi-pen </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-card-actions>

    <v-overlay
      color="#26c6da"
      :absolute="absolute"
      :opacity="opacity"
      :value="passoverlay"
    >
      <v-container v-click-outside="onClickOutside">
        <v-text-field
          v-model="currentPassword"
          label="Enter Current Password"
          required
          class="title"
        ></v-text-field>
        <v-text-field
          v-model="newPassword"
          label="Enter New Password"
          required
          class="title"
        ></v-text-field>

        <v-btn
          color="orange lighten-2"
          @click="changePassword"
          :loading="loading"
        >
          Update Password
        </v-btn>
      </v-container>
    </v-overlay>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-btn
            block
            small
            class="mx-auto"
            outlined
            rounded
            text
            v-on:click="logOut"
          >
            Sign Out
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-btn
            block
            small
            class="mx-auto"
            rounded
            text
            color="#FF521C"
            @click="confirmoverlay = !confirmoverlay"
            :loading="loading"
          >
            Delete Account
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
    <v-overlay
      color="#26c6da"
      :absolute="absolute"
      :opacity="opacity"
      :value="confirmoverlay"
    >
      <v-container v-click-outside="onClickOutside">
        <v-col cols="12" align="center" no-gutter>
          <v-text-field
            v-model="currentPassword"
            label="Enter Current Password"
            required
            class="title"
          ></v-text-field>
        </v-col>
        <v-row align="center" justify="end">
          <v-col cols="6" align="center">
            <v-btn
              text
              outlined
              rounded
              color=" lighten-2"
              @click="confirmDelete"
              :loading="loading"
            >
              <v-icon class="mr-1"> mdi-delete </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6" align="center">
            <v-btn
              text
              outlined
              rounded
              color=" lighten-2"
              @click="confirmoverlay = !confirmoverlay"
              :loading="loading"
            >
              <v-icon class="mr-1"> mdi-cancel </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
  </v-card> -->

  <div>
    <div class="wrapper" v-click-outside="onClickOutside">
      <p class="title">Profile</p>
      <div class="container">
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
        <ul>
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
        <ul>
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
      // passoverlay: false,
      // confirmoverlay: false,
      // loading: false,
      // absolute: true,
      // opacity: 1,
      // overlay: false,
    };
  },

  computed: {},
  mounted() {},
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let userId = firebase.auth().currentUser.uid;
        user.providerData.forEach((profile) => {
          this.email = profile.email;
        });
      }
    });

    //get username
    firebase
      .database()
      .ref("users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        if (snapshot != null) {
          this.username = snapshot.val().username;
        }
      });
  },

  methods: {
    onClickOutside() {
      this.emailoverlay = false;
      this.passwordoverlay = false;
      this.confirmoverlay = false;
      this.usernameoverlay = false;
    },

    logOut() {
      this.$store.dispatch("logout");
      this.$router.go();
    },
    changeEmail() {
      this.loading = true;
      this.$store
        .dispatch("changeemail", {
          currentpassword: this.currentPassword,
          newemail: this.newEmail,
        })
        .then((response) => {
          this.loading = false;
          this.$router.go();
        })
        .catch((response) => {
          this.loading = false;
          alert("error occured");
          //no error for email already exists (need to be fixed)
          //check if email exist before requesting for email change
        });
    },

    changePassword() {
      this.loading = true;
      this.$store
        .dispatch("changepassword", {
          currentpassword: this.currentPassword,
          newpassword: this.newPassword,
        })
        .then((response) => {
          this.loading = false;
          this.$router.go();
        })
        .catch((response) => {
          this.loading = false;
          alert("error occured");
        });
    },

    confirmDelete() {
      this.loading = true;
      this.$store.dispatch("deleteaccount", {
        email: this.email,
        currentpassword: this.currentPassword,
      });
      this.loading = false;
      // this.confirmoverlay = false;
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
  position: relative;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: red;
}
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
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
li {
  margin: 2%;
  width: 50%;
}

.confirmandrejectbuttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media only screen and (max-width: 700px) {
  .wrapper {
    height: 100%;
    width: auto;
    padding: 10%;
    margin: auto;
  }
}
</style>
