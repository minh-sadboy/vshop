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
            Đơn hàng của tôi
          </div>
          <v-card class="mx-5" outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Mã đơn hàng</th>
                    <th class="text-left">Ngày mua</th>
                    <th class="text-left">Sản phẩm</th>
                    <th class="text-left">Tổng tiền</th>
                    <th class="text-left">Trạng thái đơn hàng</th>
                    <th class="text-left">Lựa chọn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in datadh" :key="data.datadh">
                    <td>{{ data.madonhang }}</td>
                    <td style="white-space: nowrap">{{ data.timedh }}</td>
                    <td>
                      <span
                        v-for="data1 in JSON.parse(data.datadonhang).sp"
                        :key="data1.data"
                        >{{ data1.tensp }} .<br
                      /></span>
                    </td>
                    <td>
                      {{
                        Math.round(data.thanhtiendh).toLocaleString("it-IT")
                      }}₫
                    </td>
                    <td style="white-space: nowrap">
                      <div v-if="data.trangthaidh == 0">Đã hủy</div>
                      <div v-if="data.trangthaidh == 1">Chuẩn bị hàng</div>
                      <div v-if="data.trangthaidh == 2">Đang giao hàng</div>
                      <div v-if="data.trangthaidh == 3">
                        Chờ xác nhận người mua
                      </div>
                      <div v-if="data.trangthaidh == 4">
                        Giao hàng thành công
                      </div>
                    </td>
                    <td>
                      <div v-if="data.trangthaidh == 1">
                        <v-btn
                          color="grey"
                          dark
                          small
                          @click="huydon(data.madonhang)"
                          v-if="huydonnut"
                        >
                          Hủy đơn
                        </v-btn>
                      </div>
                      <div v-if="data.trangthaidh == 3">
                        <v-btn
                          color="blue"
                          dark
                          small
                          :to="'/donhang/' + data.madonhang"
                        >
                          Xác nhận
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
  watchQuery: true,
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Đơn hàng của tôi | vivishop",
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
      datadh: null,
      huydonnut: true,
    };
  },
  methods: {
    huydon(a) {
      this.huydonnut = false;
      this.$axios
        .post("http://localhost:3000/api/donhanghuy", {
          madonhang: a,
        })
        .then((response) => {
          this.huydonnut = true;
          if (response.data == "1") {
            this.$axios
              .post("http://localhost:3000/api/donhangcuatoi")
              .then((response) => {
                this.datadh = response.data;
              });
          }
        });
    },
  },
  mounted() {
    this.$axios
      .post("http://localhost:3000/api/donhangcuatoi")
      .then((response) => {
        this.datadh = response.data;
      });
  },
};
</script>