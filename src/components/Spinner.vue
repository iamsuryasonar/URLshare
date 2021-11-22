<template>
  <div class="spinnercontainer" v-if="loading">
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    loading() {
      if (this.$store.state.loading) {
        return true;
      } else if (this.$store.state.loading) {
        return false;
      }
    },
  },
};
</script>
<style scoped>
.spinnercontainer {
  position: fixed;
  width: 15vw;
  height: 15vw;
  margin: auto;
  left: 0;
  right: 0;
  top: 40%;
  display: grid;
  justify-content: center;
  align-items: center;
  text-align: center;
  backdrop-filter: blur(8px);
  z-index: 999;
  border-radius: 50%;
  box-shadow: 7px 5px 13px -3px rgba(77, 77, 77, 0.65);
}
.spinnercontainer p {
  margin: 10px auto;
  font-size: 20px;
}
.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #000;
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>
