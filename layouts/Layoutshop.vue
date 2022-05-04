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
          :search-input.sync="search"
          hide-no-data
          hide-selected
          label="Tìm kiếm tại cửa hàng"
          placeholder="Bạn tìm gì hôm nay?"
          return-object
          dense
          outlined
          no-filter
          @keyup.enter="onenter"
        >
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
  position: absolute;
  left: 0;
  right: 0;
  top: 130px;
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
  name: "Layoutshop",
  data() {
    return {
      clipped: false,
      drawer: false,
      search: null,
      tab: "Phổ Biến",
      sapxep: ["Phổ Biến", "Bán Chạy", "Giá Thấp", "Giá Cao"],
    };
  },
  methods: {
    danhmuc1() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q==" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=1" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc2() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=2" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc3() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=3" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc4() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=4" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc5() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=5" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc6() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=6" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc7() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=7" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc8() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=8" +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    danhmuc9() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          query +
          "&sapxep=" +
          this.$route.query.sapxep +
          "&danhmuc=9" +
          "&shopid=" +
          this.$route.query.shopid
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
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.tenshop +
          "&q=" +
          query +
          "&sapxep=" +
          tab +
          "&danhmuc=" +
          this.$route.query.danhmuc +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
    onenter() {
      this.$router.push(
        "/shop/?cuahang=" +
          this.$route.query.cuahang +
          "&q=" +
          this.search +
          "&shopid=" +
          this.$route.query.shopid
      );
    },
  },
};
</script>