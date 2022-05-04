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
          <div class="mx-5 my-4" :class="[$style.thongbaocaidat]">Liên hệ</div>
          <v-card class="mx-5" outlined>
            <div style="height: 10px"></div>
            <a
              href="https://www.facebook.com/Vivishop-109919218055031"
              target="_blank"
              rel="noopener noreferrer"
              :class="[$style.facebook]"
            >
              <v-icon color="blue" large>mdi-facebook</v-icon> Facebook</a
            >
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
.facebook {
  text-decoration: none;
  font-weight: 600;
  margin-left: 15px;
}
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Hỏi đáp | vivishop",
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
    };
  },
  methods: {},
  mounted() {
    
  },
};
</script>