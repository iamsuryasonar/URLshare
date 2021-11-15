import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: {},
    auth: false,
    loading: false,
    links: [],
    snackbarcontent: {
      status: false,
      content: "",
      color: "",
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
    setLinks(state, payload) {
      state.links = payload;
    },
    setSnackbar(state, payload) {
      state.snackbarcontent.content = payload.content;
      state.snackbarcontent.color = payload.color;
      state.snackbarcontent.status = payload.status;

      setTimeout(() => {
        state.snackbarcontent.status= false
        state.snackbarcontent.content= ""
        state.snackbarcontent.color= ""
      }, 1500);
    },
  },
  actions: {
    actionauthenticated({ commit }, payload) {
      commit("setAuth", payload);
    },
    actionSnackbar({ commit }, payload) {
      commit("setSnackbar", payload);
    },

    getLinks({ commit }, payload) {
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
                  });
                } else {
                  alert("No links found!!!");
                }
              });
          } else {
            alert("User does not exist!!!");
          }
        });
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
          commit("setSnackbar", {
            status: true,
            content: error,
            color: "#f69797ef",
          });
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
          commit("setSnackbar", {
            status: true,
            content: error,
            color: "#f69797ef",
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
      //console.log(payload,"done")
    },
    logout({ commit }) {
      firebase.auth().signOut();
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
                commit("actionSnackbar", {
                  status: true,
                  content: "Password Updated",
                  color: "#d0fba7",
                });
              })
              .catch((error) => {
                commit("setSnackbar", {
                  status: true,
                  content: error,
                  color: "#f69797ef",
                });
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
    snackbar(state) {
      return state.snackbarcontent;
    },
  },
});

export default store;
