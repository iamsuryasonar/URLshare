import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import router from "./routes";
import firebaseConfig from "../firebaseconfig.js";
import firebase from 'firebase/app';
import "firebase/database"
import "firebase/storage"
import "firebase/auth"
/* Initialize firebase with your configuration */
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false;

export const app = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
