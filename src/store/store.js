import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    auth: false,
    loading: false,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuth(state, payload) {
      // state.auth = payload
      if (payload != null) {
        state.auth = true;
      } else {
        state.auth = false;
      }
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    actionauthenticated({ commit }, payload) {
      commit("setAuth", payload);
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            username: payload.username,
          };
          commit("setUser", newUser);
        })
        .then(() => {
          firebase
            .database()
            .ref("usernames/" + payload.username)
            .set({
              userid: firebase.auth().currentUser.uid,
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .set({
              username: payload.username,
            });
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      // autoSignIn({ commit }, payload) {
      // commit('setUser', {
      //     id: payload.uid,
      //     name: payload.displayName,
      //     email: payload.email,
      // })
      commit("setAuth", true);
      //console.log(payload,"done")
    },
    logout({ commit }) {
      firebase.auth().signOut();
      //commit('setUser', null)
      commit("setAuth", null);
    },

    changepassword({ commit }, payload) {
      var user = firebase.auth().currentUser;
      return new Promise((resolve, reject) => {
        user
          .reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(
              user.email,
              payload.currentpassword
            )
          )
          .then(() => {
            user
              .updatePassword(payload.newpassword)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          });
        //not sure if it gonna work
        //   .catch((error) => {
        //     reject(password);
        //   });
      });
    },

    changeemail({ commit }, payload) {
      var user = firebase.auth().currentUser;
      return new Promise((resolve, reject) => {
        user
          .reauthenticateWithCredential(
            firebase.auth.EmailAuthProvider.credential(
              user.email,
              payload.currentpassword
            )
          )
          .then(() => {
            user
              .updateEmail(payload.newemail)
              .then(() => {
                resolve();
              })
              .catch((error) => {
                reject();
              });
          })
          .catch((error) => {
            reject();
          });
      });
    },
    deleteaccount({ commit }, payload) {
      var user = firebase.auth().currentUser;
      const db = firebase.firestore();
      var userId = firebase.auth().currentUser.uid;
      firebase
        .auth()
        .currentUser.reauthenticateWithCredential(
          firebase.auth.EmailAuthProvider.credential(
            user.email,
            payload.currentpassword
          )
        )
        .then(() => {
          firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .remove()
            .then(() => {
              firebase.auth().currentUser.delete(),
                (this.confirmoverlay = false);
            })
            //---------> username also needs to be deleted <-----------
            .catch((error) => {
              alert(error.message);
            });
        });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    auth(state) {
      return state.auth;
    },
    loading(state) {
      return state.loading;
    },
  },
});

export default store;
