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
            <v-card :color="item.color" :href="'//' + item.link" dark>
              <div class="mt-5 d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title v-text="item.title"></v-card-title>
                  <v-card-subtitle v-text="item.description"></v-card-subtitle>
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
import routes from "../routes";

export default {
  data() {
    return {
      items: [],
      userid: "",
      username: "",
      userIdOfUsername: "",
    };
  },

  created() {
    firebase
      .database()
      .ref("usernames/" + this.$route.params.username + "/userid/")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          this.userIdOfUsername = snapshot.val();
          this.getData();
        } else {
          alert("User does not exist!!!");
        }
      });
  },

  methods: {
    getData() {
      firebase
        .database()
        .ref("users/" + this.userIdOfUsername + "/urls/")
        .on("value", (snapshot) => {
          if (snapshot.val() != null) {
            snapshot.forEach((childSnapshot) => {
              this.items.push({
                index: childSnapshot.key,
                title: childSnapshot.val().title,
                description: childSnapshot.val().description,
                link: childSnapshot.val().link,
                color: childSnapshot.val().color,
              });
            });
          } else {
            alert("No links found!!!");
          }
        });
    },
  },
};
</script>
