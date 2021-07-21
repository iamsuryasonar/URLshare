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
                  <v-form ref="form" lazy-validation>
                    <v-text-field
                      class="mt-0 ml-3"
                      rounded
                      v-model="items.title"
                      outlined
                      small
                      placeholder="Enter Link Title"
                    >
                    </v-text-field>
                    <v-text-field
                      class="mt-0 ml-3"
                      rounded
                      v-model="items.description"
                      outlined
                      small
                      placeholder="Enter Description"
                    >
                    </v-text-field>

                    <v-text-field
                      class="ml-3 mt-0"
                      outlined
                      v-model="items.link"
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
      items: {
        title: "",
        description: "",
        link: "",
        icon: "",
        color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      },
    };
  },
  /*  beforeCreate() {
    if (this.$store.state.user=== null || this.$store.state.user===undefined) {
      this.$router.push("/LogIn");
    }
  }, */ 
  created() {
  },

  methods: {
    addLink() {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("linkprofile")
        .add({
          title: this.items.title,
          description: this.items.description,
          link: this.items.link,
          color: this.items.color,
        })
        .then(() => {
          this.$refs.form.reset();
          this.snackbar = true;
          this.loading = false;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
<style scoped>
.v-color-picker {
  background-color: #ffffff00;
}
</style>