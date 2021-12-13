<template>
  <div class="container">
    <div class="descriptionandbutton">
      <p class="title">URLshare</p>
      <p class="description">
        A URL sharing platform, One URL that contains all of your URL's in one
        place
      </p>
      <div class="buttonandatag">
        <button @click="getstarted">Get Started</button>
        <a href="/LogIn">Already a User</a>
      </div>
    </div>
    <div class="linkviewimage">
      <img src="../assets/welcomeimage.jpg" alt="an image containing shared urls using Url share web app"/>
    </div>
  </div>
</template>
<script>
export default {
  name: "Welcome",

  components: {},

  data: () => ({}),

  methods: {
    getstarted() {
      this.$router.push("/Register");
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.title {
  margin: 30px auto;
  font-size: 40px;
}
.description {
  font-size: 25px;
  text-align: justify;
  text-justify: inter-word;
}
.descriptionandbutton {
  width: 50%;
  height: 90vh;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.linkviewimage {
  display: grid;
  align-content: center;
}
.linkviewimage img {
  box-shadow: 7px 8px 13px 0px rgba(0,0,0,0.75);
  height: 90%;
  width: 90%;
  border-radius: 20px;
  margin: auto 20px;
}
.buttonandatag {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.buttonandatag a {
  font-size: 25px;
  text-decoration-line: none;
  color: white;
}
.buttonandatag a:hover {
  color: rgb(45, 209, 154);
  border-bottom: 2px solid #e4e403;
}
button {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: aliceblue;
  text-decoration: none;
  margin: 2% 0px;
  padding: 8px 20px;
  background-color: rgb(45, 209, 154);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  border: none;
  border-radius: 3px;
}
button:hover {
  background-color: rgb(7, 146, 100);
}
@media only screen and (max-width: 700px) {
  .container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .descriptionandbutton {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .linkviewimage {
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
  }
  .title {
    margin: 10px auto;
    font-size: 30px;
  }
  .description {
    font-size: 20px;
  }
  button {
    margin: auto 10px;
    padding: 4px 10px;
    font-size: 20px;
  }
  .buttonandatag{
    margin: 20px auto;
  }
  .buttonandatag a {
    margin: auto 10px;
    font-size: 20px;
  }
}
</style>
