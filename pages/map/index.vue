<template>
<v-app>
    <v-navigation-drawer v-model="drawer" fixed app right style="z-index: 401;">
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-filter-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content> Bộ lọc tìm kiếm </v-list-item-content>
        </v-list-item>
        <v-list-group :value="true" prepend-icon="mdi-map">
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
        <v-list-group prepend-icon="mdi-cog-outline" no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Cài đặt</v-list-item-title>
          </v-list-item-content>
        </template>
           <v-list-item @click="setBasemap('Topographic')">
              <v-list-item-title>
                <v-icon>mdi-image</v-icon>&nbsp;&nbsp;Đường
                phố</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="setBasemap('ImageryClarity')">
              <v-list-item-title
                ><v-icon>mdi-satellite-variant</v-icon>&nbsp;&nbsp;Vệ tinh</v-list-item-title
              >
            </v-list-item>   
      </v-list-group>
      </v-list>
      <div style="height: 50px"></div>
      <!--  -->
    </v-navigation-drawer>
  <v-app-bar dense position: fixed >
    <div  :class="[$style.trai]" class="d-none d-md-flex"></div>   
    <NuxtLink to="/" class="thanhtrenmaytinhiconlink">
      <img src="/icona.png" :class="[$style.icon]" class="d-none d-md-flex"/>
    </NuxtLink>
    <v-btn @click="$router.go(-1)" icon large color="blue" class="d-md-none">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    <div style="width:40px" class="d-none d-md-flex"></div>
      <v-btn icon large @click="drawer = !drawer">
    <v-icon>mdi-menu</v-icon>
    </v-btn>     
    
    
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
      >
      <template v-slot:item="{ item }" >
          <v-list-item  :z-index="400" link :to="'/mapshop?tenshop=' + item.tenshop + '&toado=' + item.diachi + '&id=' + item.idshop">{{item.tenshop}}</v-list-item>
      </template>        
    </v-autocomplete> 
      
     
    </div>    
    <div class="d-none d-md-flex" :class="[$style.giohang]">
       <v-btn nuxt to="/cart" plain large>
          <v-icon>mdi-cart-outline</v-icon>
          <span>Giỏ hàng</span>
       </v-btn>
        
    </div>
  </v-app-bar>
   <div :class="[$style.map]">
     <div id="map" :class="[$style.map1]"></div>
   </div>
 <div :class="[$style.vitri]">
      <v-btn color="blue" dark fab @click="vitri()">
     <v-icon>mdi-crosshairs</v-icon>
    </v-btn>
 </div>

  </v-app>
</template>
<style>
.v-autocomplete__content {
  z-index: 402 !important;
}
</style>
<style module>
@media only all and (max-width: 960px) {
  .map {
    margin-top: 49px;
    margin-bottom: 56px;
  }
  .map1 {
    width: 100%;
    height: calc(100vh - 106px);
  }
  .vitri {
    position: fixed;
    z-index: 400;
    bottom: 80px;
    right: 10px;
  }
}
@media only all and (min-width: 960px) {
  .map {
    margin-top: 49px;
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
}

.trai {
  width: 100px;
}
.icon {
  height: 30px;
  width: 30px;
}

.input {
  margin-top: 26px;
  width: 90%;
  margin-left: 10px;
}
.nuxtlink {
  text-decoration: none;
  color: #000 !important;
}
.giohang {
  width: 200px;
  display: flex;
  align-items: center;
  margin-left: 15%;
}
</style>

<style>
.thanhtrenmaytinhiconlink.nuxt-link-exact-active {
  background-color: rgba(255, 255, 255, 0);
}
</style>

<script>
export default {
  watchQuery: true,
   head() {
    return {
      title: "Bản đồ | vivishop",
    };
  },
  data() {
    return {
      entries: [],
      search: null,
      drawer: false,
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
      bando: "0",
      lat: "0",
      lng: "0",
    };
  },
  mounted() {
    this.khoitaomap();
  },
  async asyncData({ $axios, route }) {
    const ip = await $axios.$post("http://localhost:3000/api/mapapi", {
      tinh: route.query.tinh,
      huyen: route.query.huyen,
      xa: route.query.xa,
    });
    return { datatoado: ip };
  },
  methods: {
    khoitaomap() {
      var map = L.map("map", {
        minZoom: 1,
        maxZoom: 17,
      }).setView([20.242422479862558, 106.47550547098923], 12);
      var layer = L.esri.basemapLayer("Topographic").addTo(map);
      this.datatoado.forEach(function (item, index) {
        L.marker(item.diachi.split(","))
          .addTo(map)
          .bindPopup(
            "<a href='/shop/?cuahang=" +
              item.tenshop +
              "&shopid=" +
              item.idshop +
              "' target='_blank' style='text-decoration: none'>" +
              item.tenshop +
              "</a>"
          );
      });

      this.layer = layer;
      this.map = map;
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
        "/map/?tinh=" +
          results2[0] +
          "&huyen=" +
          results1[0] +
          "&xa=" +
          results[0]
      );
      this.$axios
        .post("http://localhost:3000/api/mapapi", {
          tinh: results2[0],
          huyen: results1[0],
          xa: results[0],
        })
        .then((response) => {
          var map = this.map;
          response.data.forEach(function (item, index) {
            L.marker(item.diachi.split(","))
              .addTo(map)
              .bindPopup(
                "<a href='/shop/?cuahang=" +
                  item.tenshop +
                  "&shopid=" +
                  item.idshop +
                  "' target='_blank' style='text-decoration: none'>" +
                  item.tenshop +
                  "</a>"
              );
          });
        });
    },
  },
  watch: {
    search(val) {
      if (val) {
        this.$axios
          .post("http://localhost:3000/api/searchmap", {
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