<template>
  <div>
    <v-app-bar light elevate-on-scroll absolute color="transparent">
      <v-toolbar-title class="title font-weight-light"
        >Link Share</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-list>
        <v-list-item v-if="isonline">
          <v-btn
            v-for="item in onlinenavitem"
            :key="item.icon"
            :to="item.link"
            :title="item.title"
            text
            >{{ item.text }}</v-btn
          >
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item v-if="isoffline">
          <v-btn
            v-for="item in offlinenavitem"
            :key="item.icon"
            :to="item.link"
            :title="item.title"
            text
            >{{ item.text }}</v-btn
          >
        </v-list-item>
      </v-list>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "NewNav",

  data: () => ({
    dialog: false,
    navitems: [],
    isonline: "",
    isoffline: "",

    onlinenav: [
      {
        icon: "Profile",
        link: "/Profile",
        text: "Profile",
        name: "Profile",
        online: "true",
      },
      {
        icon: "add",
        link: "/AddLinkView",
        text: "Add Link",
        name: "AddLinkView",
        online: "true",
      },
      {
        icon: "delete",
        link: "/DeleteLinkView",
        text: "Delete Link",
        name: "DeleteLinkView",
        online: "true",
      },
    ],
    offlinenav: [
      {
        icon: "login",
        link: "/LogIn",
        text: "Log In",
        name: "LogIn",
        online: "false",
      },
      {
        icon: "signup",
        link: "/Register",
        text: "Register",
        name: "Register",
        online: "false",
      },
    ],
  }),

  method: {},

  computed: {
    onlinenavitem() {
      return this.onlinenav.filter((item) => item.name != this.$route.name);
    },
    offlinenavitem() {
      return this.offlinenav.filter((item) => item.name != this.$route.name);
    },
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isonline = true;
        this.isoffline = false;
      } else {
        this.isonline = false;
        this.isoffline = true;
      }
    });
  },
};
</script>
<style>
.app-bar {
  transition: top 0.3s;
}
</style>
