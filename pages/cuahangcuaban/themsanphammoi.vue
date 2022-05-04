<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-app-bar-title> Thêm sản phẩm mới</v-app-bar-title>
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
            <v-subheader>{{ tenshop }}</v-subheader>
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
            Thêm sản phẩm mới
          </div>
          <v-card class="mx-5" outlined>
            <v-row no-gutters>
              <v-col cols="12" md="5">
                <div class="ml-5 mt-5">Ảnh đại diện</div>
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
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <div class="ml-5 mt-5">Ảnh sản phẩm 1</div>
                <div style="text-align: center; padding: 12px">
                  <v-list-item-avatar tile size="80">
                    <img v-if="url1" :src="url1" />
                  </v-list-item-avatar>
                  <v-file-input
                    v-model="dataimg1"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Chọn ảnh sản phẩm 1"
                    prepend-icon="mdi-camera"
                    label="Chọn ảnh sản phẩm 1"
                    type="file"
                    clear-icon
                    @change="onFileChange1"
                  ></v-file-input>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="ml-5 mt-5">Ảnh sản phẩm 2</div>
                <div style="text-align: center; padding: 12px">
                  <v-list-item-avatar tile size="80">
                    <img v-if="url2" :src="url2" />
                  </v-list-item-avatar>
                  <v-file-input
                    v-model="dataimg2"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Chọn ảnh sản phẩm 2"
                    prepend-icon="mdi-camera"
                    label="Chọn ảnh sản phẩm 2"
                    type="file"
                    clear-icon
                    @change="onFileChange2"
                  ></v-file-input>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="ml-5 mt-5">Ảnh sản phẩm 3</div>
                <div style="text-align: center; padding: 12px">
                  <v-list-item-avatar tile size="80">
                    <img v-if="url3" :src="url3" />
                  </v-list-item-avatar>
                  <v-file-input
                    v-model="dataimg3"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Chọn ảnh sản phẩm 3"
                    prepend-icon="mdi-camera"
                    label="Chọn ảnh sản phẩm 3"
                    type="file"
                    clear-icon
                    @change="onFileChange3"
                  ></v-file-input>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="ml-5 mt-5">Ảnh sản phẩm 4</div>
                <div style="text-align: center; padding: 12px">
                  <v-list-item-avatar tile size="80">
                    <img v-if="url4" :src="url4" />
                  </v-list-item-avatar>
                  <v-file-input
                    v-model="dataimg4"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Chọn ảnh sản phẩm 4"
                    prepend-icon="mdi-camera"
                    label="Chọn ảnh sản phẩm 4"
                    type="file"
                    clear-icon
                    @change="onFileChange4"
                  ></v-file-input>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="ml-5 mt-5">Ảnh sản phẩm 5</div>
                <div style="text-align: center; padding: 12px">
                  <v-list-item-avatar tile size="80">
                    <img v-if="url5" :src="url5" />
                  </v-list-item-avatar>
                  <v-file-input
                    v-model="dataimg5"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Chọn ảnh sản phẩm 5"
                    prepend-icon="mdi-camera"
                    label="Chọn ảnh sản phẩm 5"
                    type="file"
                    clear-icon
                    @change="onFileChange5"
                  ></v-file-input>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="ml-5 mt-5">Ảnh sản phẩm 6</div>
                <div style="text-align: center; padding: 12px">
                  <v-list-item-avatar tile size="80">
                    <img v-if="url6" :src="url6" />
                  </v-list-item-avatar>
                  <v-file-input
                    v-model="dataimg6"
                    :rules="rules"
                    accept="image/png, image/jpeg, image/jpg"
                    placeholder="Chọn ảnh sản phẩm 6"
                    prepend-icon="mdi-camera"
                    label="Chọn ảnh sản phẩm 6"
                    type="file"
                    clear-icon
                    @change="onFileChange6"
                  ></v-file-input>
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Tên sản phẩm"
                  v-model="ten"
                ></v-text-field></v-col
            ></v-row>
            <div class="ml-5 mt-3">Thông tin sản phẩm</div>
            <v-col cols="12">
              <textarea
                name="editor1"
                id="editor1"
                rows="10"
                cols="80"
              ></textarea>
            </v-col>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Giá sản phẩm (VD: 25000)"
                  v-model="gia"
                  type="number"
                ></v-text-field></v-col
            ></v-row>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Giảm giá sản phẩm (VD: 50%)"
                  v-model="giamgia"
                  type="number"
                ></v-text-field></v-col
            ></v-row>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4"
                ><v-text-field
                  label="Cân nặng sản phẩm (kg)"
                  v-model="cannang"
                  type="number"
                ></v-text-field></v-col
            ></v-row>
            <v-row no-gutters class="mx-5 mt-3">
              <v-col cols="12" sm="4">
                <v-select
                  :items="danhmuc"
                  label="Danh mục"
                  v-model="danhmucsp"
                ></v-select></v-col
            ></v-row>
            <div class="ml-3 mb-6 mt-3">
              <v-btn
                outlined
                rounded
                text
                color="blue"
                @click="capnhap()"
                v-if="load == 0"
              >
                Gửi
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
  head: {
    title: "Thêm sản phẩm mới cửa hàng | vivishop",
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/image-conversion@2.1.1/build/conversion.js",
        type: "text/javascript",
        integrity: "sha256-060Kq2fwBH4sioh9TzYyYQhtsyfeDijoMk1OqXloBXM=",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
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
          text: "Thêm sản phẩm mới",
          disabled: true,
        },
      ],
      items: [
        {
          text: "Thêm sản phẩm mới",
          icon: "mdi-plus-box-outline",
        },
      ],
      rules: [
        (value) =>
          !value ||
          value.size < 5000000 ||
          "Kích thước ảnh đại diện phải nhỏ hơn 5 MB!",
      ],
      danhmuc: [
        "1 Điện thoại - Máy tính bảng",
        "2 Phụ kiện - Thiết bị số",
        "3 Máy ảnh - Quay phim",
        "4 Điện gia dụng",
        "5 Đồ dùng nhà bếp",
        "6 Đồ ăn - Thực phẩm",
        "7 Đồ chơi, Mẹ & Bé",
        "8 Thời trang - Phụ kiện",
        "9 Sách",
      ],
      danhmucsp: "1 Điện thoại - Máy tính bảng",
      load: 0,
      snackbar: false,
      text: "",
      timeout: 2000,
      tenshop: null,
      idshop: null,
      url: null,
      dataimg: null,
      url1: null,
      dataimg1: null,
      url2: null,
      dataimg2: null,
      url3: null,
      dataimg3: null,
      url4: null,
      dataimg4: null,
      url5: null,
      dataimg5: null,
      url6: null,
      dataimg6: null,
      ten: "",
      gia: "",
      giamgia: "",
      cannang: "",
      idsanpham: null,
    };
  },
  methods: {
    onFileChange(e) {
      const file = this.dataimg;
      if (file) {
        this.url = URL.createObjectURL(file);
      }
    },
    onFileChange1(e) {
      const file = this.dataimg1;
      if (file) {
        this.url1 = URL.createObjectURL(file);
      }
    },
    onFileChange2(e) {
      const file = this.dataimg2;
      if (file) {
        this.url2 = URL.createObjectURL(file);
      }
    },
    onFileChange3(e) {
      const file = this.dataimg3;
      if (file) {
        this.url3 = URL.createObjectURL(file);
      }
    },
    onFileChange4(e) {
      const file = this.dataimg4;
      if (file) {
        this.url4 = URL.createObjectURL(file);
      }
    },
    onFileChange5(e) {
      const file = this.dataimg5;
      if (file) {
        this.url5 = URL.createObjectURL(file);
      }
    },
    onFileChange6(e) {
      const file = this.dataimg6;
      if (file) {
        this.url6 = URL.createObjectURL(file);
      }
    },
    capnhap() {
      if (
        this.ten.length >= 4 &&
        this.gia.length >= 1 &&
        this.giamgia.length <= 2 &&
        this.cannang.length >= 1 &&
        this.dataimg
      ) {
        const file = this.dataimg;
        this.load = 1;
        imageConversion
          .compressAccurately(file, {
            size: 16,
            accuracy: 0.9,
            type: "image/jpeg",
            width: 400,
            height: 400,
          })
          .then((res) => {
            var bodyFormData = new FormData();
            bodyFormData.append("imgdaidiensp", res);
            bodyFormData.set("ten", this.ten);
            bodyFormData.set("gia", this.gia);
            bodyFormData.set("giamgia", this.giamgia);
            bodyFormData.set("cannang", this.cannang);
            bodyFormData.set("idshop", this.idshop);
            bodyFormData.set("danhmuc", this.danhmucsp.match(/[0-9]+/g)[0]);
            bodyFormData.set("thongtin", CKEDITOR.instances.editor1.getData());
            this.$axios({
              method: "post",
              url: "http://localhost:3000/api/uploadimgsp",
              data: bodyFormData,
            }).then((response) => {
              this.idsanpham = JSON.stringify(response.data[0][1][0]).match(
                /[0-9]+/g
              )[0];
              this.load = 0;
              if (response.data[1] == "1") {
                this.snackbar = true;
                this.text = "Đã gửi ảnh đại diện";
                if (this.dataimg1) {
                  const file1 = this.dataimg1;
                  this.load = 1;
                  imageConversion
                    .compressAccurately(file1, {
                      size: 16,
                      accuracy: 0.9,
                      type: "image/jpeg",
                      width: 400,
                      height: 400,
                    })
                    .then((res) => {
                      var bodyFormData = new FormData();
                      bodyFormData.append("imgsp", res);
                      bodyFormData.set("idsanpham", this.idsanpham);
                      this.$axios({
                        method: "post",
                        url: "http://localhost:3000/api/uploadimgspbe",
                        data: bodyFormData,
                      }).then((response) => {
                        this.load = 0;
                        if (response.data == "1") {
                          this.snackbar = true;
                          this.text = "Đã gửi ảnh thứ 1";
                        }
                      });
                    });
                }
                if (this.dataimg2) {
                  const file2 = this.dataimg2;
                  this.load = 1;
                  imageConversion
                    .compressAccurately(file2, {
                      size: 16,
                      accuracy: 0.9,
                      type: "image/jpeg",
                      width: 400,
                      height: 400,
                    })
                    .then((res) => {
                      var bodyFormData = new FormData();
                      bodyFormData.append("imgsp", res);
                      bodyFormData.set("idsanpham", this.idsanpham);
                      this.$axios({
                        method: "post",
                        url: "http://localhost:3000/api/uploadimgspbe",
                        data: bodyFormData,
                      }).then((response) => {
                        this.load = 0;
                        if (response.data == "1") {
                          this.snackbar = true;
                          this.text = "Đã gửi ảnh thứ 2";
                        }
                      });
                    });
                }
                if (this.dataimg3) {
                  const file3 = this.dataimg3;
                  this.load = 1;
                  imageConversion
                    .compressAccurately(file3, {
                      size: 16,
                      accuracy: 0.9,
                      type: "image/jpeg",
                      width: 400,
                      height: 400,
                    })
                    .then((res) => {
                      var bodyFormData = new FormData();
                      bodyFormData.append("imgsp", res);
                      bodyFormData.set("idsanpham", this.idsanpham);
                      this.$axios({
                        method: "post",
                        url: "http://localhost:3000/api/uploadimgspbe",
                        data: bodyFormData,
                      }).then((response) => {
                        this.load = 0;
                        if (response.data == "1") {
                          this.snackbar = true;
                          this.text = "Đã gửi ảnh thứ 3";
                        }
                      });
                    });
                }
                if (this.dataimg4) {
                  const file4 = this.dataimg4;
                  this.load = 1;
                  imageConversion
                    .compressAccurately(file4, {
                      size: 16,
                      accuracy: 0.9,
                      type: "image/jpeg",
                      width: 400,
                      height: 400,
                    })
                    .then((res) => {
                      var bodyFormData = new FormData();
                      bodyFormData.append("imgsp", res);
                      bodyFormData.set("idsanpham", this.idsanpham);
                      this.$axios({
                        method: "post",
                        url: "http://localhost:3000/api/uploadimgspbe",
                        data: bodyFormData,
                      }).then((response) => {
                        this.load = 0;
                        if (response.data == "1") {
                          this.snackbar = true;
                          this.text = "Đã gửi ảnh thứ 4";
                        }
                      });
                    });
                }
                if (this.dataimg5) {
                  const file5 = this.dataimg5;
                  this.load = 1;
                  imageConversion
                    .compressAccurately(file5, {
                      size: 16,
                      accuracy: 0.9,
                      type: "image/jpeg",
                      width: 400,
                      height: 400,
                    })
                    .then((res) => {
                      var bodyFormData = new FormData();
                      bodyFormData.append("imgsp", res);
                      bodyFormData.set("idsanpham", this.idsanpham);
                      this.$axios({
                        method: "post",
                        url: "http://localhost:3000/api/uploadimgspbe",
                        data: bodyFormData,
                      }).then((response) => {
                        this.load = 0;
                        if (response.data == "1") {
                          this.snackbar = true;
                          this.text = "Đã gửi ảnh thứ 5";
                        }
                      });
                    });
                }
                if (this.dataimg6) {
                  const file6 = this.dataimg6;
                  this.load = 1;
                  imageConversion
                    .compressAccurately(file6, {
                      size: 16,
                      accuracy: 0.9,
                      type: "image/jpeg",
                      width: 400,
                      height: 400,
                    })
                    .then((res) => {
                      var bodyFormData = new FormData();
                      bodyFormData.append("imgsp", res);
                      bodyFormData.set("idsanpham", this.idsanpham);
                      this.$axios({
                        method: "post",
                        url: "http://localhost:3000/api/uploadimgspbe",
                        data: bodyFormData,
                      }).then((response) => {
                        this.load = 0;
                        if (response.data == "1") {
                          this.snackbar = true;
                          this.text = "Đã gửi ảnh thứ 6";
                        }
                      });
                    });
                }
              }
            });
          });
      } else {
        this.snackbar = true;
        this.text = "Vui lòng điền đủ thông tin";
      }
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
          this.tenshop = response.data[0].tenshop;
          this.idshop = response.data[0].idshop;
        });
    } else {
      this.$router.push("/cuahangcuaban/caidat");
    }
  },
};
</script>