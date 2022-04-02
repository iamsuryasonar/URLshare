import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/store";
import firebase from 'firebase/app';
Vue.use(VueRouter);

function guardwhenoffline(to, from, next) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch("autoSignIn", user);
      store.dispatch("actionauthenticated", "true");
      next();
    } else if (!user) {
      store.dispatch("actionauthenticated", "false");
      next("/login");
    }
  });
}

function guardwhenonline(to, from, next) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch("autoSignIn", user);
      store.dispatch("actionauthenticated", "true");
      next("/Profile");
    } else if (!user) {
      store.dispatch("actionauthenticated", "false");
      next();
    }
  });
}

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “unauth” */ "./views/Welcome.vue"
        ),
      beforeEnter: guardwhenonline,
    },
    {
      path: "/LogIn",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “unauth” */ "./views/LogIn.vue"
        ),
      name: "LogIn",
      title: "Log In",
      meta: {
        authRequired: false,
      },
      beforeEnter: guardwhenonline,
    },

    {
      path: "/Register",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “unauth” */ "./views/Register.vue"
        ),
      name: "Register",
      title: "Register",
      meta: {
        authRequired: false,
      },
      beforeEnter: guardwhenonline,
    },
    {
      path: "/MyLinks",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “auth” */ "./views/MyLinks.vue"
        ),
      name: "MyLinks",
      title: "Delete Links",
      meta: {
        authRequired: true,
      },
      beforeEnter: guardwhenoffline,
    },
    {
      path: "/AddLinkView",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “auth” */ "./views/AddLinkView.vue"
        ),
      name: "AddLinkView",
      title: "Add Links",
      meta: {
        authRequired: true,
      },
      beforeEnter: guardwhenoffline,
    },
    {
      path: "/Profile",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “auth” */ "./views/Profile.vue"
        ),
      name: "Profile",
      title: "Profile",
      meta: {
        authRequired: true,
      },
      beforeEnter: guardwhenoffline,
    },
    {
      path: "/:username",
      component: () =>
        import(
          /* webpackPrefetch: true */ /* webpackChunkName: “unauth” */ "./views/LinkView.vue"
        ),
      name: "LinkView",
    },
  ],
  mode: "history",
});

export default router;
