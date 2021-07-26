<template>
  <v-card class="mx-auto" color="#26c6da" dark max-width="400">
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
  </v-card>
</template>

<script>
import firebase from "firebase";
import store from "../store/store";
export default {
  data() {
    return {
      url:
        "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light",
      emailoverlay: false,
      passoverlay: false,
      confirmoverlay: false,
      loading: false,
      absolute: true,
      opacity: 1,
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      Password: "",
      username: "",
      email: "",
    };
  },

  computed: {
  },
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
      this.passoverlay = false;
      this.confirmoverlay = false;
      this.usernameoverlay = false;
    },

    logOut() {
      this.$store.dispatch("logout");
      this.$router.go();
    },

    changeEmail() {
      this.$store
        .dispatch("changeemail", {
          currentpassword: this.currentPassword,
          newemail: this.newEmail,
        })
        .then((response) => {
          this.$router.go();
        })
        .catch((response) => {
          alert("error occured");
          //no error for email already exists (need to be fixed)
          //check if email exist before requesting for email change
        });
    },

    changePassword() {
      this.$store
        .dispatch("changepassword", {
          currentpassword: this.currentPassword,
          newpassword: this.newPassword,
        })
        .then((response) => {
          this.$router.go();
        })
        .catch((response) => {
          alert("error occured");
        });
    },

    confirmDelete() {
      this.$store.dispatch("deleteaccount", {
        email: this.email,
        currentpassword: this.currentPassword,
      });
      this.confirmoverlay = false;
    },
  },
};
</script>
<style scoped>
.v-color-picker {
  background-color: #ffffff00;
}
</style>
