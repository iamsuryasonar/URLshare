<template>
  <div class="wrapper">
    <Snackbar></Snackbar>
    <div class="overlaycontainer" v-click-outside="onClickOutside">
      <div class="container">
        <div class="iconandusername">
          <div class="profilepicture" @click="choose_image_overlay">
            <input
              type="file"
              ref="image_input"
              style="display: none"
              @change="previewImage"
              accept="image/*"
            />
            <span>
              <img alt="" :src="imageUrl" />
            </span>
            <div class="avataroverlay">
              <i class="fas fa-edit"> </i>
            </div>
          </div>
          <div class="usernameandcopytoclipboard">
            <a :href="text_to_copy" class="textsize username">{{ username }}</a>
            <input
              ref="myinput"
              readonly
              style="position: absolute;
  left: -9999999px;"
              :value="text_to_copy"
            />
            <a class="copytoclipboard" @click="copyToClipboard">
              <i class="far fa-clipboard"></i>
            </a>
          </div>
        </div>
        <div class="bio">
          <textarea
            v-model="bio"
            name=""
            placeholder="Enter your bio here"
            id=""
            cols="30"
            rows="4"
            class="textsize"
          ></textarea>
          <button @click="save_bio">Save bio</button>
        </div>
        <div class="emailandediticon">
          <p class="textsize">{{ email }}</p>
          <a @click="emailoverlay = !emailoverlay">
            <i class="fas fa-edit"></i
          ></a>
        </div>
        <div class="passwordandediticon">
          <p class="textsize">Password</p>
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
import firebase from "firebase/app";
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
      bio: "",
      image: null,
      imageData: null,
      display_image_after_loading: false,
    };
  },

  computed: {
    text_to_copy() {
      return "http://" + window.location.host + "/" + this.username;
    },
    imageUrl() {
      console.log(this.image);
      if (this.image != null) {
        return this.image;
      } else {
        return this.url;
      }
    },
  },
  mounted() {},
  created() {
    this.retrieveEmail();
    this.retrieveUsernameBioImage();
  },

  methods: {
    copyToClipboard() {
      this.$refs.myinput.select();
      document.execCommand("copy");
      this.$store.dispatch("actionSnackbar", {
        content: "copied to clipboard",
        type: "success",
      });
    },
    retrieveEmail() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.providerData.forEach((profile) => {
            this.email = profile.email;
          });
        }
      });
    },
    retrieveUsernameBioImage() {
      this.$store.dispatch("actionLoading", true);
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
              this.bio = snapshot.val().bio;
              this.image = snapshot.val().photo;
              this.$store.dispatch("actionLoading", false);
            }
            this.display_image_after_loading = true;
          });
      }
    },
    onClickOutside() {
      this.emailoverlay = false;
      this.passwordoverlay = false;
      this.confirmoverlay = false;
      this.usernameoverlay = false;
    },
    save_bio() {
      this.$store.dispatch("actionLoading", {
        loading: true,
      });
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .update({
          bio: this.bio,
        })
        .then(() => {
          this.$store.dispatch("actionSnackbar", {
            content: "Bio updated",
            type: "success",
          });
        });
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
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
        });
    },

    logOut() {
      this.$store.dispatch("logout");
    },
    confirmDelete() {
      this.$store
        .dispatch("deleteaccount", {
          email: this.email,
          currentpassword: this.currentPassword,
        })
        .catch((error) => {
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
        });
    },
    //-----------image upload---------------------------->

    //todo: compress image before upload
    choose_image_overlay() {
      this.$refs.image_input.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.$store.dispatch("actionLoading", {
        loading: true,
      });
      this.image = null;
      const storageRef = firebase
        .storage()
        .ref("profilepictures/" + firebase.auth().currentUser.uid)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.image = url;
            this.create();
          });
        }
      );
    },
    create() {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .update({
          photo: this.image,
        })
        .then(() => {
          this.$store.dispatch("actionSnackbar", {
            content: "profile picture updated",
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
html {
  background-color: #151515;
}

*,
p {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: #45494d;
}

.wrapper {
  width: 50%;
  height: auto;
  margin: 50px auto;
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
  color: #2e2e2e;
  margin: auto;
  font-size: 30px;
  font-family: "Montserrat", sans-serif;
}
.profilepicture {
  position: relative;
}
img {
  width: 140px;
  height: 140px;
  margin: auto 20px;
  object-position: center;
  border-radius: 50%;
}
.avataroverlay {
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.1;
  background: transparent;
  margin: auto 20px;
  width: 140px;
  height: 140px;
  display: grid;
}
.avataroverlay:hover {
  filter: blur(0.4px);
  background: linear-gradient(to right, #676869, #363636);
  opacity: 0.8;
}
.avataroverlay i {
  margin: auto;
}
.avataroverlay i:hover {
  color: black;
}

.iconandusername {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.copytoclipboard {
  align-self: center;
  cursor: pointer;
  font-size: 25px;
  color: #45494d;
  margin: auto 20px;
  font-family: "Montserrat", sans-serif;
}
.usernameandcopytoclipboard {
  display: flex;
  flex-direction: row;
}
.bio {
  margin: 15px 0px;
}
.bio textarea {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  margin: auto;
  padding: 5px;
  background-color: transparent;
}
.bio button {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  margin: auto;
  margin-top: 10px;
}

.emailandediticon {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  color: white;
  margin-bottom: 50px;
}
.buttondelete:hover {
  color: red;
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
  font-size: 18px;
  color: aliceblue;
  text-decoration: none;
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
i:hover {
  color: rgb(45, 209, 154);
}

.confirmandrejectbuttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.textsize {
  font-size: 22px;
  font-family: "Montserrat", sans-serif;
}

@media only screen and (max-width: 1100px) and (min-width: 701px) {
  .copytoclipboard {
    font-size: 22px;
  }
  .textsize {
    font-size: 18px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  .avataroverlay {
    width: 100px;
    height: 100px;
  }
  .wrapper {
    height: 100%;
    width: 95%;
    padding: 8%;
  }
}
@media only screen and (max-width: 700px) {
  .wrapper {
    height: 80vh;
    width: auto;
    padding: 4%;
    margin: 40px auto;
  }
  .copytoclipboard {
    font-size: 18px;
  }
  .textsize {
    font-size: 16px;
  }
  img {
    width: 70px;
    height: 70px;
  }
  .avataroverlay {
    width: 70px;
    height: 70px;
  }
}
</style>
