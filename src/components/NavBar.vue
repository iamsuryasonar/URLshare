<template>
  <div class="container">
    <div class="logotitle">
      <p>LinkShare</p>
    </div>
    <div class="searchandnavigationitems">
      <div class="navigation-items">
        <div v-if="isonline">
          <a
            v-for="item in onlinenavitem"
            :key="item.icon"
            :href="item.link"
            :title="item.title"
            >{{ item.text }}</a
          >
        </div>
        <div v-if="isoffline">
          <a
            v-for="item in offlinenavitem"
            :key="item.icon"
            :href="item.link"
            :title="item.title"
            >{{ item.text }}</a
          >
        </div>
      </div>
      <div class="searchinputandicon">
        <input
          placeholder="Username"
          type="text"
          name="Username"
          autocomplete="off"
          required
          v-model="username"
          @keyup.enter="searchUsername"
        />
        <i class="fas fa-search" @click="searchUsername"></i>
      </div>
    </div>
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
    username: "",

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

  methods: {
    searchUsername() {
      if (this.$router.currentRoute.name !== "LinkView") {
        this.$router
          .replace({ name: "LinkView", params: { username: this.username } })
          .catch((error) => {
            alert(error.name);
          });
      } else {
        this.$store.dispatch("getLinks", {
          username: this.username,
        });
      }
    },
  },

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
<style scoped>
.container {
  width: 100%;
  height: 50px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logotitle {
  font-size: 30px;
}
.searchinputandicon {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
input {
  border: 1px solid rgb(45, 209, 154);
  border-radius: 0.25rem;
  padding: 0.5em 0.75em;
  color: white;
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

i {
  margin-left: 18px;
  font-size: 28px;
}
.searchandnavigationitems {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.searchandnavigationitems a {
  margin: auto 20px;
}
a {
  cursor: pointer;
  color: black;
  text-decoration-line: none;
}
a:hover,
i:hover {
  color: red;
}
i {
  cursor: pointer;
}
.searchinputandicon {
}
.navigation-items {
}
</style>
