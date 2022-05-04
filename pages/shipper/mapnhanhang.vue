<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title>Địa chỉ nhận hàng</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div id="map" style="width: 100%; height: 100vh"></div>
      <div :class="[$style.caidat]">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on" fab>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="setBasemap('Topographic')">
              <v-list-item-title>
                <v-icon>mdi-image</v-icon>&nbsp;&nbsp;Đường
                phố</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="setBasemap('ImageryClarity')">
              <v-list-item-title
                ><v-icon>mdi-satellite-variant</v-icon>&nbsp;&nbsp;Vệ
                tinh</v-list-item-title
              >
            </v-list-item>
            <a
              :href="'https://google.com/maps/place/' + this.$route.query.toado"
              target="_blank"
              rel="noopener noreferrer"
              :class="[$style.a]"
            >
              <v-list-item>
                <v-list-item-title>
                  <v-icon>mdi-google-maps</v-icon>&nbsp;&nbsp;Google
                  map</v-list-item-title
                >
              </v-list-item></a
            >
          </v-list>
        </v-menu>
      </div>
    </v-main>
  </v-app>
</template>
<style module>
.caidat {
  position: fixed;
  z-index: 400;
  bottom: 25px;
  right: 15px;
}
.a {
  text-decoration: none;
}
</style>
<script>
export default {
  layout: "Mapshop",
  head() {
    return {
      title: "Bản đồ nhận hàng | Shipper",
    };
  },
  data() {
    return {
      switch1: true,
      layer: null,
      map: null,
    };
  },
  methods: {
    khoitaomap() {
      var map = L.map("map", {
        minZoom: 1,
        maxZoom: 17,
      }).setView(this.$route.query.toado.split(","), 12);
      var layer = L.esri.basemapLayer("Topographic").addTo(map);
      L.marker(this.$route.query.toado.split(",")).addTo(map);
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
  },
  mounted() {
    this.khoitaomap();
  },
};
</script>