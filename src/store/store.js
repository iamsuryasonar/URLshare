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
          };
          commit("setUser", newUser);
        })
        .then(() => {
          firebase
            .firestore()
            .collection("usernames")
            .doc(payload.username)
            .set({
              userid: firebase.auth().currentUser.uid,
            })
            .then(() => {
              firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                  username: payload.username,
                });
            });
        })
        .then(() => {})
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

    updateusername({ commit }, payload) {
      var userId = firebase.auth().currentUser.uid;
      return new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("usernames")
          .doc(payload.newusername)
          .set({
            userid: firebase.auth().currentUser.uid,
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(userId)
              .set({
                username: payload.newusername,
              });
          })
          .then(() => {
            this.snackbar = true;
            this.loading = false;
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
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
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .collection("linkprofile")
            .get()
            .then((res) => {
              res.forEach((element) => {
                element.ref.delete();
              });
            })
            .then(() =>
              db
                .collection("users")
                .doc(userId)
                .delete()
            )
            .then(
              () => firebase.auth().currentUser.delete(),
              (this.confirmoverlay = false)
            );
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
