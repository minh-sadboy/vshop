<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-app-bar-title>
        <div :class="[$style.tieude]">Quản lí tài khoản</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-container>
      <v-breadcrumbs :items="items1" large></v-breadcrumbs>

      <div class="mx-5 my-4">Cài đặt thông tin</div>
      <v-card class="mx-5" outlined>
        <v-list-item three-line>
          <v-row no-gutters>
            <v-col cols="12" md="4">
              <v-list-item-content>
                <div class="mb-4 mt-2">Thông tin tài khoản</div>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="hoten"
                        :rules="hotenRules"
                        :counter="255"
                        label="Họ tên"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="phone"
                        :rules="phoneRules"
                        :counter="12"
                        label="Số điện thoại"
                        required
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item-content>
            </v-col>
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="5">
              <div style="text-align: center; padding: 12px">
                <v-list-item-avatar tile size="80">
                  <img v-if="url" :src="url" />
                </v-list-item-avatar>
                <v-file-input
                  v-model="dataimg"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/jpg"
                  placeholder="Chọn ảnh đại diện"
                  prepend-icon="mdi-camera"
                  label="Chọn ảnh đại diện"
                  type="file"
                  clear-icon
                  @change="onFileChange"
                ></v-file-input>
              </div>
            </v-col>
          </v-row>
        </v-list-item>
        <v-card-actions>
          <div class="ml-3 mb-6">
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
        </v-card-actions>
      </v-card>
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
  head() {
    return {
      title: "Cài đặt thông tin | vivishop",
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/image-conversion@2.1.1/build/conversion.js",
          type: "text/javascript",
          integrity: "sha256-060Kq2fwBH4sioh9TzYyYQhtsyfeDijoMk1OqXloBXM=",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
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
          text: "Cài đặt",
          disabled: true,
        },
      ],
      hoten: "",
      hotenRules: [
        (v) => !!v || "Vui lòng điền đầy đủ họ tên",
        (v) => v.length >= 4 || "Tên phải ít nhất 4 ký tự",
      ],
      phone: "",
      phoneRules: [
        (v) => !!v || "Vui lòng điền đầy đủ số điện thoại",
        (v) => v.length <= 12 || "Số điện thoại phải ít hơn 12 ký tự",
      ],
      rules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          "Kích thước ảnh đại diện phải nhỏ hơn 2 MB!",
      ],
      dataimg: null,
      url: null,
      snackbar: false,
      text: "Vui lòng điền đầy đủ thông tin",
      timeout: 2000,
      idfirebase: this.$store.state.idfirebase,
      load: 0,
    };
  },
  methods: {
    onFileChange(e) {
      const file = this.dataimg;
      if (file) {
        this.url = URL.createObjectURL(file);
      }
    },
    capnhap() {
      if (
        this.hoten.length >= 4 &&
        this.phone.length <= 12 &&
        this.phone.length >= 4 &&
        this.dataimg
      ) {
        const file = this.dataimg;
        this.load = 1;
        imageConversion
          .compressAccurately(file, {
            size: 2,
            accuracy: 0.9,
            type: "image/jpeg",
            width: 80,
            height: 80,
          })
          .then((res) => {
            var bodyFormData = new FormData();
            bodyFormData.append("imgdaidien", res);
            bodyFormData.set("khachhangten", this.hoten);
            bodyFormData.set("phone", this.phone);
            bodyFormData.set("idfirebase", this.idfirebase);

            this.$axios({
              method: "post",
              url: "http://localhost:3000/api/uploadimgdaidien",
              data: bodyFormData,
            }).then((response) => {
              this.load = 0;
              if (response.data == "1") {
                this.snackbar = true;
                this.text = "Đã gửi thành công";
                location.replace("http://localhost:3000/");
              }
            });
          });
      } else {
        this.snackbar = true;
      }
    },
  },
  mounted() {
    if (this.$store.state.idfirebase) {
    } else {
      this.$router.go(-1);
    }
  },
};
</script>