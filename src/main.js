import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import firebase from "firebase";
import router from "./routes";
import firebaseConfig from "../firebaseconfig.js";


require("firebase/firestore");
firebase.initializeApp(firebaseConfig);

firebase.analytics();
Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false;

export const app = new Vue({
  store,
  router,
  render: (h) => h(App),

  created() { },
}).$mount("#app");
