<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-title> Chi tiết đơn hàng </v-app-bar-title>
    </v-app-bar>
    <v-container>
      <div style="height: 48px"></div>
      <v-breadcrumbs
        :items="items1"
        large
        class="d-none d-md-block"
      ></v-breadcrumbs>
      <v-row no-gutters>
        <v-col cols="12" md="9">
          <div class="mx-5 my-4" :class="[$style.thongbaocaidat]">
            Chi tiết đơn hàng
          </div>
          <v-card class="mx-5 px-5 py-3" outlined>
            <div v-for="data in datadh" :key="data.datadh">
              <v-row
                no-gutters
                v-for="data1 in JSON.parse(data.datadonhang).sp"
                :key="data1.datadh"
              >
                <v-col cols="12" md="10">
                  <div :class="[$style.flex]">
                    <img
                      loading="lazy"
                      src="/img/cafe.jpg"
                      :class="[$style.imgsanpham]"
                    />
                    <div :class="[$style.tensp]">
                      {{ data1.tensp }}
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="2">
                  <div :class="[$style.giasp]" class="mt-4">
                    {{
                      (
                        Math.round(
                          (data1.giasp - (data1.giasp * data1.giamgia) / 100) /
                            1000
                        ) * 1000
                      ).toLocaleString("it-IT")
                    }}₫<span :class="[$style.giacu]"
                      >{{ Math.round(data1.giasp).toLocaleString("it-IT") }}₫
                    </span>
                  </div>
                  <div :class="[$style.giasp]" class="mt-4">
                    Số lượng: {{ data1.soluongsp }}
                  </div>
                </v-col>
                <v-col cols="12">
                  <div style="height: 15px"></div>
                  <v-divider></v-divider>
                  <div style="height: 10px"></div>
                </v-col>
              </v-row>
            </div>
            <div :class="[$style.tonggia]">
              Tổng giá:
              {{ Math.round(this.gia).toLocaleString("it-IT") }}₫
            </div>
            <div style="height: 10px"></div>
            <div v-if="trangthaidh == 1">
              <v-btn color="blue" dark @click="xacnhan()">Xác nhận</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <div style="height: 100px"></div>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
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
.imgsanpham {
  width: 80px;
  height: 80px;
}
.flex {
  display: flex;
  align-items: center;
}
.tensp {
  margin-left: 15px;
  margin-right: 15px;
}
.giasp {
  color: #ff424e;
}
.giacu {
  color: rgb(153, 153, 153);
  font-size: 11px;
  text-decoration: line-through;
  margin-left: 10px;
}
.tonggia {
  margin: 10px 0px;
}
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Chi tiết đơn hàng cửa hàng | vivishop",
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
          text: "Chi tiết đơn hàng",
          disabled: true,
        },
      ],
      idshop: null,
      datadh: null,
      gia: "0",
      trangthaidh: 0,
      snackbar: false,
      text: "Đã xác nhận",
      timeout: 2000,
    };
  },
  methods: {
    xacnhan() {
      this.$axios
        .post("http://localhost:3000/api/cuahangxacnhan", {
          madonhang: this.$route.query.madonhang,
        })
        .then((response) => {
          if (response.data == 1) {
            this.snackbar = true;
            this.$router.push("/cuahangcuaban/");
          }
        });
    },
  },
  mounted() {
    if (this.$store.state.trangthaikh == 1) {
      this.$axios
        .post("http://localhost:3000/api/cuahangid")
        .then((response) => {
          this.idshop = response.data[0].idshop;
          this.$axios
            .post("http://localhost:3000/api/chitietdh", {
              idshopdh: this.idshop,
              madonhang: this.$route.query.madonhang,
            })
            .then((response1) => {
              this.datadh = response1.data;
              this.gia = response1.data[0].tonggiadh;
              this.trangthaidh = response1.data[0].trangthaidh;
            });
        });
    } else {
      this.$router.push("/cuahangcuaban/caidat");
    }
  },
};
</script>