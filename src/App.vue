<template>
  <div>
    <nav-bar></nav-bar>
    <router-view />
  </div>
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
<style></style>
