import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store/store'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';
import router from './routes';
import firebaseConfig from './firebaseconfig.js'

// Vue.use(Vuex)
  
require('firebase/firestore');

firebase.initializeApp(firebaseConfig);
firebase.analytics();
Vue.prototype.$firebase = firebase;
Vue.config.productionTip = false


const app =  new Vue({
  store,
  vuetify,
  router,

  // created() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.$store.dispatch('autoSignIn', user)
  //       this.$store.dispatch('actionauthenticated', "true")
  //       console.log("main user is online")
  //     }
  //     else if(!user){
  //       this.$store.dispatch('actionauthenticated', "false")
  //       console.log("main user is offline")
  //     }
  //     console.log("authentication in main.js= ", this.$store.state.auth)
  //   })
  // },


render: h => h(App),
}).$mount('#app')

