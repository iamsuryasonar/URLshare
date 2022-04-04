<template>
  <div class="main">
    <Snackbar class="snackbar"></Snackbar>
    <div class="card-wrap" v-for="(item, index) in items" :key="index">
      <img class="domain_icon" :src="getImgUrl(item.link)" alt="" />
      <div class="card-header">
        <i class="fas fa-link"></i>
      </div>
      <div class="card-content">
        <h1 class="card-title">{{ item.title }}</h1>
        <p class="card-text">{{ item.description }}</p>
        <div class="buttons">
          <button class="card-btn" @click="clickedlink(item.link)">
            <i class="fas fa-link"></i>
          </button>
          <button class="card-btn" @click="deletebtn(item.index)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import Snackbar from "../components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      items: this.$store.state.links,
      username: "",
      current_userid: "",
    };
  },
  created() {
    this.$store.dispatch("actionLoading", {
      loading: true,
    });
    this.current_userid = firebase.auth().currentUser.uid;
    this.getData();
  },

  methods: {
    getImgUrl(url) {
      let domain = null;
      try {
        domain = new URL(url);
        domain = domain.hostname;
      } catch (error) {
        domain = "https://urlshare.netlify.app/favicon.ico";
      }
      // let domain = "www.facebook.com";
      return "https://" + domain + "/favicon.ico";
    },
    getData() {
      this.items.length = 0;
      this.$store.dispatch("actionLoading", {
        loading: true,
      });
      firebase
        .database()
        .ref("users/" + this.current_userid)
        .once("value", (snapshot) => {
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
        .ref("users/" + this.current_userid + "/urls/" + index + "/")
        .remove()
        .then(() => {
          this.$store.dispatch("actionSnackbar", {
            content: "Link deleted",
            type: "success",
          });
          if (this.items.length === 1) {
            this.items.pop();
          } else {
            this.getData();
          }
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
  margin: calc(5% + 80px) auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.snackbar {
  width: 85%;
}
.card-wrap {
  position: relative;
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
.domain_icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.card-header {
  display: grid;
  height: auto;
  width: 25%;
  border-radius: 100% 50% 50% 0% / 0% 0% 100% 100%;
}
.card-header {
  background: linear-gradient(
    90deg,
    rgba(4, 43, 54, 1) 0%,
    rgba(2, 105, 88, 1) 0%,
    rgba(45, 209, 171, 1) 100%
  );
}

.card-header i {
  margin: auto;
  color: #fff;
  font-size: 72px;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  margin: 5px auto;
}
.card-title {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.card-text {
  text-align: center;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 20px;
}
.card-btn {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  border-radius: 100px;
  padding: 5px 30px;
  color: #fff;
  margin-bottom: 15px;
  text-transform: uppercase;
}
.card-btn:hover {
  transform: scale(1.1);
  background: linear-gradient(
    90deg,
    rgb(7, 63, 78) 0%,
    rgb(7, 49, 42) 0%,
    rgb(50, 177, 147) 100%
  );
}

.card-btn {
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    rgba(4, 43, 54, 1) 0%,
    rgba(2, 105, 88, 1) 0%,
    rgba(45, 209, 171, 1) 100%
  );
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
@media only screen and (max-width: 1100px) and (min-width: 701px) {
  .main {
    width: 85%;
  }
  .card-wrap {
    width: 86%;
  }
  .card-content {
    margin: 0px auto;
  }
  .card-title {
    margin-bottom: 10px;
    font-size: 20px;
  }
  .card-text {
    margin-bottom: 10px;
    font-size: 18px;
  }

  .card-btn {
    margin-bottom: 10px;
  }
}
@media only screen and (max-width: 700px) {
  .main {
    width: 100%;
  }
  .card-wrap {
    width: 90%;
  }
  .card-content {
    width: 90%;
    margin: 0px auto;
  }
  .card-title {
    margin-bottom: 10px;
    font-size: 16px;
  }
  .card-text {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .card-btn {
    margin-bottom: 10px;
  }
}
</style>
