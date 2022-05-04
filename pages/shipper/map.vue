<template>
<v-app>
    <v-navigation-drawer v-model="drawer" fixed app right style="  z-index: 10000;">
      <v-list>
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
    </v-navigation-drawer>
  <v-app-bar dense position: fixed >
    <div  :class="[$style.trai]" class="d-none d-md-flex"></div>   
     <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    <div style="width:40px" class="d-none d-md-flex"></div>
      <v-btn icon large @click="drawer = !drawer">
    <v-icon>mdi-menu</v-icon>
    </v-btn>     
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
  z-index: 400 !important;
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
.nuxtlink {
  text-decoration: none;
  color: #000 !important;
}
</style>

<style>
.thanhtrenmaytinhiconlink.nuxt-link-exact-active {
  background-color: rgba(255, 255, 255, 0);
}
</style>

<script>
export default {
  head() {
    return {
      title: "Bản đồ | Shipper",
    };
  },
  data() {
    return {
      drawer: false,
      bando: "0",
      lat: "0",
      lng: "0",
      datatoado: null,
    };
  },
  async asyncData({ $axios }) {
    const ip = await $axios.$post("http://localhost:3000/api/shippermap");
    return { datatoado: ip };
  },
  mounted() {
    this.khoitaomap();
  },
  methods: {
    khoitaomap() {
      var map = L.map("map", {
        minZoom: 1,
        maxZoom: 17,
      }).setView([20.242422479862558, 106.47550547098923], 12);
      var layer = L.esri.basemapLayer("Topographic").addTo(map);
      this.datatoado.forEach(function (item, index) {
        console.log();
        L.marker([
          JSON.parse(item.toadovitridh).lat,
          JSON.parse(item.toadovitridh).lng,
        ])
          .addTo(map)
          .bindPopup(
            "<a href='/shipper/xacnhandagiao?madonhang=" +
              +item.madonhang +
              "'  style='text-decoration: none'>" +
              "Tên: " +
              item.khachhangten +
              "<br> SĐT: " +
              item.phone +
              "</br> Mã: " +
              item.madonhang +
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
  },
};
</script>