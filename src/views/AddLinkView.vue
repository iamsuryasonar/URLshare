<template>
  <!-- <div>
    <div class="text-center">
      <v-snackbar color="#182B6F" v-model="snackbar" :timeout="timeout">
        Link Added!
      </v-snackbar>
    </div>

    <v-card height="0" max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col class="collection mt-10" cols="12">
            <v-card color="green" dark>
              <v-card-title class="ml-15">Add Link</v-card-title>
              <div class="mt-3 d-flex flex-no-wrap justify-space-around">
                <div>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      class="mt-0 ml-3"
                      rounded
                      v-model="items.title"
                      :rules="titleRules"
                      required
                      outlined
                      small
                      placeholder="Enter Link Title"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mt-0 ml-3"
                      rounded
                      v-model="items.description"
                      :rules="descriptionRules"
                      required
                      outlined
                      small
                      placeholder="Enter Description"
                    >
                    </v-text-field>

                    <v-text-field
                      class="ml-3 mt-0"
                      outlined
                      v-model="items.link"
                      :rules="urlRules"
                      required
                      rounded
                      placeholder="Enter Link"
                      target="_blank"
                    >
                    </v-text-field>
                  </v-form>
                  <v-btn
                    block
                    large
                    class="ml-3 mt-4 mb-8"
                    :disabled="isDisabled"
                    :loading="loading"
                    @click="addLink"
                    outlined
                    rounded
                    text
                  >
                    Linkify
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div> -->

  <div>
    <div class="wrapper">
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
          required>
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
          <button 
          @click="addLink">
          Save
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      //snackbar: false,
      timeout: 2000,
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
      // this.$refs.form.validate();
      this.loading = true;
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
      }else if (this.items.link.substr(0, 3) === "www") {
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
          alert("link added")
          this.loading = false;
          // this.$refs.form.reset();
          // this.snackbar = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          alert(error.message);
        });
      // this.$refs.form.reset();
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
  height: auto;
  margin: auto;
  /* position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0; */
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
input, textarea {
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
  width: 50%;
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
