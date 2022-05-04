<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-app-bar-title> Sửa sản phẩm </v-app-bar-title>
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
            <v-subheader>Thông tin</v-subheader>
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
            Sửa sản phẩm
          </div>
          <v-card class="mx-5" outlined>
            <div class="ml-5 mt-3">
              Ảnh đại diện:<br />
              <img
                loading="lazy"
                :src="datashop[0].imgchinh"
                :class="[$style.imgdaidien]"
              /><br /><br />
              Ánh sản phẩm:
            </div>
            <div class="mx-2 mt-2">
              <span v-for="data in dataimg" :key="data.dataimg">
                <img loading="lazy" :src="data.img" :class="[$style.imgsp]" />
              </span>
            </div>

            <v-row no-gutters class="mx-5 mt-8">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Tên sản phẩm"
                  v-model="ten"
                ></v-text-field></v-col
            ></v-row>
            <v-row no-gutters class="mx-5 mt-8">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Cân nặng sản phẩm (kg)"
                  v-model="cannang"
                ></v-text-field></v-col
            ></v-row>
            <div class="ml-5 mt-3">Thông tin sản phẩm</div>
            <v-col cols="12">
              <textarea
                name="editor1"
                id="editor1"
                rows="10"
                cols="80"
                v-model="datashop[0].thongtin"
              ></textarea>
            </v-col>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Giá sản phẩm"
                  v-model="gia"
                  type="number"
                ></v-text-field></v-col
            ></v-row>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Giảm giá"
                  v-model="giamgia"
                  type="number"
                ></v-text-field></v-col
            ></v-row>
            <div class="ml-5">
              <v-radio-group v-model="trangthaisp">
                <v-radio :value="1" label="Còn hàng"></v-radio>
                <v-radio :value="0" label="Hết hàng"></v-radio>
              </v-radio-group>
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
                Cập nhập
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
.imgdaidien {
  width: 80px;
  height: 80px;
  margin-top: 15px;
}
.imgsp {
  width: 70px;
  height: 70px;
  margin-left: 15px;
  margin-top: 10px;
}
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Sửa sản phẩm cửa hàng | vivishop",
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
          text: "Sửa sản phẩm",
          disabled: true,
        },
      ],
      items: [
        {
          text: "Sửa sản phẩm",
          icon: "mdi-pencil-outline",
        },
      ],
      drawer: false,
      idsp: this.$route.query.dgltzq,
      idshop: this.$route.query.awrzagw,
      load: 0,
      datashop: [
        {
          imgchinh: null,
          ten: null,
          cannangsp: null,
          thongtin: null,
          gia: null,
          giamgia: null,
          trangthaisp: null,
        },
      ],
      ten: null,
      cannang: null,
      dataimg: null,
      gia: null,
      giamgia: null,
      trangthaisp: null,
      snackbar: false,
      text: "Đã cập nhập",
      timeout: 2000,
    };
  },
  methods: {
    capnhap() {
      if (this.giamgia > 100) {
      } else {
        this.load = 1;
        this.$axios
          .post("http://localhost:3000/api/cuahangthaydoisp", {
            ten : this.ten,
            cannang: this.cannang,
            thongtin: CKEDITOR.instances.editor1.getData(),
            gia: this.gia,
            giamgia: this.giamgia,
            trangthaisp: this.trangthaisp,
            idsp: this.$route.query.dgltzq,
          })
          .then((response) => {
            if (response.data == "1") {
              this.load = 0;
              this.snackbar = true;
            }
          });
      }
    },
  },
  mounted() {
    if (this.$store.state.trangthaikh == 1) {
      setTimeout(function () {
        CKEDITOR.replace("editor1");
      }, 1500);
      this.$axios
        .post("http://localhost:3000/api/cuahangsuasp", {
          idshop: this.idshop,
          idsp: this.idsp,
        })
        .then((response) => {
          this.datashop = response.data;
          this.gia = response.data[0].gia;
          this.giamgia = response.data[0].giamgia;
          this.trangthaisp = response.data[0].trangthaisp;
          this.ten =  response.data[0].ten;
          this.cannang =  response.data[0].cannangsp;
        });
      this.$axios
        .post("http://localhost:3000/api/cuahangimgsp", {
          idsp: this.idsp,
        })
        .then((response) => {
          this.dataimg = response.data;
        });
    } else {
      this.$router.push("/cuahangcuaban/caidat");
    }
  },
};
</script>