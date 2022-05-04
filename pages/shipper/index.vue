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
      <v-app-bar-title> Shipper </v-app-bar-title>
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
            <v-subheader>Shipper</v-subheader>
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
            Quản lí đơn hàng
          </div>
          <v-card class="mx-5" outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Mã đơn hàng</th>
                    <th class="text-left">Ngày mua</th>
                    <th class="text-left">Tên khách hàng</th>
                    <th class="text-left">Số điện thoại</th>
                    <th class="text-left">Ghi chú đơn hàng</th>
                    <th class="text-left">Tiền thu hộ</th>
                    <th class="text-left">Map</th>
                    <th class="text-left">Lựa chọn</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in datadh" :key="data.datadh">
                    <td>{{ data.madonhang }}</td>
                    <td style="white-space: nowrap">{{ data.timedh }}</td>
                    <td>{{ data.khachhangten }}</td>
                    <td>{{ data.phone }}</td>
                    <td>{{ data.ghichudh }}</td>
                    <td>
                      {{
                        Math.round(data.thanhtiendh).toLocaleString("it-IT")
                      }}₫
                    </td>
                    <td>
                      <v-btn
                        color="blue"
                        dark
                        small
                        icon
                        :to="
                          '/shipper/mapnhanhang?toado=' +
                          JSON.parse(data.toadovitridh).lat +
                          ',' +
                          JSON.parse(data.toadovitridh).lng
                        "
                      >
                        <v-icon>mdi-map-outline</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn
                        color="blue"
                        dark
                        small
                        :to="
                          '/shipper/xacnhandagiao?madonhang=' + data.madonhang
                        "
                      >
                        Chi tiết
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
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Shipper",
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
          text: "Shipper",
          disabled: true,
        },
      ],
      items: [
        {
          text: "Quản lí đơn hàng",
          icon: "mdi-book-outline",
          link: "/shipper",
        },
        {
          text: "Bản đồ",
          icon: "mdi-map-outline",
          link: "/shipper/map",
        },
        {
          text: "Doanh thu",
          icon: "mdi-cash",
          link: "/shipper/doanhthu",
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
    if (this.$store.state.trangthaikh == 2) {
      this.$axios
        .post("http://localhost:3000/api/shipperdh", {})
        .then((response1) => {
          this.datadh = response1.data;
        });
    } else {
      this.$router.push("/");
    }
  },
};
</script>