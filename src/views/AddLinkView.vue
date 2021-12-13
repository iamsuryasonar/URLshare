<template>
  <div>
    <div class="wrapper">
      <Snackbar></Snackbar>
      <ul @keyup.enter="addLink">
        <div class="title"> <p>Add new link</p></div>
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
import Snackbar from "../components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      overlay: false,
      items: {
        title: "",
        description: "",
        link: "",
        icon: "",
        username: "",
      },
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
      this.$store.dispatch("actionLoading", {
        loading: true,
      });
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
        })
        .then(() => {
          (this.items.title = ""),
            (this.items.description = ""),
            (this.items.link = "");

          this.$store.dispatch("actionSnackbar", {
            content: "Link Added",
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
.title p{
  color: #2e2e2e;
  margin: 15px auto;
  font-size: 30px;
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
