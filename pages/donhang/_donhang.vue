<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-title> Đơn hàng </v-app-bar-title>
    </v-app-bar>
    <v-container v-show="chuacodh">
      <div style="height: 48px"></div>
      <v-breadcrumbs
        :items="items1"
        large
        class="d-none d-md-block"
      ></v-breadcrumbs>
      <v-row no-gutters>
        <v-col cols="12" md="9">
          <div class="mx-5 my-4" :class="[$style.thongbaocaidat]">
            Thông tin đơn hàng
          </div>
          <v-card class="mx-5" outlined>
            <div style="height: 10px"></div>
            <div class="mx-5 mt-2" style="color: #b70017">
              Cảm ơn bạn đã mua hàng tại Vivishop!
            </div>
            <div class="ml-5 mt-2" style="font-size: 13px">
              Mã số đơn hàng của bạn:
            </div>
            <div class="ml-5 mt-4">
              <span
                class="pa-2 px-5"
                style="
                  background-color: #58b712;
                  color: #fff;
                  font-size: 18px;
                  border-radius: 6px;
                "
                >{{ $route.params.donhang }}</span
              >
            </div>
            <div class="ml-5 mt-5">Sản phẩm</div>
            <div class="ml-3">
              <v-col cols="12" sm="6">
                <v-radio-group v-model="radioGroup">
                  <v-radio
                    v-for="(data, index) in JSON.parse(datadh[0][0].datadonhang)
                      .sp"
                    :key="index"
                    :label="data.tensp"
                    :value="Number(data.idsp)"
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </div>
            <div class="ml-5">Đánh giá</div>
            <div class="ml-3 mt-2">
              <v-col cols="12" sm="6">
                <v-select
                  :items="danhgia"
                  filled
                  label="Số sao"
                  v-model="danhgiasao"
                ></v-select>
              </v-col>
            </div>
            <div class="ml-5 mt-3">Nhận xét</div>
            <v-col cols="12">
              <textarea
                name="editor1"
                id="editor1"
                rows="10"
                cols="80"
              ></textarea>
            </v-col>
            <div class="ml-5 mt-5">
              <v-btn color="blue" dark @click="gui()" v-if="!load"> Gửi </v-btn>
              <v-progress-circular
                indeterminate
                color="primary"
                v-if="load"
              ></v-progress-circular>
            </div>

            <div style="height: 50px"></div>
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
      title: "Đơn hàng | vivishop",
      script: [
        {
          src: "https://cdn.ckeditor.com/4.16.2/basic/ckeditor.js",
          type: "text/javascript",
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
          text: "Đơn hàng",
          disabled: true,
        },
      ],
      danhgia: ["1", "2", "3", "4", "5"],
      radioGroup: 1,
      chuacodh: false,
      datadh: [[{ datadonhang: "1", idkhdh: null }], 1],
      danhgiasao: null,
      idkhdh: null,
      load: false,
      idshop: null,
    };
  },
  methods: {
    gui() {
      this.load = true;
      var d = new Date();
      var a = d.getMonth() + 1;
      var timedh =
        d.getDate() +
        "-" +
        a +
        "-" +
        d.getFullYear() +
        " - " +
        d.getHours() +
        ":" +
        d.getMinutes();
      this.$axios
        .post("http://localhost:3000/api/danhgianhanxet", {
          text: CKEDITOR.instances.editor1.getData(),
          saonx: this.danhgiasao,
          idkhach: this.idkhdh,
          idsanpham: this.radioGroup,
          time: timedh,
          idshopnx: this.idshop,
        })
        .then((response) => {
          if (response.data == 1) {
            this.$axios
              .post("http://localhost:3000/api/danhgiathanhcong", {
                madonhang: this.$route.params.donhang,
              })
              .then((response1) => {
                if (response1.data == 1) {
                  this.load = false;
                  this.$router.push("/customer/donhang");
                }
              });
          }
        });
    },
  },
  mounted() {
    setTimeout(function () {
      CKEDITOR.replace("editor1");
    }, 1500);

    this.$axios
      .post("http://localhost:3000/api/danhgia", {
        madonhang: this.$route.params.donhang,
      })
      .then((response) => {
        if (response.data[1] == 2) {
          this.chuacodh = true;
          this.datadh = response.data;
          this.idkhdh = response.data[0][0].idkhdh;
          this.idshop = JSON.parse(response.data[0][0].datadonhang).idshop;
        }
      });
  },
};
</script>