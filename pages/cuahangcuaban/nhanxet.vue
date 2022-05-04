<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute left>
      <v-list nav dense>
        <v-list-item-group color="primary">
          <div style="height: 10px"></div>
          <v-list-item>
            <v-list-item-title></v-list-item-title>
          </v-list-item>
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
    </v-navigation-drawer>
    <v-app-bar fixed app dense>
      <NuxtLink to="/">
        <img
          src="/icona.png"
          :class="[$style.iconhome]"
          class="d-none d-md-flex"
        />
      </NuxtLink>
      <div class="d-md-none mr-2">
        <v-btn icon large @click="drawer = true">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>
      <v-app-bar-title> Cửa hàng của bạn </v-app-bar-title>
      <NuxtLink to="/">
        <img src="/icona.png" :class="[$style.iconhome1]" class="d-md-none" />
      </NuxtLink>
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
            <v-subheader>{{ this.tenshop }}</v-subheader>
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
            Trả lời nhận xét
          </div>
          <v-card class="mx-5" outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Tên khách</th>
                    <th class="text-left">Nhận xét</th>
                    <th class="text-left" style="white-space: nowrap">
                      Đánh giá
                    </th>
                    <th class="text-left">Thời gian</th>
                    <th class="text-left" style="white-space: nowrap">
                      Link nhận xét
                    </th>
                    <th class="text-left">Lựa chọn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in datadh" :key="data.datadh">
                    <td>{{ data.khachhangten }}</td>
                    <td v-html="data.text"></td>
                    <td>{{ data.saonx }}</td>
                    <td style="white-space: nowrap">{{ data.time }}</td>
                    <td>
                      <NuxtLink
                        :to="
                          '/product/link&token=nzka4s21oqectors91r0jec' +
                          data.idsanpham
                        "
                      >
                        Link
                      </NuxtLink>
                    </td>
                    <td>
                      <v-btn
                        color="blue"
                        dark
                        small
                        :to="
                          '/cuahangcuaban/traloinhanxet?dgltzq=' +
                          data.idnx +
                          '&awrzagw=' +
                          idshop
                        "
                      >
                        Trả lời
                      </v-btn>
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
.thongbaocaidat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconhome {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
.iconhome1 {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 20px;
  top: 12px;
}
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Trả lời nhận xét cửa hàng | vivishop",
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
          text: "Cửa hàng của bạn",
          disabled: true,
        },
      ],
      items: [
        {
          text: "Quản lí đơn hàng",
          icon: "mdi-book-outline",
          link: "/cuahangcuaban/",
        },
        {
          text: "Thêm sản phẩm",
          icon: "mdi-pencil-outline",
          link: "/cuahangcuaban/themsanpham",
        },
        {
          text: "Báo cáo",
          icon: "mdi-chart-box-outline",
          link: "/cuahangcuaban/baocao",
        },
        {
          text: "Trả lời nhận xét",
          icon: "mdi-comment-edit-outline",
          link: "/cuahangcuaban/nhanxet",
        },
         {
          text: "Khóa ứng dụng",
          icon: "mdi-key-outline",
          link: "/cuahangcuaban/key",
        },
        {
          text: "Trang chủ",
          icon: "mdi-home-outline",
          link: "/",
        },
      ],
      drawer: false,
      datadh: null,
      tenshop: null,
      idshop: null,
    };
  },
  methods: {},
  mounted() {
    if (this.$store.state.trangthaikh == 1) {
      this.$axios
        .post("http://localhost:3000/api/cuahangid")
        .then((response) => {
          this.tenshop = response.data[0].tenshop;
          this.idshop = response.data[0].idshop;
          this.$axios
            .post("http://localhost:3000/api/cuahangtraloi", {
              idshopdh: this.idshop,
            })
            .then((response1) => {
              this.datadh = response1.data;
            });
        });
    } else {
      this.$router.push("/cuahangcuaban/caidat");
    }
  },
};
</script>