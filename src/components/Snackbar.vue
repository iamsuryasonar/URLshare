<template>
  <div
    class="snackbar"
    v-if="snackbarstatus"
    v-bind:style="{ 'background-color': color }"
  >
    <p v-bind:style="{ color: pcolor }">{{ content }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      color: "",
      pcolor: "",
    };
  },
  computed: {
    snackbarstatus() {
      if (this.$store.state.snackbar.content != null) {
        this.content = this.$store.state.snackbar.content;
        if (this.$store.state.snackbar.type === "success") {
          this.color = "#DFF2BF";
          this.pcolor = "#4F8A10";
        } else if (this.$store.state.snackbar.type === "error") {
          this.color = "#FFD2D2";
          this.pcolor = "#D8000C";
        } else if (this.$store.state.snackbar.type === "warning") {
          this.color = "#FEEFB3";
          this.pcolor = "#9F6000";
        } else if (this.$store.state.snackbar.type === "info") {
          this.color = "#BDE5F8";
          this.pcolor = "#00529B";
        }
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {},
};
</script>
<style scoped>
.snackbar {
  width: 100%;
  height: 80px;
  margin: 20px auto;
  display: grid;
  align-content: center;
  justify-content: center;
  border-radius: 5px;
  padding: 15px;
}
.snackbar p {
  font-size: 20px;
}
</style>
