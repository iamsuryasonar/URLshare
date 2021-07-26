<template>
  <div>
    <v-card height="0" max-width="450" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col
            v-for="(item, index) in items"
            :key="index"
            class="collection"
            cols="12"
          >
            <v-card :color="item.color" dark>
              <div class="mt-5 d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title v-text="item.title"></v-card-title>
                  <v-card-subtitle v-text="item.description"></v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      class="ml-2 mt-2"
                      outlined
                      rounded
                      small
                      :href="'//' + item.link"
                      target="_blank"
                      text
                    >
                      Linkify
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-4" size="100" tile>
                  <v-img :src="item.src"></v-img>
                </v-avatar>
              </div>
              <v-container>
                <v-btn outlined rounded small @click="deletebtn(item.index)"
                  >delete</v-btn
                >
              </v-container>
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
      items: [],
    };
  },
  /*  beforeCreate() {
    if (this.$store.state.user) {
      this.$router.push("/LogIn");
    }
  }, */
  created() {},

  methods: {
    getData() {
      this.items = [];
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid + "/urls/")
        .on("value", (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            this.items.push({
              index: childSnapshot.key,
              title: childSnapshot.val().title,
              description: childSnapshot.val().description,
              link: childSnapshot.val().link,
              color: childSnapshot.val().color,
            });
          });
        });
    },

    deletebtn(index) {
      firebase
        .database()
        .ref(
          "users/" + firebase.auth().currentUser.uid + "/urls/" + index + "/"
        )
        .remove()
        .then(() => {
          // this.$router.go();
          this.getData();
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
