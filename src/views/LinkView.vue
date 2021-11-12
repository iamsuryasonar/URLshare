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
            <v-card :color="item.color" :href="item.link" dark>
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
import { app } from "../main";
export default {
  data() {
    return {
      items: this.$store.state.links,
      userid: "",
      userIdOfUsername: "",
    };
  },
  computed: {},

  created() {
    this.$store.dispatch("getLinks", {
      username: this.$route.params.username,
    });
  },

  methods: {},
};
</script>
