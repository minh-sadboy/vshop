<template>
  <v-app>
    <img
      src="~/assets/img/nenlogin.jpg"
      :class="[$style.nen]"
      class="d-none d-md-flex"
    />
    <!-- mb -->
    <div class="text-center">
      <img
        src="~/assets/img/icon.png"
        :class="[$style.icon]"
        class="d-md-none"
      />
    </div>
    <div :class="[$style.login]">
      <!-- mt -->
      <div :class="[$style.dangnhap]" class="d-none d-md-block">Đăng nhập</div>
      <!-- mb -->
      <v-app-bar fixed app dense class="d-md-none">
        <v-btn @click="$router.go(-1)" icon large color="blue">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-toolbar-title>Đăng nhập</v-toolbar-title>
      </v-app-bar>
      <div class="text-center pa-5 mt-10" v-show="load">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div class="text-center" v-show="!load">
        <button
          class="btn btn-block btn-social btn-google"
          id="btnGoogle"
          type="button"
          :class="[$style.googlebtn]"
        >
          <v-icon dark>mdi-google</v-icon>&nbsp;&nbsp; Đăng nhập với Google
        </button>
        <br />
        <button
          class="btn btn-block btn-social btn-facebook"
          id="btnFacebook"
          type="button"
          :class="[$style.facebtn]"
        >
          <v-icon dark>mdi-facebook</v-icon>&nbsp;&nbsp; Đăng nhập với Facebook
        </button>
      </div>
    </div>
  </v-app>
</template>

<style module>
.nen {
  height: 100vh;
  width: 100vw;
}
.icon {
  width: 50px;
  margin-top: 160px;
}
@media only all and (max-width: 960px) {
  .googlebtn {
    width: 80%;
    padding: 10px 5px;
    background-color: #f44336;
    border-radius: 5px;
    margin-top: 40px;
    color: #fff;
  }
  .facebtn {
    width: 80%;
    padding: 10px 5px;
    background-color: #03a9f4;
    border-radius: 5px;
    margin-top: 20px;
    color: #fff;
  }
}
@media only all and (min-width: 960px) {
  .login {
    backdrop-filter: blur(8.05px);
    background: rgba(47, 70, 95, 0.37);
    color: #fff;
    box-shadow: 0 2.8px 2.2px rgb(0 0 0 / 2%), 0 6.7px 5.3px rgb(0 0 0 / 3%),
      0 12.5px 10px rgb(0 0 0 / 4%), 0 22.3px 17.9px rgb(0 0 0 / 4%),
      0 41.8px 33.4px rgb(0 0 0 / 5%), 0 100px 80px rgb(0 0 0 / 7%);
    position: fixed;
    top: 80px;
    right: 150px;
    width: 40%;
    height: 400px;
    border-radius: 8px;
  }
  .googlebtn {
    width: 60%;
    padding: 10px;
    background-color: #f44336;
    border-radius: 5px;
    margin-top: 70px;
  }
  .facebtn {
    width: 60%;
    padding: 10px;
    background-color: #03a9f4;
    border-radius: 5px;
    margin-top: 20px;
  }
}
.dangnhap {
  font-size: 30px;
  text-align: center;
  margin-top: 80px;
}
</style>
<script>
export default {
  layout: "Mapshop",
  head() {
    return {
      title: "Đăng nhập | vivishop",
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/firebase/8.10.0/firebase-app.min.js",
          type: "text/javascript",
          integrity:
            "sha512-XNRpfd3CxEDrXcXWvht51k3l8G5cZhcY0kehFjUohBhgRDCozbdSaGz3w96WlDxAgiNZndKnpn1+4532FS3p3w==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/firebase/8.10.0/firebase-auth.min.js",
          type: "text/javascript",
          integrity:
            "sha512-GAEvFso2oksY5JFkHlrfLhZgAV6aL48qxnbxPnbKnNLeG/XsU/c0lh/g9gocZ2RtbRx6VDTqspPEy9ixWvbfzw==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    };
  },
  data() {
    return {
      load: true,
    };
  },
  mounted() {
    if (this.$store.state.login == 2) {
      this.$router.go(-1);
    }
    if (this.$store.state.login == 1) {
      this.$router.push("/customer/caidat");
    }
    var config = {
      apiKey: "AIzaSyD0hcNbIrkl840LtSiUg4uHD8lhylrlw50",
      authDomain: "vivi-2d40a.firebaseapp.com",
      projectId: "vivi-2d40a",
      storageBucket: "vivi-2d40a.appspot.com",
      messagingSenderId: "694646348996",
      appId: "1:694646348996:web:76de71db898699d3dc3d91",
    };
    //Login in variables
    const btnGoogle = document.getElementById("btnGoogle");
    const btnFaceBook = document.getElementById("btnFacebook");
    var that = this;
    setTimeout(function () {
      firebase.initializeApp(config);
      firebase
        .auth()
        .getRedirectResult()
        .then((user) => {
          return user.user.getIdToken().then((idToken) => {
            that.$axios
              .post("http://localhost:3000/api/login", {
                idtoken: idToken,
              })
              .then((response) => {
                if (response.data == "1") {
                  location.replace("http://localhost:3000/customer");
                }
              });
          });
        });
    }, 1000);
    setTimeout(function () {
      that.load = false;
    }, 5000);

    //Sing in with Google
    btnGoogle.addEventListener(
      "click",
      (e) => {
        var ggProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
        firebase.auth().signInWithRedirect(ggProvider);
      },
      false
    );
    //Sing in with Facebook
    btnFaceBook.addEventListener(
      "click",
      (e) => {
        var fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithRedirect(fbProvider);
      },
      false
    );
  },
};
</script>