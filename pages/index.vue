<template>
  <v-app>
    <div :class="[$style.home]" class="d-none d-md-flex">
      <Thanhtren />
    </div>
    <div :class="[$style.homedt]" class="d-md-none">
      <Thanhtren />
    </div>
    <v-container>
      <div style="height: 10px"></div>
      <v-row no-gutters v-if="a">
        <v-col cols="12" md="8">
          <v-carousel
            cycle
            height="auto"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item>
              <img
                loading="lazy"
                src="~/assets/banner/banner2.jpg"
                :class="[$style.imgslide]"
              />
            </v-carousel-item>
            <v-carousel-item>
              <img
                loading="lazy"
                src="~/assets/banner/banner1.jpg"
                :class="[$style.imgslide]"
              />
            </v-carousel-item>
            <v-carousel-item>
              <iframe
                width="100%"
                :class="[$style.imgslide]"
                src="https://www.youtube.com/embed/9WD-2rTrQww"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="4" class="d-none d-md-block">
          <img
            src="~/assets/banner/banner1.jpg"
            :class="[$style.imgslide]"
            style="padding-left: 10px; border-radius: 5px"
          />
        </v-col>
      </v-row>
      <div :class="[$style.danhmuc]">
        <div :class="[$style.danhmuctieude]">Danh mục</div>
        <div :class="[$style.danhmuctren]">
          <NuxtLink to="/search/?q&danhmuc=1" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="green darken-2"> mdi-laptop </v-icon><br />
              Điện thoại<br />Máy tính bảng
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=2" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="blue darken-2"> mdi-headphones </v-icon
              ><br />
              Phụ kiện<br />Thiết bị số
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=3" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="purple darken-2">mdi-camera-outline </v-icon
              ><br />
              Máy ảnh<br />Quay phim
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=4" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="teal darken-2"> mdi-fridge-outline </v-icon
              ><br />
              Điện gia dụng
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=5" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="blue-grey darken-2"
                >mdi-silverware-fork-knife</v-icon
              ><br />
              Đồ dùng<br />
              nhà bếp
            </div>
          </NuxtLink>
        </div>
        <div :class="[$style.danhmuctren]">
          <NuxtLink to="/search/?q&danhmuc=6" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="orange darken-2"> mdi-food </v-icon><br />
              Đồ ăn<br />
              Thực phẩm
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=7" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="gray darken-2">
                mdi-baby-bottle-outline </v-icon
              ><br />
              Đồ chơi<br />
              Mẹ & Bé
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=8" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="red darken-2">
                mdi-tshirt-crew-outline </v-icon
              ><br />
              Thời trang<br />
              Phụ kiện
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <NuxtLink to="/search/?q&danhmuc=9" :class="[$style.danhmuclink]">
            <div :class="[$style.danhmucsanpham]">
              <v-icon large color="yellow darken-2">
                mdi-book-open-blank-variant </v-icon
              ><br />
              Sách
            </div>
          </NuxtLink>
          <div :class="[$style.hr]"></div>
          <div style="width: 130px"></div>
        </div>
      </div>
      <!-- gợi ý -->
      <div :class="[$style.goiy]">Gợi ý hôm nay</div>
      <v-row no-gutters v-if="a">
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
      <!-- xem thêm -->
      <div :class="[$style.xemthem]">
        <v-btn class="ma-3" outlined color="indigo" @click="xemthem"
          >Xem thêm</v-btn
        >
      </div>
    </v-container>
    <div style="height: 100px"></div>
  </v-app>
</template>
<style module>
.hr {
  width: 1px;
  background: rgb(207, 206, 206);
}
.home {
  margin-left: 70px;
  height: 48px;
}
.homedt {
  height: 48px;
}
@media only all and (max-width: 960px) {
  .imgslide {
    height: calc(((100vw - 24px) * 116) / 351);
    width: 100%;
  }
}
@media only all and (min-width: 960px) {
  .imgslide {
    height: 274px;
    width: 100%;
  }
}
.danhmuc {
  overflow-y: auto;
  margin-top: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid gainsboro;
  height: 254px;
  border-radius: 5px;
}
.danhmuc::-webkit-scrollbar {
  height: 5px;
  width: 0px;
}
.danhmuc::-webkit-scrollbar-thumb {
  background: rgba(136, 136, 136, 0.5);
  border-radius: 10px;
}
.danhmuctieude {
  padding: 12px;
  font-weight: 600;
}

.danhmuclink {
  text-decoration: none;
  color: #000 !important;
}
.danhmuctren {
  display: flex;
  justify-content: space-between;
}
.danhmucsanpham {
  text-align: center;
  width: 130px;
  height: 100px;
  padding: 12px;
}
.goiy {
  margin-top: 20px;
  margin-bottom: 15px;
  padding: 12px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: 1px solid gainsboro;
  border-radius: 5px;
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
.xemthem {
  text-align: center;
}
</style>
<style>
.dieuhuongmaytinh1 {
  color: #1976d2 !important;
}
</style>

<script>
export default {
  head: {
    title: "Vivi-shop Việt Nam",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Mua sắm trực tuyến hàng triệu sản phẩm thời trang nam nữ, đồ điện tử, gia dụng...Giá tốt; nhiều ưu đãi. Mua và bán online trong 30 giây. Vivishop đảm bảo nhận hàng hoặc hoàn tiền. Vivishop Đảm Bảo | Miễn Phí Vận Chuyển | Gợi Ý Hôm Nay",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "http://localhost:3000/",
      },
      { hid: "og:title", property: "og:title", content: "Vivishop" },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Mua sắm trực tuyến hàng triệu sản phẩm thời trang nam nữ, đồ điện tử, gia dụng...Giá tốt; nhiều ưu đãi. Mua và bán online trong 30 giây. Vivishop đảm bảo nhận hàng hoặc hoàn tiền. Vivishop Đảm Bảo | Miễn Phí Vận Chuyển | Gợi Ý Hôm Nay",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "http://localhost:3000/img/daidien.jpg",
      },
    ],
  },
  async asyncData({ $axios }) {
    const ip = await $axios.$post("http://localhost:3000/api/goiyhomnay");
    return { datagoiy: ip };
  },
  data() {
    return {
      a: false,
    };
  },
  methods: {
    xemthem() {
      this.$axios
        .post("http://localhost:3000/api/goiyhomnay")
        .then((response) => {
          const xemthem1 = this.datagoiy;
          const xemthem2 = xemthem1.concat(response.data);
          this.datagoiy = xemthem2;
        });
    },
  },
  mounted() {
    var that = this;
    setTimeout(function () {
      that.a = true;
    }, 2000);
  },
};
</script>
