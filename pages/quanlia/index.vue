<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-toolbar-title>Quản lí</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container v-if="mokhoa">
        <v-btn @click="themshop()" v-show="!themshopok">Thêm shop</v-btn>
        <div style="height: 30px"></div>
        <div v-show="!themshopok">
          <div v-for="data in datashop" :key="data.datashop">
            <v-card class="pa-2">
              Tên shop: {{ data.tenshopdks }}<br />
              ID: {{ data.firebasedks }}<br />
              Mã: {{ data.madks }}<br />
              Gmail: {{ data.gmaildks }} <br />
              Tên khách: {{ data.khachhangten }} <br />
              Số điện thoại: {{ data.phone }} <br />
              Img: {{ data.imgdaidien }} <br />
            </v-card>
            <div style="height: 20px"></div>
          </div>
        </div>
        <div v-show="themshopok">
          <v-btn @click="themshopok = false">Quay lại</v-btn>
          <div style="height: 20px"></div>
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
            <v-btn @click="apdung()">OK</v-btn>
          </v-row>
          <div style="height: 30px"></div>
          <div>
            Đánh giá<br />
            <input type="number" value="1" v-model="danhgia" /><br />
            Tên shop<br />
            <input type="text" placeholder="Tên shop" v-model="tenshop" /><br />
            Img<br />
            <input type="text" placeholder="Img" v-model="img" /><br />
            Địa chỉ<br />
            <input type="text" placeholder="Địa chỉ" v-model="diachi" /><br />
            Id<br />
            <input type="text" placeholder="Id" v-model="id" /><br />
            Liên hệ shop<br />
            <input type="text" placeholder="Liên hệ" v-model="lienhe" /><br />
            <br />
            <v-btn @click="gui()">Gửi</v-btn>
          </div>
        </div>
      </v-container>
      <v-container v-if="!mokhoa">
        <input type="text" v-model="data" placeholder="Tên" />
        <v-btn @click="ok()">OK</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>
<style module>
</style>
<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Quản lí | vivishop",
    };
  },
  data() {
    return {
      data: null,
      mokhoa: false,
      datashop: null,
      themshopok: false,
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
      danhgia: null,
      tenshop: null,
      img: null,
      diachi: null,
      id: null,
      lienhe: null,
    };
  },
  methods: {
    gui() {
      this.$axios
        .post("http://localhost:3000/api/quanlithem", {
          idtinh: this.idtinh,
          idhuyen: this.idhuyen,
          idxa: this.idxa,
          danhgia: this.danhgia,
          tenshop: this.tenshop,
          img: this.img,
          diachi: this.diachi,
          id: this.id,
          lienhe: this.lienhe,
          data: this.data
        })
        .then((response) => {
          if (response.data == "1") {
            alert("ok")
          }
        });
    },
    ok() {
      this.$axios
        .post("http://localhost:3000/api/quanli", {
          data: this.data,
        })
        .then((response) => {
          if (response.data[1] == "1") {
            this.datashop = response.data[0];
            this.mokhoa = true;
          }
        });
    },
    themshop() {
      this.themshopok = true;
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
    },
  },
};
</script>