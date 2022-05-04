<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-title> Quản lí tài khoản </v-app-bar-title>
    </v-app-bar>
    <v-container>
      <div style="height: 48px"></div>
      <v-breadcrumbs
        :items="items1"
        large
        class="d-none d-md-block"
      ></v-breadcrumbs>
      <v-row no-gutters>
        <v-col cols="3" class="pl-6 d-none d-md-block">
          <v-list>
            <v-subheader>{{ this.$store.state.khachhangten }}</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" md="9">
          <div class="mx-5 my-4" :class="[$style.thongbaocaidat]">
            Thông báo của tôi
            <div class="d-md-none">
              <v-menu offset-y left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="xoatatca()">
                    <v-list-item-title>Xóa tất cả thông báo</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
          <v-card class="mx-5" outlined>
            <v-tabs v-model="tabs" class="d-md-none" @change="khuyenmai1()">
              <v-tab>Khuyến mãi</v-tab>
              <v-tab>Đơn hàng</v-tab>
            </v-tabs>

            <v-list-item three-line class="d-none d-md-block">
              <div :class="[$style.tab]">
                <v-tabs v-model="tabs" @change="khuyenmai1()">
                  <v-tab>Khuyến mãi</v-tab>
                  <v-tab>Đơn hàng</v-tab>
                </v-tabs>
                <v-menu offset-y left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="xoatatca()">
                      <v-list-item-title
                        >Xóa tất cả thông báo</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </v-list-item>
            <v-list
              three-line
              v-for="data in datathongbao"
              :key="data.datathongbao"
            >
              <template v-if="khuyenmai == '1'">
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.noidungtb"
                    ></v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar> </v-list-item-avatar>
                </v-list-item>
              </template>
            </v-list>
            <div style="height: 100px"></div>
          </v-card>
        </v-col>
      </v-row>
      <div style="height: 100px"></div>
    </v-container>
  </v-app>
</template>


<style module>
.tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.thongbaocaidat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Thông báo của tôi | vivishop",
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
          src: "https://cdnjs.cloudflare.com/ajax/libs/firebase/8.10.0/firebase-messaging.min.js",
          type: "text/javascript",
          integrity:
            "sha512-v5yEhqjlpSupFcjvkEP+AloVEjQBd/CK0pysyAw/YCChyiq54FUuucx2N9oACFBi1qHXsAuhOMsoHiFYxIXCMQ==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    };
  },
  data() {
    return {
      items1: [
        {
          text: "Trang chủ",
          disabled: false,
          to: "/",
        },
        {
          text: "Thông báo",
          disabled: true,
        },
      ],
      items: [
        {
          text: "Thông tin tài khoản",
          icon: "mdi-account-outline",
          link: "/customer",
        },
        {
          text: "Thông báo của tôi",
          icon: "mdi-bell-outline",
          link: "/customer/thongbao",
        },
        {
          text: "Quản lí đơn hàng",
          icon: "mdi-book-outline",
          link: "/customer/donhang",
        },
        {
          text: "Hỏi đáp",
          icon: "mdi-message-question-outline",
          link: "/customer/hoidap",
        },
        {
          text: "Cửa hàng của bạn",
          icon: "mdi-store-outline",
          link: "/cuahangcuaban",
        },
        { text: "Đăng xuất", icon: "mdi-logout", link: "/customer/dangxuat" },
      ],
      tabs: 1,
      datathongbao: null,
      khuyenmai: 1,
    };
  },
  methods: {
    khuyenmai1() {
      this.khuyenmai = this.tabs;
    },
    xoatatca() {
      localStorage.removeItem("vthongbao");
      this.datathongbao = null;
    },
  },
  mounted() {
    this.$axios.post("http://localhost:3000/api/thongbao").then((response) => {
      const vthongbao = localStorage.getItem("vthongbao");
      if (vthongbao == null) {
        localStorage.setItem("vthongbao", JSON.stringify(response.data[0]));
      } else {
        const a = JSON.parse(vthongbao);
        const b = JSON.parse(JSON.stringify(response.data[0]));
        a.concat(b);
        localStorage.setItem("vthongbao", JSON.stringify(a.concat(b)));
        this.datathongbao = a.concat(b);
      }
      if (response.data[1] == 1) {
        this.$axios.post("http://localhost:3000/api/thongbaodadoc");
      }
    });
    var that = this;
    var config = {
      apiKey: "AIzaSyD0hcNbIrkl840LtSiUg4uHD8lhylrlw50",
      authDomain: "vivi-2d40a.firebaseapp.com",
      projectId: "vivi-2d40a",
      storageBucket: "vivi-2d40a.appspot.com",
      messagingSenderId: "694646348996",
      appId: "1:694646348996:web:76de71db898699d3dc3d91",
    };
    setTimeout(function () {
      firebase.initializeApp(config);
      const messaging = firebase.messaging();
      messaging.onMessage((payload) => {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
        };

        const notification  = new Notification(
          notificationTitle,
          notificationOptions
        );
      });
      Notification.requestPermission().then((permission) => {
        if (permission == "granted") {
          messaging
            .getToken({
              vapidKey:
                "BJbgW93uDrDSgaW-2gna1MAA4TElZvPrarcAW7aOyoFxVAX3vA0crTmDc8VEcGK1mqL2ZgyR4F92DBetpZf1hXY",
            })
            .then((currentToken) => {
              if (currentToken) {
                that.$axios
                  .post("http://localhost:3000/api/thongbaotoken", {
                    token: currentToken,
                  })
                  .then((response) => {});
              }
              console.log(currentToken);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }, 1000);
  },
};
</script>