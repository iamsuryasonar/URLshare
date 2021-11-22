<template>
  <div class="main">
    <Snackbar class="snackbar"></Snackbar>
    <div class="card-wrap" v-for="(item, index) in items" :key="index">
      <div class="card-header one">
        <i class="fas fa-code"></i>
      </div>
      <div class="card-content">
        <h1 class="card-title">{{ item.title }}</h1>
        <p class="card-text">{{ item.description }}</p>
        <div class="buttons">
          <button class="card-btn one" @click="clickedlink(item.link)">
            Linkify
          </button>
          <button class="card-btn one" @click="deletebtn(item.index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Snackbar from "../components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      items: this.$store.state.links,
      username: "",
    };
  },
  created() {
    this.getData();
  },

  methods: {
    getData() {
      firebase
        .database()
        .ref("users/" + firebase.auth().currentUser.uid)
        .on("value", (snapshot) => {
          if (snapshot != null) {
            this.$store.dispatch("getLinks", {
              username: snapshot.val().username,
            });
          }
        });
    },
    clickedlink(link) {
      window.location.href = link;
    },

    deletebtn(index) {
      firebase
        .database()
        .ref(
          "users/" + firebase.auth().currentUser.uid + "/urls/" + index + "/"
        )
        .remove()
        .then(() => {
          this.$store.dispatch("actionSnackbar", {
            content: "Link deleted",
            type: "success",
          });
          this.getData();
        })
        .catch((error) => {
          this.$store.dispatch("actionSnackbar", {
            content: error.message,
            type: "error",
          });
        });
    },
  },
};
</script>
<style scoped>
.main {
  width: 70%;
  margin: 5% auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.snackbar{
  width: 85%;
}
.card-wrap {
  margin: 20px auto;
  width: 85%;
  background: #fff;
  border-radius: 20px;
  border: 5px solid #fff;
  overflow: hidden;
  color: #8e9eab;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transition: all 0.2s ease-in-out;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.card-wrap:hover {
  transform: scale(1.1);
}
.card-header {
  height: auto;
  width: 25%;
  background: red;
  border-radius: 100% 50% 50% 0% / 0% 0% 100% 100%;
}

.card-header i {
  color: #fff;
  font-size: 72px;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 0 auto;
}
.card-title {
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.card-text {
  text-align: center;
  font-size: 12px;
  margin-bottom: 20px;
}
.card-btn {
  cursor: pointer;
  border: none;
  border-radius: 100px;
  padding: 5px 30px;
  color: #fff;
  margin-bottom: 15px;
  text-transform: uppercase;
}
.card-header.one {
  background: linear-gradient(to bottom left, #f12711, #f5af19);
}

.card-btn.one {
  margin-left: 10px;
  background: linear-gradient(to left, #f12711, #f5af19);
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
