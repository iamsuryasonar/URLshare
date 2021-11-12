<template>
  <div>
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
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      snackbar: false,
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
      this.$refs.form.validate();
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
          this.loading = false;
          this.$refs.form.reset();
          this.snackbar = true;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          alert(error.message);
        });
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
.v-color-picker {
  background-color: #ffffff00;
}
</style>
