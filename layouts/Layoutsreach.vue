<template>
  <v-app>
    <!-- tap bên -->
    <v-navigation-drawer fixed app class="d-none d-lg-block">
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-filter-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content> Bộ lọc tìm kiếm </v-list-item-content>
        </v-list-item>
        <v-list-group :value="true" no-action prepend-icon="mdi-ticket">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Danh mục</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item @click="danhmuc1()">
            <v-list-item-content>
              <v-list-item-title>Điện thoại - Máy tính bảng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc2()">
            <v-list-item-content>
              <v-list-item-title>Phụ kiện - Thiết bị số</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc3()">
            <v-list-item-content>
              <v-list-item-title>Máy ảnh - Quay phim</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc4()">
            <v-list-item-content>
              <v-list-item-title>Điện gia dụng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc5()">
            <v-list-item-content>
              <v-list-item-title>Đồ dùng nhà bếp</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc6()">
            <v-list-item-content>
              <v-list-item-title>Đồ ăn - Thực phẩm</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc7()">
            <v-list-item-content>
              <v-list-item-title>Đồ chơi, Mẹ & Bé</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc8()">
            <v-list-item-content>
              <v-list-item-title>Thời trang - Phụ kiện</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc9()">
            <v-list-item-content>
              <v-list-item-title>Sách</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- địa điểm -->
      <v-list-group prepend-icon="mdi-map">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Nơi bán</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-combobox
              v-model="selecttinh"
              :items="itemstinh"
              label="Tỉnh / Thành phố"
              outlined
              dense
              @click="tinh()"
            ></v-combobox>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-combobox
              v-model="selecthuyen"
              :items="itemshuyen"
              label="Quận huyện"
              outlined
              dense
              @click="huyen()"
            ></v-combobox>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-combobox
              v-model="selectxa"
              :items="itemsxa"
              label="Phường xã"
              outlined
              dense
              @click="xa()"
            ></v-combobox>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" block @click="apdung()">ÁP dụng</v-btn>
        </v-list-item>
      </v-list-group>
      <!-- giá -->
      <v-list-group prepend-icon="mdi-currency-usd">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Khoảng giá</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-row>
              <v-col cols="6">
                <v-text-field label="TỪ" filled v-model="giadau"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="ĐẾN"
                  filled
                  v-model="giacuoi"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn color="primary" block @click="gia()">ÁP dụng</v-btn>
        </v-list-item>
      </v-list-group>
      <!-- đánh giá -->
      <v-list-group prepend-icon="mdi-currency-usd">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Đánh giá</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-select :items="datasao" filled label="Sao" v-model="sao"></v-select>
        <v-list-item>
          <v-btn color="primary" block @click="danhgia()">ÁP dụng</v-btn>
        </v-list-item>
      </v-list-group>
      <div style="height: 30px"></div>
      <v-list-item>
        <v-btn color="primary" block :to="xoatatca">Xóa tất cả</v-btn>
      </v-list-item>
      <div style="height: 50px"></div>
      <!--  -->
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
      class="d-lg-none"
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-filter-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content> Bộ lọc tìm kiếm </v-list-item-content>
        </v-list-item>
        <v-list-group :value="true" no-action prepend-icon="mdi-ticket">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Danh mục</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item @click="danhmuc1()">
            <v-list-item-content>
              <v-list-item-title>Điện thoại - Máy tính bảng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc2()">
            <v-list-item-content>
              <v-list-item-title>Phụ kiện - Thiết bị số</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc3()">
            <v-list-item-content>
              <v-list-item-title>Máy ảnh - Quay phim</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc4()">
            <v-list-item-content>
              <v-list-item-title>Điện gia dụng</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc5()">
            <v-list-item-content>
              <v-list-item-title>Đồ dùng nhà bếp</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc6()">
            <v-list-item-content>
              <v-list-item-title>Đồ ăn - Thực phẩm</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc7()">
            <v-list-item-content>
              <v-list-item-title>Đồ chơi, Mẹ & Bé</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc8()">
            <v-list-item-content>
              <v-list-item-title>Thời trang - Phụ kiện</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="danhmuc9()">
            <v-list-item-content>
              <v-list-item-title>Sách</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <!-- địa điểm -->
      <v-list-group prepend-icon="mdi-map">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Nơi bán</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-combobox
              v-model="selecttinh"
              :items="itemstinh"
              label="Tỉnh / Thành phố"
              outlined
              dense
              @click="tinh()"
            ></v-combobox>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-combobox
              v-model="selecthuyen"
              :items="itemshuyen"
              label="Quận huyện"
              outlined
              dense
              @click="huyen()"
            ></v-combobox>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-combobox
              v-model="selectxa"
              :items="itemsxa"
              label="Phường xã"
              outlined
              dense
              @click="xa()"
            ></v-combobox>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-btn color="primary" block @click="apdung()">ÁP dụng</v-btn>
        </v-list-item>
      </v-list-group>
      <!-- giá -->
      <v-list-group prepend-icon="mdi-currency-usd">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Khoảng giá</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-row>
              <v-col cols="6">
                <v-text-field label="TỪ" filled v-model="giadau"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  label="ĐẾN"
                  filled
                  v-model="giacuoi"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-btn color="primary" block @click="gia()">ÁP dụng</v-btn>
        </v-list-item>
      </v-list-group>
      <!-- đánh giá -->
      <v-list-group prepend-icon="mdi-currency-usd">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Đánh giá</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-select :items="datasao" filled label="Sao" v-model="sao"></v-select>
        <v-list-item>
          <v-btn color="primary" block @click="danhgia()">ÁP dụng</v-btn>
        </v-list-item>
      </v-list-group>
      <div style="height: 30px"></div>
      <v-list-item>
        <v-btn color="primary" block :to="xoatatca">Xóa tất cả</v-btn>
      </v-list-item>
      <div style="height: 50px"></div>
    </v-navigation-drawer>
    <!-- tab top -->
    <v-app-bar :clipped-left="clipped" fixed app dense>
      <div class="d-md-none" :class="[$style.goback]">
        <v-btn @click="$router.go(-1)" icon large color="blue">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <div :class="[$style.trai]" class="d-none d-md-flex"></div>
      <NuxtLink to="/" class="thanhtrenmaytinhiconlink">
        <img src="/icona.png" :class="[$style.icon]" class="d-none d-md-flex" />
      </NuxtLink>
      <div style="width: 40px" class="d-none d-md-flex"></div>
      <div :class="[$style.input]">
        <v-autocomplete
          :items="entries"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="ten"
          label="Tìm kiếm"
          placeholder="Bạn tìm gì hôm nay?"
          return-object
          dense
          outlined
          no-filter
          @keyup.enter="onenter"
        >
          <template v-slot:item="{ item }">
            <v-list-item link :to="'/search/?q=' + item.ten">{{
              item.ten
            }}</v-list-item>
          </template>
        </v-autocomplete>
      </div>
      <div class="d-none d-md-flex" :class="[$style.giohang]">
        <v-btn nuxt to="/cart" plain large>
          <v-icon>mdi-cart-outline</v-icon>
          <span>Giỏ hàng</span>
        </v-btn>
        
      </div>
      <div class="d-md-none">
        <v-btn nuxt to="/inspire" icon large>
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <!-- nội dung -->
    <v-main>
      <div :class="[$style.loc]" class="d-lg-none">
        <div :class="[$style.locsapxep]">
          <v-select
            :items="sapxep"
            label="Sắp xếp"
            dense
            height="20px"
            v-model="tab"
            @change="sapxep1()"
          ></v-select>
        </div>
        <div @click.stop="drawer = !drawer">
          <v-icon>mdi-filter-outline</v-icon>&nbsp;Bộ lọc
        </div>
      </div>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style module>
.trai {
  width: 10px;
}
.icon {
  height: 30px;
  width: 30px;
}
.input {
  margin-top: 26px;
  width: 90%;
}
.giohang {
  width: 200px;
  display: flex;
  align-items: center;
  margin-left: 15%;
}
.goback {
  position: relative;
  left: -10px;
}
.loc {
  position: fixed;
  left: 0;
  right: 0;
  top: 48px;
  z-index: 1;
  background: #fff;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  height: 50px;
  border-bottom: 1px solid gainsboro;
}
.locsapxep {
  width: 100px;
}
</style>
<script>
export default {
  name: "Layoutsreach",
  data() {
    return {
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
      clipped: false,
      drawer: false,
      entries: [],
      search: null,
      datasao: ["1", "2", "3", "4", "5"],
      xoatatca: "/search/?q=" + this.$route.query.q,
      tab: "Phổ Biến",
      sapxep: ["Phổ Biến", "Bán Chạy", "Giá Thấp", "Giá Cao"],
      giadau: null,
      giacuoi: null,
      sao: null,
    };
  },
  methods: {
    danhmuc1() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=1"
      );
    },
    danhmuc2() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=2"
      );
    },
    danhmuc3() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=3"
      );
    },
    danhmuc4() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=4"
      );
    },
    danhmuc5() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=5"
      );
    },
    danhmuc6() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=6"
      );
    },
    danhmuc7() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=7"
      );
    },
     danhmuc8() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=8"
      );
    },
     danhmuc9() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&page=" +
          this.$route.query.page +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=9"
      );
    },
    onenter() {
      this.$router.push("/search/?q=" + this.search);
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
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          results2[0] +
          "&huyen=" +
          results1[0] +
          "&xa=" +
          results[0] +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=" +
          this.$route.query.danhmuc
      );
    },
    gia() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.giadau +
          "&giacuoi=" +
          this.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=" +
          this.$route.query.danhmuc
      );
    },
    danhgia() {
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.sao +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=" +
          this.$route.query.danhmuc
      );
    },
    sapxep1() {
      var tab = "";
      if (this.tab == "Phổ Biến") {
        var tab = "0";
      }
      if (this.tab == "Bán Chạy") {
        var tab = "1";
      }
      if (this.tab == "Giá Thấp") {
        var tab = "2";
      }
      if (this.tab == "Giá Cao") {
        var tab = "3";
      }
      this.$router.push(
        "/search/?q=" +
          this.$route.query.q +
          "&tinh=" +
          this.$route.query.tinh +
          "&huyen=" +
          this.$route.query.huyen +
          "&xa=" +
          this.$route.query.xa +
          "&giadau=" +
          this.$route.query.giadau +
          "&giacuoi=" +
          this.$route.query.giacuoi +
          "&danhgia=" +
          this.$route.query.danhgia +
          "&sapxep=" +
          tab +
          "&danhmuc=" +
          this.$route.query.danhmuc
      );
    },
  },
  watch: {
    search(val) {
      if (val) {
        this.$axios
          .post("http://localhost:3000/api/autosearch", {
            query: val,
          })
          .then((response) => {
            this.entries = response.data;
          });
      }
    },
  },
};
</script>