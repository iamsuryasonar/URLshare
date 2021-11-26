<template>
  <div v-click-outside="onClickOutside">
    <div class="container">
      <div class="logotitle">
        <a @click="menu = false" href="/">LinkShare</a>
      </div>
      <div class="searchandmenu">
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
        <div class="menu">
          <div class="menuiconwrapper" @click="menu = !menu">
            <div class="barsicon" v-if="!menu">
              <i id="menuopenbutton" class="fas fa-bars"></i>
            </div>
            <div class="barsicon" v-if="menu">
              <i id="menuclosebutton" class="fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menuoverlay" v-if="menu">
      <div class="menuoverlaywrapper">
        <div class="menucontents">
          <div v-if="isonline">
            <a
              v-for="item in onlinenavitem"
              :key="item.icon"
              :href="item.link"
              :title="item.title"
            >
              <p @click="menu = !menu">{{ item.text }}</p>
            </a>
          </div>
          <div v-if="isoffline">
            <a
              v-for="item in offlinenavitem"
              :key="item.icon"
              :href="item.link"
              :title="item.title"
            >
              <p @click="menu = !menu">{{ item.text }}</p>
            </a>
          </div>
        </div>
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
  name: "NewNav",

  data: () => ({
    dialog: false,
    navitems: [],
    isonline: "",
    isoffline: "",
    username: "",
    menu: false,

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
    onClickOutside() {
      this.menu = false;
    },
    searchUsername() {
      if (!this.username) {
        return;
      }
      if (this.$router.currentRoute.name !== "LinkView") {
        this.$router
          .replace({ name: "LinkView", params: { username: this.username } })
          .catch((error) => {
            console.log(error.name);
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
  margin-right: 20px;
}
.searchinputandicon {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
input {
  font-size: 14px;
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
  cursor: pointer;
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

/* menu overlay */
.searchandmenu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menuiconwrapper {
  display: none;
  margin: auto;
}

#menuclosebutton,
#menuopenbutton {
  cursor: pointer;
  font-size: 2.5rem;
  color: #ffffff;
}
#menuclosebutton:hover,
#menuopenbutton:hover {
  color: #5bbdbc;
}
.menuoverlay {
  position: fixed;
  height: 250px;
  width: 100vw;
  background-color: rgb(53, 52, 52);
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menuoverlaywrapper {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.menucontents a {
  text-decoration: none;
  color: white;
}
.menucontents a:hover {
  color: #5bbdbc;
}
.menucontents p {
  cursor: pointer;
  margin: 1rem auto;
  text-align: center;
}
.menucontents p:hover {
  border-bottom: 2px solid #e4e403;
}
.menucontents {
  font-size: 2rem;
  color: white;
}

@media only screen and (max-width: 700px) {
  .navigation-items {
    display: none;
  }
  .menuiconwrapper {
    display: block;
  }
  .container {
    padding: 10px;
  }
  .searchinputandicon {
    margin: auto 0px;
  }
  .logotitle {
    font-size: 20px;
  }
  .searchinputandicon i {
    margin-left: 12px;
    font-size: 20px;
  }
  input {
    font-size: 12px;
    padding: 0.25em 0.5em;
  }
  #menuclosebutton,
  #menuopenbutton {
    font-size: 2rem;
  }
}
</style>
