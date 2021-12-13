<template>
  <div class="main">
    <Snackbar class="snackbar"></Snackbar>
    <div class="container">
      <div class="card">
        <div class="profile_details">
          <p class="title">Profile</p>
          <div class="imgandusername">
            <img class="" alt="" :src="linkview_items.image_url" />
            <p>{{ linkview_items.username }}</p>
          </div>
          <div class="email">
            <p>{{ linkview_items.email }}</p>
          </div>
          <div class="bio">
            <p>"{{ linkview_items.bio }}"</p>
          </div>
        </div>
      </div>
      <div class="link_card_container">
        <div
          class="card-wrap"
          v-for="(item, index) in linkview_items.links"
          :key="index"
          @click="clickedlink(item.link)"
        >
          <div class="card-header">
            <i class="fas fa-link"></i>
          </div>
          <div class="card-content">
            <h1 class="card-title">{{ item.title }}</h1>
            <p class="card-text">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Snackbar from "../components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      linkview_items: this.$store.state.linkview_items,
      userid: "",
      userIdOfUsername: "",
    };
  },
  computed: {},

  created() {
    this.$store.dispatch("getitemsforlinkview", {
      username: this.$route.params.username,
    });
  },

  methods: {
    clickedlink(link) {
      window.location.href = link;
    },
  },
};
</script>
<style scoped>
.main {
  width: 90%;
  margin: 5% auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.snackbar {
  width: 85%;
}
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.card {
  margin: 20px auto;
  width: 40%;
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(
    90deg,
    rgba(4, 43, 54, 1) 0%,
    rgba(2, 105, 88, 1) 0%,
    rgba(45, 209, 171, 1) 100%
  );
}
.profile_details {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.title {
  font-size: 20px;
  align-self: center;
  margin-bottom: 10px;
}
.imgandusername img {
  width: 60px;
  height: 60px;
  border-radius: 50px;
}
.imgandusername p {
  align-self: center;
}
.imgandusername {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}
.bio {
  text-align: justify;
}
.link_card_container {
  min-width: 60%;
  margin-bottom: 20px;
}
.card-wrap {
  cursor: pointer;
  margin: 20px 20px;
  width: 100%;
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
  display: grid;
  height: auto;
  width: 25%;
  border-radius: 100% 50% 50% 0% / 0% 0% 100% 100%;
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
  margin: 16px auto;
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
@media only screen and (max-width: 900px) {
  .main {
    width: 100%;
    margin: 2% auto;
  }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .card {
    width: 90%;
    margin: 10px auto;
  }
  .link_card_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 10px auto;
  }
  .card-content {
    margin: 0px auto;
  }
  .card-wrap {
    margin: 10px auto;
  }
}
</style>
