import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './store/store'
import LogIn from './views/LogIn.vue'
import firebase from 'firebase';
import Register from './views/Register.vue'
import Welcome from './views/Welcome.vue'
import AddLinkView from './views/AddLinkView.vue'
import DeleteLinkView from "./views/DeleteLinkView";
import Profile from './views/Profile.vue';
import LinkView from './views/LinkView.vue'
import ForgotPassword from './views/ForgotPassword.vue'

Vue.use(VueRouter);



function guardwhenoffline(to, from, next)
{

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('autoSignIn', user)
      store.dispatch('actionauthenticated', "true")
      next();
    }
    else if(!user){
      store.dispatch('actionauthenticated', "false")
      next('/login'); 
    }
  })
}

function guardwhenonline(to, from, next)
{
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch('autoSignIn', user)
      store.dispatch('actionauthenticated', "true")
      next('/Profile');
    }
    else if(!user){
      store.dispatch('actionauthenticated', "false")
      next();
    }
  })
}


const router = new VueRouter({
  routes: [
    
    {
      path: '/',
      component: Welcome,
      beforeEnter : guardwhenonline,
    },
    {
      path: '/LogIn',
      component: LogIn,
      name: "LogIn",
      title: "Log In",
      meta: {
        authRequired: false,
      },
      beforeEnter : guardwhenonline,
    },
    {
      path: '/ForgotPassword',
      component: ForgotPassword,
      name: "ForgotPassword",
      title: "Forgot Password",
      meta: {
        authRequired: false,
      },
      beforeEnter : guardwhenonline,
    },
    
    {
      path: '/Register',
      component: Register,
      name: "Register",
      title: "Register",
      meta: {
        authRequired: false,
      },
      beforeEnter : guardwhenonline,
    },
    {
      path: '/DeleteLinkView',
      component: DeleteLinkView,
      name: "DeleteLinkView",
      title: "Delete Links",
      meta: {
        authRequired: true,
      },
      beforeEnter : guardwhenoffline,
    },
    {
      path: '/AddLinkView',
      component: AddLinkView,
      name: "AddLinkView",
      title: "Add Links",
      meta: {
        authRequired: true,
      },
      beforeEnter : guardwhenoffline,
    },
    {
      path: '/Profile',
      component: Profile,
      name: "Profile",
      title: "Profile",
      meta: {
        authRequired: true,
      },
      beforeEnter : guardwhenoffline,
    },
    {
      path: '/:username',
      component: LinkView,
      name: "LinkView",
    },
  ],
  mode: 'history'
})

export default router;

