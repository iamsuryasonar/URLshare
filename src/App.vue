<template>
  <div>
    <spinner></spinner>
    <nav-bar></nav-bar>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Spinner from "./components/Spinner.vue";
export default {
  name: "App",

  components: {
    NavBar,
    Spinner,
  },
  computed: {},
  methods: {},
  created() {},
};
</script>
<style scoped></style>
