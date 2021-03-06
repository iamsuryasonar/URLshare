import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    auth: false,
    links: [],
    linkview_items: {
      links: [],
      username: "",
      bio: null,
      email: "",
      image_url: null,
    },
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
    setLoading(state, payload) {
      state.loading = payload;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
      state.loading = false;
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

    getitemsforlinkview({ commit }, payload) {
      commit("setLoading", true);
      this.state.linkview_items.links.length = 0;
      firebase
        .database()
        .ref("usernames/" + payload.username + "/userid/")
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            firebase
              .database()
              .ref("users/" + snapshot.val())
              .once("value", (Snapshot) => {
                (this.state.linkview_items.bio = Snapshot.val().bio),
                  (this.state.linkview_items.username = Snapshot.val().username);
                this.state.linkview_items.image_url = Snapshot.val().photo;

                commit("setLoading", false);
                if (Snapshot.val().urls != null) {
                  const obj = Snapshot.val().urls;
                  for (const key of Object.keys(obj)) {
                    this.state.linkview_items.links.push({
                      index: key,
                      title: obj[key].title,
                      description: obj[key].description,
                      link: obj[key].link,
                    });
                  }
                } else {
                  commit("setSnackbar", {
                    content: "No links found",
                    type: "error",
                  });
                }
              });
          } else {
            commit("setSnackbar", {
              content: "User does not exist!!!",
              type: "error",
            });
          }
        });
    },
    getLinks({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("usernames/" + payload.username + "/userid/")
        .once("value", (snapshot) => {
          this.state.links.length = 0;
          if (snapshot.exists()) {
            firebase
              .database()
              .ref("users/" + snapshot.val() + "/urls/")
              .once("value", (snapshot) => {
                if (snapshot.val() != null) {
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
                  commit("setSnackbar", {
                    content: "No Links found",
                    type: "warning",
                  });
                }
              });
          } else {
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
            .ref("users/" + firebase.auth().currentUser.uid)
            .set({
              username: payload.username,
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("usernames/" + payload.username)
            .set({
              userid: firebase.auth().currentUser.uid,
            });
          commit("setSnackbar", {
            content: "User registered",
            type: "success",
          });
        })
        .catch((error) => {
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
      // commit("setUser", payload);
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
              commit("setSnackbar", {
                content: "Password Updated",
                type: "success",
              });
            })
            .catch((error) => {
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
              commit("setSnackbar", {
                content: "Email Updated",
                type: "success",
              });
            })
            .catch((error) => {
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
      let value;
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .once("value", (snapshot) => {
          if (snapshot != null || snapshot.val().username != undefined) {
            value = snapshot.val().username;
          }
        });
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
    links(state) {
      return state.links;
    },
  },
});

export default store;
