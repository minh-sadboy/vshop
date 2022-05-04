<template>
  <v-app>
    <v-container>
      <div style="height: 20px"></div>
      <div :class="[$style.titletukhoa]" class="d-none d-lg-block">
        <div>
          <v-icon>mdi-lightbulb-outline</v-icon>&nbsp;&nbsp;&nbsp;Kết quả tìm
          kiếm cho từ khoá '<span :class="[$style.tukhoa]">{{
            this.$route.query.q
          }}</span
          >'
        </div>
        <br />
        <v-tabs v-model="tab" @change="sapxep()">
          <v-tabs-slider color="blue"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </div>
      <div style="height: 30px" class="d-lg-none"></div>
      <v-row no-gutters>
        <v-col
          cols="6"
          xs="6"
          sm="4"
          md="3"
          v-for="data in datagoiy"
          :key="data.datagoiy"
        >
          <NuxtLink
            :to="
              '/product/' +
              data.ten +
              '&token=nzka4s21oqectors91r0jec' +
              data.idsp
            "
            :class="[$style.danhmuclink]"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :elevation="hover ? 16 : 2"
                :class="{ 'on-hover': hover }"
                class="ma-1 pa-2 ma-md-5"
                style="border: 1px solid gainsboro; max-width: 224px"
              >
                <img
                  loading="lazy"
                  :src="data.imgchinh"
                  :class="[$style.imggoiy]"
                />
                <div :class="[$style.goiytext]">
                  {{ data.ten }}
                </div>
                <div class="py-1">
                  <v-rating
                    background-color="orange lighten-3"
                    color="orange"
                    size="14"
                    dense
                    :value="data.sao"
                  ></v-rating>
                </div>
                <div :class="[$style.goiygia]">
                  {{
                    (
                      Math.round(
                        (data.gia - (data.gia * data.giamgia) / 100) / 1000
                      ) * 1000
                    ).toLocaleString("it-IT")
                  }}₫
                  <span :class="[$style.goiygiamgia]">{{ data.giamgia }}%</span>
                </div>
                <div :class="[$style.goiydaban]">Đã bán:{{ data.daban }}</div>
              </v-card>
            </v-hover>
          </NuxtLink>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="d-none d-md-flex"></v-col>
        <v-col class="d-none d-md-flex"></v-col>
        <v-col
          ><div :class="[$style.xemthem]">
            <v-btn class="ma-3" outlined color="indigo" @click="quaylai()"
              >Quay lại</v-btn
            >
            <v-btn class="ma-3" outlined color="indigo" @click="xemthem()"
              >Xem thêm</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style module>
.home {
  margin-left: 70px;
  height: 48px;
}
.homedt {
  height: 48px;
}
.danhmuclink {
  text-decoration: none;
  color: #000 !important;
}
.imggoiy {
  width: 100%;
  padding: 12px 8px;
}

.goiytext {
  width: 100%;
  padding: 0px 3px;
  font-size: 14px;
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 22px;
}
.goiygia {
  padding: 0px 3px;
  font-weight: 600;
}
.goiygiamgia {
  font-size: 13px;
  line-height: 20px;
  border-radius: 2px;
  background: rgb(255, 66, 78);
  color: white;
  padding: 0px 2px;
  margin-left: 5px;
}
.goiydaban {
  font-size: 12px;
  padding: 0px 3px;
}
.tukhoa {
  color: #3880ff;
}
.titletukhoa {
  margin-left: 10px;
}
.xemthem {
  display: flex;
  float: right;
}
</style>
<script>
export default {
  watchQuery: true,
  layout: "Layoutsreach",
  head() {
    return {
      title: "Tìm kiếm: " + this.$route.query.q + " | Vivishop",
    };
  },
  data() {
    return {
      tab: 0,
      items: ["Phổ Biến", "Bán Chạy", "Giá Thấp", "Giá Cao"],
      page: "0",
      datagoiy1: null,
    };
  },
  methods: {
    sapxep() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/search/?q=" +
          query +
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
          this.tab +
          "&danhmuc=" +
          this.$route.query.danhmuc
      );
    },
    xemthem() {
      var page = "0";
      if (this.$route.query.page == undefined) {
        this.page = "0";
      } else {
        this.page = this.$route.query.page;
        var page = this.$route.query.page;
      }
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$axios
        .post("http://localhost:3000/api/search", {
          q: query,
          tinh: this.$route.query.tinh,
          huyen: this.$route.query.huyen,
          xa: this.$route.query.xa,
          giadau: this.$route.query.giadau,
          giacuoi: this.$route.query.giacuoi,
          danhgia: this.$route.query.danhgia,
          sapxep: this.$route.query.sapxep,
          danhmuc: this.$route.query.danhmuc,
          page: page + 36,
        })
        .then((response) => {
          const page1 = Number(page) + 36;
          const xemthem1 = this.datagoiy;
          const xemthem2 = xemthem1.concat(response.data);
          this.datagoiy = xemthem2;
          this.$router.push(
            "/search/?q=" +
              query +
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
              page1 +
              "&sapxep=" +
              this.tab +
              "&danhmuc=" +
              this.$route.query.danhmuc
          );
        });
    },
    quaylai() {
      var page = "0";
      if (this.$route.query.page == undefined) {
        this.page = "0";
      } else {
        if (this.$route.query.page < 36) {
        } else {
          var query = this.$route.query.q;
          if (this.$route.query.q == null) {
            var query = "";
          }
          this.page = this.$route.query.page;
          var page = this.$route.query.page;
          this.$axios
            .post("http://localhost:3000/api/search", {
              q: query,
              tinh: this.$route.query.tinh,
              huyen: this.$route.query.huyen,
              xa: this.$route.query.xa,
              giadau: this.$route.query.giadau,
              giacuoi: this.$route.query.giacuoi,
              danhgia: this.$route.query.danhgia,
              sapxep: this.$route.query.sapxep,
              danhmuc: this.$route.query.danhmuc,
              page: '"' + page - 36 + '"',
            })
            .then((response) => {
              const page1 = Number(page) - 36;
              const xemthem1 = this.datagoiy;
              const xemthem2 = xemthem1.concat(response.data);
              this.datagoiy = xemthem2;
              this.$router.push(
                "/search/?q=" +
                  query +
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
                  page1 +
                  "&sapxep=" +
                  this.tab +
                  "&danhmuc=" +
                  this.$route.query.danhmuc
              );
            });
        }
      }
    },
  },
  async asyncData({ $axios, route }) {
    const datasearch = await $axios.$post("http://localhost:3000/api/search", {
      q: route.query.q,
      tinh: route.query.tinh,
      huyen: route.query.huyen,
      xa: route.query.xa,
      giadau: route.query.giadau,
      giacuoi: route.query.giacuoi,
      danhgia: route.query.danhgia,
      sapxep: route.query.sapxep,
      danhmuc: route.query.danhmuc,
      page: route.query.page,
    });
    return { datagoiy: datasearch };
  },
};
</script>