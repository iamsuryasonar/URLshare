<template>
  <div
    class="snackbar"
    v-bind:style="{ 'background-color': color }"
    v-if="snackbarstatus"
  >
    <p>{{ content }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      color: "",
    };
  },
  computed: {
    snackbarstatus() {
      if (this.$store.state.snackbarcontent.status === true) {
        this.content = this.$store.state.snackbarcontent.content;
        this.color = this.$store.state.snackbarcontent.color;
        return true;
      } else {
        return false;
      }
    },
  },
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
}
.snackbar p {
  font-size: 20px;
}
</style>
