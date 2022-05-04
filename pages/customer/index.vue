<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-app-bar-title>
        <div :class="[$style.tieude]">Quản lí tài khoản</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-container>
      <v-breadcrumbs :items="items1" large></v-breadcrumbs>
      <v-row no-gutters>
        <v-col cols="12" class="pl-6" md="3">
          <v-list>
            <v-subheader class="d-none d-md-block">{{
              this.$store.state.khachhangten
            }}</v-subheader>
            <div class="d-flex mt-2 mb-5 d-md-none">
              <v-avatar  size="56"><img :src="this.$store.state.imgdaidien" /></v-avatar>
              <span class="ml-5"
                >{{ this.$store.state.khachhangten }}<br />{{
                  this.$store.state.phone
                }}</span
              >
            </div>
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
        <v-col cols="9" class="d-none d-md-block">
          <div class="mx-5 my-4">Thông tin tài khoản</div>
          <v-card class="mx-5" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="mb-4 mt-2">Tài khoản của</div>
                <v-list-item-title class="text-h5 mb-1">
                  {{ this.$store.state.khachhangten }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ this.$store.state.phone }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <img :src="this.$store.state.imgdaidien"
              /></v-list-item-avatar>
            </v-list-item>
            <div style="height: 100px"></div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>


<style module>
@media only all and (max-width: 960px) {
  .tieude {
    text-align: center;
    width: calc(100vw - 48px);
  }
}
@media only all and (min-width: 960px) {
  .tieude {
    margin-left: 70px;
  }
}
</style>


<script>
export default {
  middleware: ["auth"],
  head() {
    return {
      title: "Quản lí tài khoản | vivishop",
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
          text: "Thông tin tài khoản",
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
    };
  },
};
</script>