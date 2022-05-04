<template>
  <v-app>
    <v-main>
      <div id="map" style="width: 100%; height: 100vh"></div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  layout: "Mapshop",
  head() {
    return {
      title: "Bản đồ khoảng cách | vivishop",
    };
  },
  methods: {
    khoitaomap() {
      if (this.$route.query.shop && this.$route.query.khach) {
        var map = L.map("map", {
          minZoom: 1,
          maxZoom: 17,
        }).setView([20.242422479862558, 106.47550547098923], 12);
        var layer = L.esri.basemapLayer("Topographic").addTo(map);
        L.marker(this.$route.query.khach.split(",")).addTo(map);
        var bluedotcon = L.icon({
          iconUrl: "/img/cafe.jpg",
          iconSize: [25, 41],
        });
        L.marker(this.$route.query.shop.split(","), {
          icon: bluedotcon,
        }).addTo(map);
        var latlngs = [
          this.$route.query.shop.split(","),
          this.$route.query.khach.split(","),
        ];
        var polyline = L.polyline(latlngs, { color: "#2196F3" }).addTo(map);
        map.fitBounds(polyline.getBounds());
      }
    },
  },
  mounted() {
    this.khoitaomap();
  },
};
</script>