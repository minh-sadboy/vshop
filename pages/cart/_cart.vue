<template>
  <v-app>
    <Thanhtren v-if="anhientieudemap" />
    <v-app-bar
      fixed
      app
      dense
      :class="[$style.tieudemap]"
      v-if="!anhientieudemap"
    >
      <v-btn @click="anhientieudemap = true" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>Vị trí nhận hàng</v-toolbar-title>
    </v-app-bar>
    <v-container v-if="anhientieudemap">
      <div style="height: 60px"></div>
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Giỏ hàng
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Địa chỉ nhận hàng
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> Thanh toán & Đặt mua </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-radio-group v-model="column" @change="tinhtien()">
              <v-card
                class="mb-5 py-2 pl-1"
                v-for="(data, index1) in datashop"
                :key="data.datashop"
              >
                <div :class="[$style.tenshop]">
                  <v-radio :label="data.tenshop" :value="index1"></v-radio>
                  <span @click="xoashop(index1)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                    Xóa
                  </span>
                </div>
                <v-row
                  no-gutters
                  v-for="(data1, index) in data.sp"
                  :key="data1.data"
                >
                  <v-col cols="4" md="2">
                    <img
                      loading="lazy"
                      :src="data1.imgsp"
                      :class="[$style.imgsanpham]"
                    />
                  </v-col>
                  <v-col cols="8" md="5" class="px-2"> {{ data1.tensp }}</v-col>
                  <v-col cols="8" md="5" class="pt-2">
                    <v-col :class="[$style.giabox]" class="d-md-none">
                      <div :class="[$style.giasp]">
                        {{
                          (
                            Math.round(
                              (data1.giasp -
                                (data1.giasp * data1.giamgia) / 100) /
                                1000
                            ) * 1000
                          ).toLocaleString("it-IT")
                        }}₫
                      </div>
                      <div :class="[$style.giacu]">
                        {{ Math.round(data1.giasp).toLocaleString("it-IT") }}đ
                      </div>
                    </v-col>
                    <div class="d-flex">
                      <v-col>
                        <div class="d-flex">
                          <span
                            :class="[$style.congtru]"
                            @click="giam(index1, index)"
                            >-</span
                          >
                          <span :class="[$style.congtru]">{{
                            data1.soluongsp
                          }}</span>
                          <span
                            :class="[$style.congtru]"
                            @click="tang(index1, index)"
                            >+</span
                          >
                        </div>
                      </v-col>
                      <v-col :class="[$style.giabox]" class="d-none d-md-flex">
                        <div :class="[$style.giasp]">
                          {{
                            (
                              Math.round(
                                (data1.giasp -
                                  (data1.giasp * data1.giamgia) / 100) /
                                  1000
                              ) * 1000
                            ).toLocaleString("it-IT")
                          }}₫
                        </div>
                        <div :class="[$style.giacu]">
                          {{ Math.round(data1.giasp).toLocaleString("it-IT") }}đ
                        </div>
                      </v-col>
                      <v-col>
                        <div
                          :class="[$style.xoasp]"
                          @click="xoa(index1, index)"
                        >
                          Xóa
                        </div>
                      </v-col>
                    </div>
                  </v-col>
                  <div style="width: 100%; margin-bottom: 15px">
                    <v-divider></v-divider>
                  </div>
                </v-row>
              </v-card>
            </v-radio-group>

            <div :class="[$style.gia]">
              Tổng cộng:
              <span :class="[$style.giatien]"
                >{{ Math.round(this.tonggia).toLocaleString("it-IT") }}₫</span
              >
            </div>
            <v-btn color="#ff424e" @click="muahang()" dark> Mua hàng </v-btn>
            <div style="height: 56px"></div>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card class="mb-12">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="name"
                    :rules="nameRules"
                    label="Tên người nhận"
                    required
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="phone"
                    :rules="namePhone"
                    :counter="12"
                    label="Số điện thoại"
                    required
                    readonly
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="diachinhanhang"
                    :rules="diachinhanhangRules"
                    label="Địa chỉ nhận hàng"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-combobox
                    v-model="selecttinh"
                    :items="itemstinh"
                    label="Tỉnh / Thành phố"
                    outlined
                    dense
                    @click="tinh()"
                  ></v-combobox>
                </v-col>

                <v-col cols="12" md="4">
                  <v-combobox
                    v-model="selecthuyen"
                    :items="itemshuyen"
                    label="Quận huyện"
                    outlined
                    dense
                    @click="huyen()"
                  ></v-combobox>
                </v-col>

                <v-col cols="12" md="4">
                  <v-combobox
                    v-model="selectxa"
                    :items="itemsxa"
                    label="Phường xã"
                    outlined
                    dense
                    @click="xa()"
                  ></v-combobox>
                </v-col>
              </v-row>
              <v-btn color="blue" dark @click="chonmap()">
                <v-icon dark> mdi-map-outline </v-icon>&nbsp;
                <span v-if="chonvitrigiaohang">Chọn vị trí giao hàng</span>
                <span v-if="!chonvitrigiaohang"
                  >{{ this.toadovitri.lat }} , {{ this.toadovitri.lng }}</span
                >
              </v-btn>
              <div style="height: 30px"></div>
            </v-card>
            <v-btn color="primary" @click="apdung()"> Tiếp tục </v-btn>

            <v-btn text @click="e1 = 1"> Quay lại </v-btn>
            <div style="height: 56px"></div>
          </v-stepper-content>

          <v-stepper-content step="3">
            <v-card class="mb-12">
              <v-row no-gutters>
                <v-col cols="12" md="6" class="px-2">
                  <div :class="[$style.diachinhanhang]">Địa chỉ nhận hàng</div>
                  <div class="mt-3">
                    {{ this.name }} - {{ this.phone }} -
                    {{ Math.round(khoangcach) }}km<br />{{ selectxa }} -
                    {{ selecthuyen }} - {{ selecttinh }}<br />{{
                      this.diachinhanhang
                    }}
                  </div>
                  <div style="height: 30px"></div>
                </v-col>
                <v-col cols="12" md="6">
                  <iframe
                    :src="urliframe"
                    frameborder="0"
                    :class="[$style.iframe]"
                  ></iframe>
                </v-col>
              </v-row>
              <div style="height: 50px"></div>
              <div :class="[$style.diachinhanhang]" class="px-2">
                Thời gian giao hàng dự kiến: 24 -> 48 giờ
              </div>
              <div v-for="data2 in datadonhang.sp" :key="data2.datadonhang">
                <div :class="[$style.thanhtoansp]">
                  <div class="d-flex">
                    <img :src="data2.imgsp" style="width: 50px; height: 50px" />
                    <div class="ml-3">
                      {{ data2.tensp }}<br />
                      Số lượng: {{ data2.soluongsp }}
                    </div>
                  </div>
                  <div>
                    {{
                      (
                        Math.round(
                          (data2.giasp - (data2.giasp * data2.giamgia) / 100) /
                            1000
                        ) * 1000
                      ).toLocaleString("it-IT")
                    }}₫&nbsp;&nbsp;&nbsp;
                  </div>
                </div>
                <div style="height: 20px"></div>
                <v-divider></v-divider>
              </div>
              <div style="height: 50px"></div>
              <div :class="[$style.diachinhanhang]" class="px-2">Đơn hàng</div>
              <v-row no-gutters>
                <v-col cols="6">
                  <div class="px-2 pt-3">Tạm tính</div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-3 float-right">
                    {{ Math.round(this.tonggia).toLocaleString("it-IT") }}₫
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-2">Phí vận chuyến</div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-2 float-right">
                    {{
                      (
                        Math.round(
                          (this.khoangcach * 4000 + this.cannang * 3000) / 1000
                        ) * 1000
                      ).toLocaleString("it-IT")
                    }}₫
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-2">
                    Khuyến mãi vận chuyển
                    <span style="color: rgb(13, 92, 182)">&nbsp;-50%</span>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-2 float-right">
                    <span style="color: rgb(0, 153, 0)">
                      -{{
                        (
                          Math.round(
                            (this.khoangcach * 4000 + this.cannang * 3000) /
                              1000 /
                              2
                          ) * 1000
                        ).toLocaleString("it-IT")
                      }}₫</span
                    >
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-5">Thành tiền</div>
                </v-col>
                <v-col cols="6">
                  <div class="px-2 pt-5 float-right">
                    <span style="color: #ff424e; font-size: 20px"
                      >{{
                        (
                          Math.round(this.tonggia) +
                          (Math.round(
                            (this.khoangcach * 4000 + this.cannang * 3000) /
                              1000
                          ) *
                            1000 -
                            Math.round(
                              (this.khoangcach * 4000 + this.cannang * 3000) /
                                1000 /
                                2
                            ) *
                              1000)
                        ).toLocaleString("it-IT")
                      }}₫</span
                    >
                  </div>
                </v-col>
              </v-row>
              <div style="height: 10px"></div>
            </v-card>

            <v-btn color="primary" @click="dathang()"> Đặt hàng </v-btn>
            <v-btn text @click="e1 = 2"> Quay lại </v-btn>
            <div style="height: 56px"></div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
      <!-- trang thông báo -->
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Đóng
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
    <div :class="[$style.map]" v-show="!anhientieudemap">
      <div id="map" :class="[$style.map1]"></div>
    </div>
    <div :class="[$style.vitri]" v-show="!anhientieudemap">
      <v-btn color="blue" dark fab @click="vitri()">
        <v-icon>mdi-crosshairs</v-icon>
      </v-btn>
    </div>
    <div :class="[$style.vetinh]" v-show="!anhientieudemap">
      <v-tooltip left v-if="vetinh">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue"
            dark
            v-bind="attrs"
            v-on="on"
            height="50"
            @click="setBasemap('ImageryClarity')"
          >
            <v-icon>mdi-satellite-variant</v-icon>
          </v-btn>
        </template>
        <span>Vệ tinh</span>
      </v-tooltip>
      <v-tooltip left v-if="!vetinh">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue"
            dark
            v-bind="attrs"
            v-on="on"
            height="50"
            @click="setBasemap('Topographic')"
          >
            <v-icon>mdi-image</v-icon>
          </v-btn>
        </template>
        <span>Đường phố</span>
      </v-tooltip>
    </div>
    <div :class="[$style.xacnhan]" v-show="!anhientieudemap">
      <v-btn block color="blue" dark @click="vitrinhanhang()">
        Đặt làm địa điểm nhận hàng
      </v-btn>
    </div>
  </v-app>
</template>

<style module>
@media only all and (max-width: 960px) {
  .map1 {
    width: 100%;
    height: calc(100vh - 106px);
  }
  .vitri {
    position: fixed;
    z-index: 400;
    bottom: 137px;
    right: 10px;
  }
  .xacnhan {
    position: fixed;
    z-index: 400;
    bottom: 56px;
    right: 0px;
    left: 0px;
    padding: 10px;
    padding-bottom: 20px;
    background-color: #fff;
    border-top: 1px solid gainsboro;
  }
}
@media only all and (min-width: 960px) {
  .tieudemap {
    margin-left: 70px;
  }
  .map {
    margin-left: 70px;
  }
  .map1 {
    width: 100%;
    height: calc(100vh - 50px);
  }
  .vitri {
    position: fixed;
    z-index: 400;
    bottom: 30px;
    right: 15px;
  }
  .xacnhan {
    position: fixed;
    z-index: 400;
    bottom: 30px;
    left: 85px;
  }
}
.vetinh {
  position: fixed;
  z-index: 400;
  top: 58px;
  right: 15px;
}
.gia {
  margin-top: 50px;
  margin-bottom: 20px;
}
.giatien {
  font-size: 20px;
  color: #ff424e;
  margin-left: 10px;
}
.tenshop {
  font-weight: 600;
  display: flex;
  justify-content: space-between;
}
.imgsanpham {
  width: 80px;
  height: 80px;
}
.congtru {
  border: 1px solid grey;
  padding: 2px 10px;
  cursor: pointer;
}
.xoasp {
  color: #2196f3;
}
.giabox {
  display: flex;
  align-items: center;
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
.diachinhanhang {
  font-weight: 600;
}
.iframe {
  width: 100%;
  height: 300px;
}
.thanhtoansp {
  margin-top: 20px;
  display: flex;
  margin-left: 12px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
</style>

<script>
export default {
  middleware: ["auth"],
  head() {
    return {
      title: "Giỏ hàng | vivishop",
    };
  },
  data() {
    return {
      urliframe: null,
      e1: 1,
      datashop: null,
      column: 0,
      tonggia: 0,
      datadonhang: { sp: null },
      snackbar: false,
      text: "",
      timeout: 2000,
      name: "",
      nameRules: [(v) => !!v || "Vui lòng nhập họ tên"],
      phone: "",
      namePhone: [(v) => !!v || "Vui lòng nhập số điện thoại"],
      diachinhanhang: "",
      diachinhanhangRules: [(v) => !!v || "Vui lòng nhập địa chỉ nhận hàng"],
      selecttinh: null,
      itemstinh: [],
      datatinh: [],
      idtinh: null,
      selecthuyen: null,
      itemshuyen: [],
      datahuyen: [],
      idhuyen: null,
      selectxa: null,
      itemsxa: [],
      dataxa: [],
      idxa: null,
      anhientieudemap: true,
      layer: null,
      map: null,
      bando: "0",
      lat: "0",
      lng: "0",
      vetinh: true,
      toadovitri: { lat: "0", lng: "0" },
      chonvitrigiaohang: true,
      cannang: 0,
      khoangcach: 0,
    };
  },
  methods: {
    tinhtien() {
      const idshop = JSON.parse(localStorage.getItem("idshop"));
      if (localStorage.getItem("idshop") == "[]") {
      } else {
        this.datadonhang = idshop[this.column];
        var gia = 0;
        var cannang = 0;
        for (let i = 0; i < idshop[this.column].sp.length; i++) {
          if (isNaN(idshop[this.column].sp[i].giasp)) {
          } else {
            gia += parseInt(
              Math.round(
                (idshop[this.column].sp[i].giasp -
                  (idshop[this.column].sp[i].giasp *
                    idshop[this.column].sp[i].giamgia) /
                    100) /
                  1000
              ) *
                1000 *
                idshop[this.column].sp[i].soluongsp
            );
            cannang +=
              Number(idshop[this.column].sp[i].cannangsp) *
              Number(idshop[this.column].sp[i].soluongsp);
          }
        }
        this.tonggia = gia;
        this.cannang = cannang;
      }
    },
    xoashop(idshop) {
      this.datashop.splice(idshop, 1);
      if (this.datashop.length == 0) {
        localStorage.setItem("idshop", "[]");
        this.$router.push("/");
      }
    },
    xoa(a, b) {
      this.datashop[a].sp.splice(b, 1);
      localStorage.setItem("idshop", JSON.stringify(this.datashop));
      this.tinhtien();
    },
    tang(a, b) {
      const sotang = this.datashop[a].sp[b].soluongsp;
      const sotang1 = parseInt(sotang) + 1;
      this.datashop[a].sp[b].soluongsp = sotang1;
      localStorage.setItem("idshop", JSON.stringify(this.datashop));
      this.tinhtien();
    },
    giam(a, b) {
      const sotang = this.datashop[a].sp[b].soluongsp;
      if (sotang > 1) {
        const sotang1 = parseInt(sotang) - 1;
        this.datashop[a].sp[b].soluongsp = sotang1;
        localStorage.setItem("idshop", JSON.stringify(this.datashop));
        this.tinhtien();
      }
    },
    muahang() {
      if (this.tonggia == "0") {
        this.snackbar = true;
        this.text = "Bạn vẫn chưa chọn sản phẩm nào để mua";
      } else {
        this.e1 = 2;
      }
    },
    tinh() {
      this.$axios
        .get("https://vapi.vnappmob.com/api/province/")
        .then((response) => {
          this.datatinh = response.data.results;
          for (let i = 0; i < response.data.results.length; i++) {
            let obj = response.data.results[i];
            this.itemstinh.push(obj.province_name);
          }
        });
    },
    huyen() {
      this.itemshuyen = [];
      let obj = this.datatinh;
      let results = [];
      let searchField = "province_name";
      let searchVal = this.selecttinh;
      for (let i = 0; i < obj.length; i++) {
        if (obj[i][searchField] == searchVal) {
          results.push(obj[i].province_id);
        }
      }
      this.idtinh = results[0];
      this.$axios
        .get("https://vapi.vnappmob.com/api/province/district/" + results[0])
        .then((response) => {
          this.datahuyen = response.data.results;
          for (let i1 = 0; i1 < response.data.results.length; i1++) {
            let obj1 = response.data.results[i1];
            this.itemshuyen.push(obj1.district_name);
          }
        });
    },

    xa() {
      this.itemsxa = [];
      let obj = this.datahuyen;
      let results = [];
      let searchField = "district_name";
      let searchVal = this.selecthuyen;
      for (let i = 0; i < obj.length; i++) {
        if (obj[i][searchField] == searchVal) {
          results.push(obj[i].district_id);
        }
      }
      this.idhuyen = results[0];
      this.$axios
        .get("https://vapi.vnappmob.com/api/province/ward/" + results[0])
        .then((response) => {
          this.dataxa = response.data.results;
          for (let i1 = 0; i1 < response.data.results.length; i1++) {
            let obj1 = response.data.results[i1];
            this.itemsxa.push(obj1.ward_name);
          }
        });
    },
    apdung() {
      let obj2 = this.datatinh;
      let results2 = [];
      let searchField2 = "province_name";
      let searchVal2 = this.selecttinh;
      for (let i = 0; i < obj2.length; i++) {
        if (obj2[i][searchField2] == searchVal2) {
          results2.push(obj2[i].province_id);
        }
      }
      this.idtinh = results2[0];
      let obj1 = this.datahuyen;
      let results1 = [];
      let searchField1 = "district_name";
      let searchVal1 = this.selecthuyen;
      for (let i = 0; i < obj1.length; i++) {
        if (obj1[i][searchField1] == searchVal1) {
          results1.push(obj1[i].district_id);
        }
      }
      this.idhuyen = results1[0];
      let obj = this.dataxa;
      let results = [];
      let searchField = "ward_name";
      let searchVal = this.selectxa;
      for (let i = 0; i < obj.length; i++) {
        if (obj[i][searchField] == searchVal) {
          results.push(obj[i].ward_id);
        }
      }
      this.idxa = results[0];
      if (
        this.idtinh !== null &&
        this.idhuyen !== null &&
        this.idxa !== null &&
        this.name.length > 1 &&
        this.phone.length > 1 &&
        this.diachinhanhang.length > 1 &&
        this.chonvitrigiaohang == false
      ) {
        this.e1 = 3;
        this.urliframe =
          "http://localhost:3000/cartmap?shop=" +
          this.datadonhang.diachishop +
          "&khach=" +
          this.toadovitri.lat +
          "," +
          this.toadovitri.lng;
        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
          var R = 6371;
          var dLat = deg2rad(lat2 - lat1);
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c;
          return d;
        }
        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }
        this.khoangcach = getDistanceFromLatLonInKm(
          this.datadonhang.diachishop.split(",")[0],
          this.datadonhang.diachishop.split(",")[1],
          this.toadovitri.lat,
          this.toadovitri.lng
        );
      } else {
        this.snackbar = true;
        this.text = "Vui lòng điền đầy đủ thông tin";
      }
    },
    chonmap() {
      this.anhientieudemap = false;
      if (this.map == null) {
        var that = this;
        setTimeout(function () {
          var map = L.map("map", {
            minZoom: 1,
            maxZoom: 17,
          }).setView([20.242422479862558, 106.47550547098923], 12);
          var layer = L.esri.basemapLayer("Topographic").addTo(map);

          that.layer = layer;
          that.map = map;
          var marker = L.marker(map.getCenter()).addTo(map);
          map.on("move", function (e) {
            marker.setLatLng(map.getCenter());
          });
        }, 500);
      }
    },
    vitri() {
      navigator.geolocation.getCurrentPosition((loc) => {
        this.lat = loc.coords.latitude;
        this.lng = loc.coords.longitude;
      });
      var bando = this.bando;
      var map = this.map;
      var lat = this.lat;
      var lng = this.lng;
      if (lat == "0") {
      } else {
        var bluedotcon = L.icon({
          iconUrl: "/img/bluedot.jpg",
          iconSize: [50, 50],
        });
        if (bando == "0") {
          L.marker([lat, lng], {
            icon: bluedotcon,
          }).addTo(map);
          map.flyTo([lat, lng], 15);
          this.bando = "1";
        } else {
          map.flyTo([lat, lng], 15);
        }
      }
    },
    setBasemap(basemap) {
      var layer = this.layer;
      var map = this.map;
      var layerLabels;
      if (layer) {
        map.removeLayer(layer);
      }
      layer = L.esri.basemapLayer(basemap);
      map.addLayer(layer);
      if (layerLabels) {
        map.removeLayer(layerLabels);
      }
      layerLabels = L.esri.basemapLayer(basemap);
      map.addLayer(layerLabels);
      const vetinh = this.vetinh;
      this.vetinh = !vetinh;
    },
    vitrinhanhang() {
      this.toadovitri = this.map.getCenter();
      this.anhientieudemap = true;
      this.chonvitrigiaohang = false;
    },
    dathang() {
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
      // thông báo
      this.$axios.post("http://localhost:3000/api/thongbaomuadh", {
        idshop: this.datadonhang.idshop,
        giadh: this.tonggia,
      });
      // mess
      this.$axios.post("http://localhost:3000/api/facebookdhgui", {
        idshop: this.datadonhang.idshop,
        giadh: this.tonggia,
      });
      // đơn hàng
      this.$axios
        .post("http://localhost:3000/api/donhang", {
          idkhdh: this.$store.state.idkh,
          khoangcachdh: this.khoangcach,
          idtinhdh: this.idtinh,
          idhuyendh: this.idhuyen,
          idxadh: this.idxa,
          textdiachidh:
            this.selectxa + " - " + this.selecthuyen + " - " + this.selecttinh,
          ghichudh: this.diachinhanhang,
          cannangdh: this.cannang,
          datadonhang: JSON.stringify(this.datadonhang),
          toadovitridh: JSON.stringify(this.toadovitri),
          tonggiadh: this.tonggia,
          thanhtiendh:
            Math.round(this.tonggia) +
            (Math.round((this.khoangcach * 4000 + this.cannang * 3000) / 1000) *
              1000 -
              Math.round(
                (this.khoangcach * 4000 + this.cannang * 3000) / 1000 / 2
              ) *
                1000),
          idshopdh: this.datadonhang.idshop,
          timedh: timedh,
        })
        .then((response) => {
          if (response.data == 1) {
            localStorage.removeItem("idshop");
            this.$router.push("/customer/donhang");
          }
        });
    },
  },
  mounted() {
    this.name = this.$store.state.khachhangten;
    this.phone = this.$store.state.phone;
    const idshop = localStorage.getItem("idshop");
    if (idshop == null) {
      localStorage.setItem("idshop", "[]");
    }
    if (isNaN(this.$route.query.idshop) && isNaN(this.$route.query.idsp)) {
    } else {
      const idshop = JSON.parse(localStorage.getItem("idshop"));
      idshop.push({
        idshop: this.$route.query.idshop,
        tenshop: this.$route.query.tenshop,
        diachishop: this.$route.query.diachi,
        sp: [],
      });
      const idshop1 = idshop.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj.idshop).indexOf(obj.idshop) == pos;
      });
      const obj = idshop1;
      const results = [];
      const searchField = "idshop";
      const searchVal = this.$route.query.idshop;
      for (let i = 0; i < obj.length; i++) {
        if (obj[i][searchField] == searchVal) {
          results.push(obj[i]);
        }
      }
      results[0].sp.push({
        idsp: this.$route.query.idsp,
        imgsp: this.$route.query.imgsp,
        tensp: this.$route.query.tensp,
        giasp: this.$route.query.giasp,
        soluongsp: this.$route.query.soluongsp,
        giamgia: this.$route.query.giamgia,
        idshopsp: this.$route.query.idshop,
        cannangsp: this.$route.query.cannang,
      });

      localStorage.setItem("idshop", JSON.stringify(idshop1));
    }
    this.$router.push("/cart");
    const datashop = localStorage.getItem("idshop");
    this.datashop = JSON.parse(datashop);
    this.tinhtien();
  },
};
</script>