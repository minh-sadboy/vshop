<template>
  <v-app>
    <v-container>
      <div :class="[$style.nenshop]" class="d-none d-lg-flex">
        <div :class="[$style.avatashop]">
          <v-avatar size="80">
            <img :src="datagoiy[1][0].imgshop" />
          </v-avatar>
          <div :class="[$style.tenshop]">
            {{ datagoiy[1][0].tenshop }}<br /><span
              :class="[$style.danhgiashop]"
              >Đánh giá: {{ datagoiy[1][0].danhgia }}/5</span
            >
          </div>
          <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="blue"
                small
                :class="[$style.xemthemshop]"
                v-bind="attrs"
                v-on="on"
                >Xem thêm</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <div :class="[$style.thongtinshop]">
                  <v-list-item-title class="text-h5">
                    Thông tin cửa hàng
                  </v-list-item-title>
                  <br />
                  Đánh giá: {{ datagoiy[1][0].danhgia }}/5<br />
                  <NuxtLink
                    :to="
                      '/mapshop?toado=' +
                      datagoiy[1][0].diachi +
                      '&tenshop=' +
                      datagoiy[1][0].tenshop +
                      '&id=' +
                      datagoiy[1][0].idshop
                    "
                    style="text-decoration: none"
                  >
                    Địa chỉ: {{ xa }} - {{ huyen }} - {{ tinh }}
                  </NuxtLink>
                </div>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
      <!-- điện thoại -->
      <div class="d-lg-none" style="height: 150px"></div>
      <div :class="[$style.nenshopmb]" class="d-lg-none">
        <div :class="[$style.avatashopmb]">
          <v-avatar size="64">
            <img :src="datagoiy[1][0].imgshop" />
          </v-avatar>
          <div :class="[$style.tenshopmb]">
            {{ datagoiy[1][0].tenshop }}<br /><span
              :class="[$style.danhgiashop]"
              >Đánh giá: {{ datagoiy[1][0].danhgia }}/5</span
            >
          </div>
          <v-dialog transition="dialog-top-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                outlined
                color="blue"
                small
                :class="[$style.xemthemshopmb]"
                v-bind="attrs"
                v-on="on"
                >Xem thêm</v-btn
              >
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <div :class="[$style.thongtinshop]">
                  <v-list-item-title class="text-h5">
                    Thông tin cửa hàng
                  </v-list-item-title>
                  <br />
                  Đánh giá: {{ datagoiy[1][0].danhgia }}/5<br />
                  <NuxtLink
                    :to="
                      '/mapshop?toado=' +
                      datagoiy[1][0].diachi +
                      '&tenshop=' +
                      datagoiy[1][0].tenshop +
                      '&id=' +
                      datagoiy[1][0].idshop
                    "
                    style="text-decoration: none"
                  >
                    Địa chỉ: {{ xa }} - {{ huyen }} - {{ tinh }}
                  </NuxtLink>
                </div>
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog.value = false">Đóng</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
      <div :class="[$style.titletukhoa]" class="d-none d-lg-block">
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
          v-for="data in datagoiy[0]"
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
    <a
      :href="datagoiy[1][0].lienheshop"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-btn color="blue" dark fixed bottom right fab class="mb-15">
        <v-icon>mdi-facebook-messenger</v-icon>
      </v-btn>
    </a>
  </v-app>
</template>

<style module>
.nenshop {
  height: 180px;
  margin: 12px;
  background-image: url("~/assets/img/nenshop.jpg");
}
.avatashop {
  display: flex;
  position: relative;
  top: 90px;
  left: 15px;
}
.tenshop {
  margin-left: 20px;
  margin-top: 10px;
  color: #fff;
  font-weight: 600;
}
.danhgiashop {
  font-size: 14px;
  font-weight: 600;
  opacity: 0.7;
}
.xemthemshop {
  margin-top: 17px;
  margin-left: 20px;
}
.nenshopmb {
  background-image: url("~/assets/img/nenshop.jpg");
  height: 130px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
}
.avatashopmb {
  display: flex;
  position: relative;
  top: 55px;
  left: 8px;
  width: 95%;
}
.tenshopmb {
  margin-left: 10px;
  margin-top: 5px;
  color: #546e7a;
  font-weight: 600;
  width: 40vw;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
}
.xemthemshopmb {
  margin-top: 17px;
  margin-left: 15px;
  white-space: nowrap;
  text-overflow: clip;
  overflow: hidden;
  font-weight: 600;
  color: #039be5;
}

.thongtinshop {
  padding: 20px 15px;
}
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
  layout: "Layoutshop",

  head() {
    return {
      title: this.datagoiy[1][0].tenshop + " | vshop",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Cảm ơn quý khách đã đến với " + this.datagoiy[1][0].tenshop,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "http://localhost:3000/" + this.$route.fullPath,
        },
        { hid: "og:title",property: "og:title", content: this.datagoiy[1][0].tenshop },
        {
          hid: "og:description",
          property: "og:description",
          content: "Cảm ơn quý khách đã đến với " + this.datagoiy[1][0].tenshop,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.datagoiy[1][0].imgshop,
        },
      ],
    };
  },
  data() {
    return {
      tab: 0,
      items: ["Phổ Biến", "Bán Chạy", "Giá Thấp", "Giá Cao"],
      page: "0",
      datagoiy: [[{}], [{}]],
      tinh: null,
      huyen: null,
      xa: null,
    };
  },
  methods: {
    sapxep() {
      var query = this.$route.query.q;
      if (this.$route.query.q == null) {
        var query = "";
      }
      this.$router.push(
        "/shop/?cuahang=" +
          this.datagoiy[1][0].tenshop +
          "&q=" +
          query +
          "&sapxep=" +
          this.tab +
          "&danhmuc=" +
          this.$route.query.danhmuc +
          "&shopid=" +
          this.datagoiy[1][0].idshop
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
        .post("http://localhost:3000/api/shop", {
          q: query,
          sapxep: this.$route.query.sapxep,
          danhmuc: this.$route.query.danhmuc,
          page: page + 36,
          shopid: this.datagoiy[1][0].idshop,
        })
        .then((response) => {
          const page1 = Number(page) + 36;
          const xemthem1 = this.datagoiy;
          const xemthem2 = xemthem1.concat(response.data);
          this.datagoiy = xemthem2;
          this.$router.push(
            "/shop/?cuahang=" +
              this.datagoiy[1][0].tenshop +
              "&q=" +
              query +
              "&page=" +
              page1 +
              "&sapxep=" +
              this.tab +
              "&danhmuc=" +
              this.$route.query.danhmuc +
              "&shopid=" +
              this.datagoiy[1][0].idshop
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
            .post("http://localhost:3000/api/shop", {
              q: query,
              sapxep: this.$route.query.sapxep,
              danhmuc: this.$route.query.danhmuc,
              page: '"' + page - 36 + '"',
              shopid: this.datagoiy[1][0].idshop,
            })
            .then((response) => {
              const page1 = Number(page) - 36;
              const xemthem1 = this.datagoiy;
              const xemthem2 = xemthem1.concat(response.data);
              this.datagoiy = xemthem2;
              this.$router.push(
                "/shop/?cuahang=" +
                  this.datagoiy[1][0].tenshop +
                  "&q=" +
                  query +
                  "&page=" +
                  page1 +
                  "&sapxep=" +
                  this.tab +
                  "&danhmuc=" +
                  this.$route.query.danhmuc +
                  "&shopid=" +
                  this.datagoiy[1][0].idshop
              );
            });
        }
      }
    },
  },
  async asyncData({ $axios, route }) {
    const datasearch = await $axios.$post("http://localhost:3000/api/shop", {
      q: route.query.q,
      sapxep: route.query.sapxep,
      danhmuc: route.query.danhmuc,
      page: route.query.page,
      shopid: route.query.shopid,
    });
    if (datasearch[1].length == "0") {
      return {
        datagoiy: [
          [],
          [
            {
              idshop: null,
              imgshop: null,
              danhgia: null,
              tinh: null,
              huyen: null,
              xa: null,
              diachi: null,
              lienheshop: null,
              tenshop: null,
            },
          ],
        ],
      };
    } else {
      return { datagoiy: datasearch };
    }
  },
  mounted() {
    console.log(this.datagoiy);
    this.$axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((response) => {
        let obj = response.data.results;
        let searchField = "province_id";
        let searchVal = this.datagoiy[1][0].tinh;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i][searchField] == searchVal) {
            this.tinh = obj[i].province_name;
          }
        }
      });
    this.$axios
      .get(
        "https://vapi.vnappmob.com/api/province/district/" +
          this.datagoiy[1][0].tinh
      )
      .then((response) => {
        let obj = response.data.results;
        let searchField = "district_id";
        let searchVal = this.datagoiy[1][0].huyen;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i][searchField] == searchVal) {
            this.huyen = obj[i].district_name;
          }
        }
      });
    this.$axios
      .get(
        "https://vapi.vnappmob.com/api/province/ward/" +
          this.datagoiy[1][0].huyen
      )
      .then((response) => {
        let obj = response.data.results;
        let searchField = "ward_id";
        let searchVal = this.datagoiy[1][0].xa;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i][searchField] == searchVal) {
            this.xa = obj[i].ward_name;
          }
        }
      });
  },
};
</script>