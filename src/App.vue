<template>
  <v-app>
    <v-layout row justify-center>
      <nav-bar></nav-bar>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-main>
            <div class="mt-15">
              <transition name="fade" mode="out-in">
                <router-view />
              </transition>
            </div>
          </v-main>
        </v-slide-y-transition>
      </v-container>
    </v-layout>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",

  components: {
    NavBar,
  },
  computed: {},
  methods: {},
  created() {},
};
</script>
<style>
.app-bar {
  transition: top 0.3s;
}
</style>
