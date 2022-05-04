<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-title>Xác nhận đã giao hàng </v-app-bar-title>
    </v-app-bar>
    <v-container v-if="trangthaidh == 2">
      <div style="height: 48px"></div>
      <v-breadcrumbs
        :items="items1"
        large
        class="d-none d-md-block"
      ></v-breadcrumbs>
      <v-row no-gutters>
        <v-col cols="12" md="9">
          <div class="mx-5 my-4" :class="[$style.thongbaocaidat]">
            Xác nhận đã giao hàng
          </div>
          <v-card class="mx-5 px-5 py-3" outlined>
            <div class="m-5 mt-3 mb-3">Thông tin</div>
            <div style="height: 20px"></div>
            <div>Người nhận: {{ nguoinhan }}</div>
            <div class="mt-3">Số điện thoại: {{ phone }}</div>
            <div class="mt-3">Mã : {{ madonhang }}</div>
            <div class="mt-3">Địa chỉ : {{ diachi }}</div>
            <div class="mt-3">Thời gian : {{ time }}</div>
            <div class="mt-3">Ghi chú : {{ ghichu }}</div>
            <div class="mt-3">
              Tiền ship : {{ (thanhtien - tonggia).toLocaleString("it-IT") }}₫
            </div>
            <div class="mt-3">
              Thu hộ : {{ Number(thanhtien).toLocaleString("it-IT") }}₫
            </div>
            <div class="ml-3 mb-6 mt-3">
              <v-btn
                outlined
                rounded
                text
                color="blue"
                @click="capnhap()"
                v-if="load == 0"
              >
                Xác nhận đã giao
              </v-btn>
              <v-progress-circular
                v-if="load == 1"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div class="ml-3 mb-6 mt-3">
              <v-btn
                outlined
                rounded
                text
                color="gray"
                @click="capnhap1()"
                v-if="load == 0"
              >
                Khách hàng không nhận
              </v-btn>
              <v-progress-circular
                v-if="load == 1"
                indeterminate
                color="primary"
              ></v-progress-circular>
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
      title: "Xác nhận giao hàng | Shipper",
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
          text: "Xác nhận đã giao hàng",
          disabled: true,
        },
      ],
      load: 0,
      snackbar: false,
      text: "",
      timeout: 2000,
      nguoinhan: null,
      phone: null,
      madonhang: null,
      diachi: null,
      time: null,
      ghichu: null,
      tonggia: 0,
      thanhtien: 0,
      trangthaidh: null,
      idshop: null,
    };
  },
  methods: {
    capnhap() {
      this.load = 0;
      this.$axios
        .post("http://localhost:3000/api/shipperxacnhandagiao", {
          madonhang: this.madonhang,
          tienthuho: this.thanhtien,
          tienship: Number(this.thanhtien) - Number(this.tonggia),
          idshop: this.idshop,
        })
        .then((response) => {
          if (response.data == "1") {
            this.snackbar = true;
            this.text = "Đã gửi thành công";
            this.$router.push("/shipper");
          } else {
            this.snackbar = true;
            this.text = "Lỗi";
          }
        });
    },
    capnhap1() {
      this.load = 0;
      this.$axios
        .post("http://localhost:3000/api/shipperxacnhanhuydon", {
          madonhang: this.madonhang,
        })
        .then((response) => {
          if (response.data == "1") {
            this.snackbar = true;
            this.text = "Đã gửi thành công";
            this.$router.push("/shipper");
          } else {
            this.snackbar = true;
            this.text = "Lỗi";
          }
        });
    },
  },
  mounted() {
    if (this.$store.state.trangthaikh == 2) {
      this.$axios
        .post("http://localhost:3000/api/shipperxacnhan", {
          madonhang: this.$route.query.madonhang,
        })
        .then((response1) => {
          console.log(response1.data);
          this.nguoinhan = response1.data[0].khachhangten;
          this.phone = response1.data[0].phone;
          this.madonhang = response1.data[0].madonhang;
          this.diachi = response1.data[0].textdiachidh;
          this.time = response1.data[0].timedh;
          this.ghichu = response1.data[0].ghichudh;
          this.tonggia = response1.data[0].tonggiadh;
          this.thanhtien = response1.data[0].thanhtiendh;
          this.trangthaidh = response1.data[0].trangthaidh;
          this.idshop = response1.data[0].idshopdh;
        });
    } else {
      this.$router.push("/");
    }
  },
};
</script>