<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-app-bar-title>Trả lời nhận xét </v-app-bar-title>
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
            Trả lời nhận xét
          </div>
          <v-card class="mx-5 px-5 py-3" outlined>
            <div class="m-5 mt-3 mb-3">Trả lời nhận xét</div>
            <v-row no-gutters>
              <v-col cols="12">
                <textarea
                  name="editor1"
                  id="editor1"
                  rows="10"
                  cols="80"
                ></textarea></v-col
            ></v-row>
            <div style="height: 20px"></div>
            <div class="ml-3 mb-6 mt-3">
              <v-btn
                outlined
                rounded
                text
                color="blue"
                @click="capnhap()"
                v-if="load == 0"
              >
                Trả lời
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
  head: {
    title: "Trả lời nhận xét cửa hàng | vivishop",
    script: [
      {
        src: "https://cdn.ckeditor.com/4.16.2/basic/ckeditor.js",
        type: "text/javascript",
      },
    ],
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
          text: "Trả lời nhận xét",
          disabled: true,
        },
      ],
      load: 0,
      snackbar: false,
      text: "",
      timeout: 2000,
    };
  },
  methods: {
    capnhap() {
      this.load = 0;
      this.$axios
        .post("http://localhost:3000/api/traloinx", {
          traloi: CKEDITOR.instances.editor1.getData(),
          idnhanxet: this.$route.query.dgltzq,
        })
        .then((response) => {
          if (response.data == "1") {
            this.snackbar = true;
            this.text = "Đã gửi thành công";
            this.$router.push("/cuahangcuaban/nhanxet");
          }else{
            this.snackbar = true;
            this.text = "Lỗi";
          }
        });
    },
  },
  mounted() {
    if (this.$store.state.trangthaikh == 1) {
      setTimeout(function () {
        CKEDITOR.replace("editor1");
      }, 1500);
      this.$axios
        .post("http://localhost:3000/api/cuahangid")
        .then((response) => {
          this.idshop = response.data[0].idshop;
        });
    } else {
      this.$router.push("/cuahangcuaban/caidat");
    }
  },
};
</script>