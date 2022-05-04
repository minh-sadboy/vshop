<template>
  <v-app>
    <v-container>
      <div style="height: 20px" class="d-none d-md-flex"></div>
      <v-row no-gutters :class="[$style.header]">
        <v-col cols="12" md="4">
          <v-carousel
            cycle
            height="auto"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item>
              <img
                loading="lazy"
                :src="this.datasp[0][0].imgchinh"
                :class="[$style.imgslide]"
              />
            </v-carousel-item>
            <v-carousel-item v-for="data in datasp[1]" :key="data.datasp">
              <img loading="lazy" :src="data.img" :class="[$style.imgslide]" />
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col cols="8" class="d-none d-md-block">
          <div :class="[$style.text]">
            <div :class="[$style.ten]">
              {{ this.datasp[0][0].ten }}
            </div>
            <div :class="[$style.sao]">
              <v-rating
                background-color="orange lighten-3"
                color="orange"
                size="16"
                dense
                :value="datasp[0][0].sao"
              ></v-rating>
              <span :class="[$style.xemdanhgia]"
                >({{ this.datasp[0][0].soluongdg }} đánh giá)</span
              >
              <div :class="[$style.ngan]"></div>
              <span :class="[$style.daban]"
                >Đã bán {{ this.datasp[0][0].daban }}</span
              >
            </div>
            <div :class="[$style.gia]">
              <div :class="[$style.giatext]">
                {{
                  (
                    Math.round(
                      (this.datasp[0][0].gia -
                        (this.datasp[0][0].gia * this.datasp[0][0].giamgia) /
                          100) /
                        1000
                    ) * 1000
                  ).toLocaleString("it-IT")
                }}₫
              </div>
              <div :class="[$style.giatextao]">
                {{ this.datasp[0][0].gia }}₫
              </div>
              <div :class="[$style.giamgia]">
                -{{ this.datasp[0][0].giamgia }}%
              </div>
            </div>
            <div :class="[$style.chonmua]">
              <v-btn
                v-if="datasp[0][0].trangthaisp == 1"
                color="#ff3945"
                dark
                large
                :to="
                  '/cart?idshop=' +
                  this.datasp[0][0].idshop +
                  '&tenshop=' +
                  this.datasp[0][0].tenshop +
                  '&idsp=' +
                  datasp[0][0].idsp +
                  '&imgsp=' +
                  this.datasp[0][0].imgchinh +
                  '&tensp=' +
                  this.datasp[0][0].ten +
                  '&giasp=' +
                  this.datasp[0][0].gia +
                  '&giamgia=' +
                  this.datasp[0][0].giamgia +
                  '&soluongsp=1' +
                  '&diachi=' +
                  this.datasp[0][0].diachi +
                  '&cannang=' +
                  this.datasp[0][0].cannangsp
                "
              >
                Chọn mua</v-btn
              >
              <v-btn
                color="#9E9E9E"
                dark
                large
                v-if="datasp[0][0].trangthaisp == 0"
              >
                Hết hàng</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
      <div :class="[$style.textmb]" class="d-md-none">
        <div>
          {{ this.datasp[0][0].ten }}
        </div>
        <div style="height: 5px"></div>
        <div :class="[$style.sao]">
          <v-rating
            background-color="orange lighten-3"
            color="orange"
            size="14"
            dense
            :value="datasp[0][0].sao"
          ></v-rating>
          <span :class="[$style.xemdanhgiamb]"
            >({{ this.datasp[0][0].soluongdg }} đánh giá)</span
          >
          <span :class="[$style.daban]"
            >Đã bán {{ this.datasp[0][0].daban }}</span
          >
        </div>
        <div :class="[$style.giamb]">
          <div :class="[$style.giatextmb]">
            {{
              (
                Math.round(
                  (this.datasp[0][0].gia -
                    (this.datasp[0][0].gia * this.datasp[0][0].giamgia) / 100) /
                    1000
                ) * 1000
              ).toLocaleString("it-IT")
            }}₫
          </div>
          <div :class="[$style.giatextao]">{{ this.datasp[0][0].gia }}₫</div>
          <div :class="[$style.giamgia]">-{{ this.datasp[0][0].giamgia }}%</div>
        </div>
        <div :class="[$style.ngang]"></div>
      </div>
      <div :class="[$style.shop]" class="d-none d-md-flex">
        <v-row no-gutters>
          <v-col class="d-flex">
            <v-avatar size="78">
              <img :src="this.datasp[0][0].imgshop" />
            </v-avatar>
            <div :class="[$style.tenshop]">
              {{ this.datasp[0][0].tenshop }}
              <br />
              <v-btn
                class="ma-2"
                outlined
                color="blue"
                :to="
                  '/shop/?cuahang=' +
                  this.datasp[0][0].tenshop +
                  '&shopid=' +
                  this.datasp[0][0].idshop
                "
                ><v-icon>mdi-store-outline</v-icon>&nbsp;&nbsp;Xem shop
              </v-btn>
            </div>
          </v-col>
          <v-col class="d-flex">
            <div>
              <div>
                Đánh Giá:&nbsp;
                <span :class="[$style.gtdgshop]">{{
                  this.datasp[0][0].sao
                }}</span>
              </div>
              <div style="height: 5px"></div>
              <div>Địa chỉ: {{ xa }} - {{ huyen }} - {{ tinh }}</div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div :class="[$style.shopmb]" class="d-md-none">
        <div class="d-flex" :class="[$style.shop1mb]">
          <div class="d-flex">
            <v-avatar size="52">
              <img :src="this.datasp[0][0].imgshop" />
            </v-avatar>
            <div :class="[$style.tenshopmb]">
              {{ this.datasp[0][0].tenshop }}
            </div>
          </div>
          <v-btn
            outlined
            color="blue"
            small
            class="mt-2"
            :to="
              '/shop/?cuahang=' +
              this.datasp[0][0].tenshop +
              '&shopid=' +
              this.datasp[0][0].idshop
            "
            >Xem shop
          </v-btn>
        </div>
        <div style="height: 10px"></div>
        <v-divider></v-divider>
        <div style="height: 10px"></div>
        <div>
          Đánh giá: {{ this.datasp[0][0].sao }}<br />
          Địa chỉ: {{ xa }} - {{ huyen }} - {{ tinh }}
        </div>
        <div style="height: 10px"></div>
        <div :class="[$style.ngang]"></div>
      </div>
      <div class="py-2 d-md-none">
        Chia sẻ:
        <a
          href="https://www.facebook.com/sharer.php?u=sfghg.com"
          target="_blank"
          :class="[$style.a]"
        >
          <v-icon color="blue"> mdi-facebook </v-icon>
        </a>
        <a
          href="https://www.pinterest.com/pin-builder/?url=https://vuetifyjs.com/en/components/icons/"
          target="_blank"
          :class="[$style.a]"
        >
          <v-icon color="red"> mdi-pinterest </v-icon>
        </a>
        <a
          href="https://twitter.com/intent/tweet?url=sfghg.com"
          target="_blank"
          :class="[$style.a]"
        >
          <v-icon color="primary"> mdi-twitter </v-icon>
        </a>
        <div style="height: 10px"></div>
        <div :class="[$style.ngang]"></div>
      </div>
      <!-- thông tin máy tính -->
      <div :class="[$style.chitietsanpham]">
        <v-row no-gutters>
          <v-col cols="12" md="9">
            Chi tiết sản phẩm
            <div style="height: 10px"></div>
            <v-divider></v-divider>
            <div style="height: 10px"></div>
            <span v-html="this.datasp[0][0].thongtin"></span>
          </v-col>
          <v-col cols="3" class="d-none d-md-block"></v-col>
        </v-row>
      </div>
      <div style="height: 10px"></div>
      <div :class="[$style.ngang]" class="d-md-none"></div>
      <div :class="[$style.binhluan]">
        <v-row no-gutters>
          <v-col cols="12" md="9">
            Đánh giá sản phẩm<br />
            <div class="d-flex">
              <v-rating
                background-color="orange lighten-3"
                color="orange"
                size="14"
                dense
                :value="datasp[0][0].sao"
              ></v-rating>
              <span :class="[$style.xemdanhgiamb]"
                >({{ this.datasp[0][0].soluongdg }} đánh giá)</span
              >
            </div>
            <div style="height: 10px"></div>
            <v-divider></v-divider>
            <div style="height: 10px"></div>
            <div v-for="data in nhanxet" :key="data.nhanxet">
              <div :class="[$style.danhgia]">
                <v-avatar size="24">
                  <img :src="data.imgdaidien" />
                </v-avatar>
                <div :class="[$style.tendanhgia]">{{ data.khachhangten }}</div>
              </div>
              <div style="height: 5px"></div>
              <v-rating
                background-color="orange lighten-3"
                color="orange"
                size="14"
                dense
                :value="data.saonx"
              ></v-rating>
              <div style="height: 10px"></div>
              <div v-html="data.text"></div>
              <div :class="[$style.timedanhgia]">{{ data.time }}</div>
              <div :class="[$style.nguoibandanhgia]">
                <span :class="[$style.nguoibanten]">Phản Hồi Của Người Bán</span
                ><br />
                <span v-html="data.traloi"></span>
              </div>
              <div style="height: 20px"></div>
              <v-divider></v-divider>
              <div style="height: 20px"></div>
            </div>
            <div :class="[$style.xemthem]">
              <v-btn class="ma-3" outlined color="indigo" @click="xemthem()"
                >Xem thêm</v-btn
              >
            </div>
          </v-col>
          <v-col cols="3" class="d-none d-md-block"></v-col>
        </v-row>
      </div>
      <div style="height: 70px" class="d-md-none"></div>
      <div :class="[$style.chonmuamb]" class="d-md-none">
        <v-btn
          v-if="datasp[0][0].trangthaisp == 1"
          color="#ff3945"
          dark
          large
          block
          :to="
            '/cart?idshop=' +
            this.datasp[0][0].idshop +
            '&tenshop=' +
            this.datasp[0][0].tenshop +
            '&idsp=' +
            datasp[0][0].idsp +
            '&imgsp=' +
            this.datasp[0][0].imgchinh +
            '&tensp=' +
            this.datasp[0][0].ten +
            '&giasp=' +
            this.datasp[0][0].gia +
            '&giamgia=' +
            this.datasp[0][0].giamgia +
            '&soluongsp=1' +
            '&diachi=' +
            this.datasp[0][0].diachi +
            '&cannang=' +
            this.datasp[0][0].cannangsp
          "
        >
          Chọn mua</v-btn
        >
        <v-btn color="#9E9E9E" dark block v-if="datasp[0][0].trangthaisp == 0">
          Hết hàng</v-btn
        >
      </div>
    </v-container>
    <a
      :href="this.datasp[0][0].lienheshop"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-btn color="blue" dark fixed bottom right fab class="mb-12">
        <v-icon>mdi-facebook-messenger</v-icon>
      </v-btn>
    </a>
  </v-app>
</template>

<style module>
@media only all and (max-width: 960px) {
  .chitietsanpham {
    margin-top: 20px;
  }
  .binhluan {
    margin-top: 20px;
  }
}
@media only all and (min-width: 960px) {
  .header,
  .shop,
  .chitietsanpham,
  .binhluan {
    border: 1px solid gainsboro;
    border-radius: 5px;
    padding: 12px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .chitietsanpham {
    margin-top: 30px;
  }
  .binhluan {
    margin-top: 20px;
  }
}

.imgslide {
  width: 100%;
}
.text {
  padding-left: 30px;
}
.ten {
  font-size: 24px;
  margin-bottom: 10px;
}
.sao {
  display: flex;
}
.xemdanhgia {
  color: rgb(120, 120, 120);
  margin-left: 8px;
}
.xemdanhgiamb {
  color: rgb(120, 120, 120);
  margin-left: 4px;
  margin-right: 6px;
}
.daban {
  color: rgb(120, 120, 120);
}
.ngan {
  width: 1px;
  height: 15px;
  background-color: rgb(120, 120, 120);
  margin-top: 4px;
  margin-left: 10px;
  margin-right: 10px;
}
.gia {
  margin: 40px 10px;
  display: flex;
}
.giamb {
  display: flex;
  margin-top: 6px;
  margin-bottom: 20px;
}
.giatext {
  font-size: 24px;
  font-weight: 600;
  color: #1976d2;
}
.giatextmb {
  font-size: 20px;
  font-weight: 600;
  color: #1976d2;
  padding-top: 4px;
}
.giatextao {
  text-decoration: line-through;
  font-size: 14px;
  margin-left: 15px;
  padding-top: 12px;
}
.giamgia {
  font-size: 13px;
  border-radius: 2px;
  background: rgb(255, 66, 78);
  color: white;
  padding: 0px 2px;
  margin-left: 15px;
  height: 18px;
  margin-top: 12px;
}
.chonmua {
  margin-top: 50px;
}
.chonmuamb {
  position: fixed;
  bottom: 0;
  left: 12px;
  right: 12px;
  background-color: #fff;
  padding: 12px 0px;
  border-top: 1px solid gainsboro;
}
.ngang {
  height: 10px;
  background-color: #dad5d5;
  position: absolute;
  left: 0;
  right: 0;
}
.shop {
  margin-top: 30px;
  display: flex;
  padding: 25px;
}
.tenshop {
  height: 78px;
  margin-left: 20px;
}
.gtdgshop {
  color: #1976d2;
}
.shopmb {
  margin-top: 30px;
  padding: 12px 0px;
}
.shop1mb {
  display: flex;
  justify-content: space-between;
}
.tenshopmb {
  margin-left: 8px;
  width: 40vw;
  word-wrap: break-word;
}
.a {
  text-decoration: none;
  margin-left: 8px;
}
.danhgia {
  display: flex;
}
.tendanhgia {
  margin-left: 10px;
}
.timedanhgia {
  margin-top: 10px;
  font-size: 13px;
  line-height: 20px;
  color: rgb(120, 120, 120);
}
.nguoibandanhgia {
  margin-top: 10px;
  margin-left: 20px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}
.nguoibanten {
  color: #8b572a;
}
.xemthem {
  text-align: center;
}
</style>

<script>
export default {
  layout: "Layoutproduct",
  head() {
    return {
      title: this.title + " | vivishop",
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.datasp[0][0].ten + " - " + this.datasp[0][0].thongtin,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: "http://localhost:3000/" + this.$route.fullPath,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.title + " | vivishop",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.datasp[0][0].ten + " - " + this.datasp[0][0].thongtin,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.datasp[0][0].imgchinh,
        },
      ],
    };
  },
  data() {
    return {
      tinh: null,
      huyen: null,
      xa: null,
      nhanxet: null,
      sonhanxet: 6,
      title: "vshop",
    };
  },
  async asyncData({ $axios, route, redirect }) {
    if (route.params.id && route.params.id.trim()) {
      const ip = await $axios.$post("http://localhost:3000/api/product", {
        idsp: route.params.id.split("&token=nzka4s21oqectors91r0jec")[1],
      });
      if (ip[0].length == 0) {
        return redirect(
          "http://localhost:3000/product/uiuytrea&token=nzka4s21oqectors91r0jec1"
        );
      }
      return { datasp: ip };
    } else {
      const ip = await $axios.$post("http://localhost:3000/api/product", {
        idsp: "1",
      });
      return { datasp: ip };
    }
  },
  methods: {
    xemthem() {
      const sonhanxet = this.sonhanxet;
      this.$axios
        .post("http://localhost:3000/api/nhanxet", {
          sonhanxet: sonhanxet,
          idsp: this.datasp[0][0].idsp,
        })
        .then((response) => {
          const xemthem1 = this.nhanxet;
          const xemthem2 = xemthem1.concat(response.data);
          this.nhanxet = xemthem2;
          this.sonhanxet = sonhanxet + 6;
        });
    },
  },
  created() {
    if (this.$route.params.id && this.$route.params.id.trim()) {
      this.title = this.$route.params.id.split(
        "&token=nzka4s21oqectors91r0jec"
      )[0];
    }
  },
  mounted() {
    this.$axios
      .get("https://vapi.vnappmob.com/api/province/")
      .then((response) => {
        let obj = response.data.results;
        let searchField = "province_id";
        let searchVal = this.datasp[0][0].tinh;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i][searchField] == searchVal) {
            this.tinh = obj[i].province_name;
          }
        }
      });
    this.$axios
      .get(
        "https://vapi.vnappmob.com/api/province/district/" +
          this.datasp[0][0].tinh
      )
      .then((response) => {
        let obj = response.data.results;
        let searchField = "district_id";
        let searchVal = this.datasp[0][0].huyen;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i][searchField] == searchVal) {
            this.huyen = obj[i].district_name;
          }
        }
      });
    this.$axios
      .get(
        "https://vapi.vnappmob.com/api/province/ward/" + this.datasp[0][0].huyen
      )
      .then((response) => {
        let obj = response.data.results;
        let searchField = "ward_id";
        let searchVal = this.datasp[0][0].xa;
        for (let i = 0; i < obj.length; i++) {
          if (obj[i][searchField] == searchVal) {
            this.xa = obj[i].ward_name;
          }
        }
      });
    this.nhanxet = this.datasp[2];
  },
};
</script>