<template>
  <div>
    <div class="wrapper">
      <snack-bar></snack-bar>
      <ul>
        <li class="list_items">
          <input
            placeholder="Title"
            type="text"
            name="Title"
            autocomplete="off"
            required
            v-model="items.title"
          />
        </li>
        <li class="list_items">
          <textarea
            rows="5"
            placeholder="Description"
            v-model="items.description"
            autocomplete="off"
            name="Description"
            required
          >
          </textarea>
        </li>
        <li class="list_items">
          <input
            placeholder="Url"
            type="text"
            name="Title"
            autocomplete="off"
            v-model="items.link"
            required
          />
        </li>
        <li class="list_items">
          <button @click="addLink">
            Save
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import SnackBar from "../components/snackbar.vue";
export default {
  components: {
    SnackBar,
  },
  data() {
    return {
      overlay: false,
      valid: true,
      loading: false,

      items: {
        title: "",
        description: "",
        link: "",
        icon: "",
        username: "",
      },
      titleRules: [(v) => !!v || "Title is required"],
      descriptionRules: [(v) => !!v || "Description is required"],
      urlRules: [(v) => !!v || "Url is required"],
    };
  },
  computed: {
    isDisabled() {
      if (
        this.items.title != "" &&
        this.items.description != "" &&
        this.items.link != ""
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {},

  methods: {
    addLink() {
      var uniqueUrlKey = firebase
        .database()
        .ref()
        .child("urls")
        .push().key;

      //trims and then concat https:// to url(link)
      this.items.link.trim();
      if (this.items.link.substr(0, 8) === "https://") {
        this.items.link = this.items.link;
      } else if (this.items.link.substr(0, 7) === "http://") {
        this.items.link = "https://" + this.items.link.replace("http://", "");
      } else if (this.items.link.substr(0, 3) === "www") {
        this.items.link = "https://" + this.items.link;
      }

      firebase
        .database()
        .ref(
          "users/" + firebase.auth().currentUser.uid + "/urls/" + uniqueUrlKey
        )
        .set({
          id: uniqueUrlKey,
          title: this.items.title,
          description: this.items.description,
          link: this.items.link,
          //to add random color everytime a new link is added
          color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
        })
        .then(() => {
          this.$store.dispatch("actionSnackbar", {
            status: true,
            content: "Link Added",
            color: "#d0fba7",
          });
        })
        .catch((error) => {
          this.$store.dispatch("actionSnackbar", {
            status: true,
            content: error.message,
            color: "#f69797ef",
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

li,
button {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: aliceblue;
  text-decoration: none;
}
.list_items {
  list-style: none;
}
input,
textarea {
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
  margin: 2%;
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

#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
