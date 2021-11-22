import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    auth: false,
    links: [],
    loading: false,
    snackbar: {
      content: null,
      type: "",
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAuth(state, payload) {
      if (payload != null) {
        state.auth = true;
      } else {
        state.auth = false;
      }
    },
    setLinks(state, payload) {
      state.links = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
      setTimeout(() => {
        state.snackbar.content = null;
      }, 4000);
    },
  },
  actions: {
    actionauthenticated({ commit }, payload) {
      commit("setAuth", payload);
    },
    actionLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
    actionSnackbar({ commit }, payload) {
      commit("setSnackbar", payload);
    },

    getLinks({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("usernames/" + payload.username + "/userid/")
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            firebase
              .database()
              .ref("users/" + snapshot.val() + "/urls/")
              .on("value", (snapshot) => {
                if (snapshot.val() != null) {
                  this.state.links.length = 0;

                  snapshot.forEach((childSnapshot) => {
                    this.state.links.push({
                      index: childSnapshot.key,
                      title: childSnapshot.val().title,
                      description: childSnapshot.val().description,
                      link: childSnapshot.val().link,
                      color: childSnapshot.val().color,
                    });
                    commit("setLoading", false);
                  });
                } else {
                  commit("setLoading", false);
                  alert("No links found!!!");
                }
              });
          } else {
            commit("setLoading", false);
            commit("setSnackbar", {
              content: "User does not exist!!!",
              type: "error",
            });
          }
        });
    },

    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
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

          commit("setLoading", false);
          commit("setSnackbar", {
            content: "User registered",
            type: "success",
          });
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setSnackbar", {
            content: error.message,
            type: "error",
          });
        });
    },

    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
          };
          commit("setLoading", false);
          commit("setUser", newUser);
          commit("setSnackbar", {
            content: "User Logged In",
            type: "success",
          });
        })
        .catch((error) => {
          commit("setSnackbar", {
            content: error.message,
            type: "error",
          });
          commit("setLoading", false);
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
    },
    logout({ commit }) {
      commit("setLoading", true);
      firebase.auth().signOut();
      commit("setAuth", null);
      commit("setLoading", false);
    },

    changepassword({ commit }, payload) {
      commit("setLoading", true);
      var user = firebase.auth().currentUser;
      return user
        .reauthenticateWithCredential(
          firebase.auth.EmailAuthProvider.credential(
            user.email,
            payload.currentpassword
          )
        )
        .then(() => {
          return user
            .updatePassword(payload.newpassword)
            .then(() => {
              commit("setLoading", false);

              commit("setSnackbar", {
                content: "Password Updated",
                type: "success",
              });
            })
            .catch((error) => {
              commit("setLoading", false);
              commit("setSnackbar", {
                content: error.message,
                type: "error",
              });
            });
        });
    },

    changeemail({ commit }, payload) {
      commit("setLoading", true);
      var user = firebase.auth().currentUser;
      return user
        .reauthenticateWithCredential(
          firebase.auth.EmailAuthProvider.credential(
            user.email,
            payload.currentpassword
          )
        )
        .then(() => {
          return user
            .updateEmail(payload.newemail)
            .then(() => {
              commit("setLoading", false);
              commit("setSnackbar", {
                content: "Email Updated",
                type: "success",
              });
            })
            .catch((error) => {
              commit("setLoading", false);
              commit("setSnackbar", {
                content: error.message,
                type: "error",
              });
            });
        });
    },
    deleteaccount({ commit }, payload) {
      commit("setLoading", true);
      var user = firebase.auth().currentUser;
      const db = firebase.firestore();
      let value;
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .once("value", (snapshot) => {
          if (snapshot != null || snapshot.val().username != undefined) {
            value = snapshot.val().username;
          }
        });
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
            .ref("usernames/" + value)
            .remove();
        })
        .then(() => {
          firebase
            .database()
            .ref("users/" + firebase.auth().currentUser.uid)
            .remove();
        })
        .then(() => {
          firebase.auth().currentUser.delete(), commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setSnackbar", {
            content: error.message,
            type: "error",
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
  },
});

export default store;
