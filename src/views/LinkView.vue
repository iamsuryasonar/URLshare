<template>
  <div>
    <v-card height="0" max-width="400" class="mx-auto">
      <v-container>
        <v-row dense>
          <v-col
            v-for="(item, i) in items"
            :key="i"
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
                      :href="'http://'+item.link"
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
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
import routes from '../routes';

export default {
  data() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      }
    });
    return {
      items: [],
      userid: "",
      username: "",
    };
  },
  watch:{
     $route(to, from) {
      this.username = to.params.username //this is never used
    }  
  },

  created() {
    var docRef = firebase.firestore().collection("usernames").doc(this.$route.params.username);

    docRef.get().then((doc) => {
        if (doc.exists) {
            this.userid = doc.data().userid;
            this.getData();
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  },

  methods: {
    async getData() {
      const db = this.$firebase
        .firestore()
        .collection("users")
        .doc(this.userid);

      db.collection("linkprofile")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.items.push(doc.data());
          });
        });
    },
  },
};
</script>
