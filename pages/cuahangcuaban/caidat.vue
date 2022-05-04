<template>
  <v-app>
    <v-app-bar fixed app dense>
      <NuxtLink to="/">
        <img
          src="/icona.png"
          :class="[$style.iconhome]"
        />
      </NuxtLink>
      <v-app-bar-title> Cửa hàng của bạn </v-app-bar-title>
    </v-app-bar>
    <v-container>
      <div style="height: 48px"></div>
      <v-breadcrumbs
        :items="items1"
        large
        class="d-none d-md-block"
      ></v-breadcrumbs>
      <v-row no-gutters>
        <v-col cols="3" class="pl-6 d-none d-md-block">
          <v-list>
            <v-subheader>Cài đặt cửa hàng</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col cols="12" md="9">
          <div class="mx-5 my-4" :class="[$style.thongbaocaidat]">Cửa hàng</div>
          <v-card class="mx-5" outlined>
            <v-list-item class="mt-5 mb-5" v-if="!dadangky"> 
              Cửa hàng đã được tạo.<br><br>
              Mã id là: {{madks}}<br><br>
              Chúc bạn một ngày tốt lành. Cửa hàng sẽ hoạt động sau khi chúng tôi xác nhận địa điểm lấy hàng. 
            </v-list-item>
            <v-list-item three-line v-if="dadangky">
              <v-row no-gutters>
                <v-col cols="12" md="4">
                  <v-list-item-content>
                    <div class="mb-4 mt-2">Cài đặt cửa hàng</div>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="tenshop"
                            :rules="hotenRules"
                            :counter="255"
                            label="Tên cửa hàng"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-text-field
                            v-model="gmail"
                            :rules="phoneRules"
                            label="E-mail"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item>
            <v-card-actions v-if="dadangky">
              <div class="ml-3 mb-6">
                <v-btn
                  outlined
                  rounded
                  text
                  color="blue"
                  @click="capnhap()"
                  v-if="load == 0"
                >
                  Gửi
                </v-btn>
                <v-progress-circular
                  v-if="load == 1"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div style="height: 100px"></div>
    </v-container>
     <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Đóng
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>


<style module>
.thongbaocaidat {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.iconhome {
  width: 30px;
  height: 30px;
  margin-right: 20px;
}
</style>


<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head: {
    title: "Cài đặt cửa hàng | vivishop",
  },
  data() {
    return {
      items1: [
        {
          text: "Trang chủ",
          disabled: false,
          to: "/",
        },
        {
          text: "Cài đặt cửa hàng",
          disabled: true,
        },
      ],
      items: [
        {
          text: "Cài đặt đơn hàng",
          icon: "mdi-cog-outline",
          link: "/cuahangcuaban/caidat",
        },
      ],
      tenshop: "",
      hotenRules: [
        (v) => !!v || "Vui lòng điền đầy đủ tên cửa hàng.",
        (v) => v.length >= 4 || "Tên cửa hàng phải ít nhất 4 ký tự",
      ],
      gmail: "",
      phoneRules: [
        (v) => !!v || "Vui lòng điền đầy đủ Gmail",
        (v) => /.+@.+/.test(v) || "E-mail không đúng",
      ],
      snackbar: false,
      text: "Vui lòng điền đầy đủ thông tin",
      timeout: 2000,
      load: 0,
      dadangky: false,
      madks: null,
    };
  },
  methods: {
    capnhap() {
      if (this.tenshop.length >= 4 && this.gmail.length >= 4) {
        this.load = 1;
        this.$axios
          .post("http://localhost:3000/api/caidatshop", {
            tenshop: this.tenshop,
            gmail: this.gmail,
          })
          .then((response) => {           
              this.load = 0;
              localStorage.setItem('vmadks', response.data);
              this.dadangky = false;
              this.madks =  response.data;
          });
      } else {
        this.snackbar = true;
      }
    },
  },
  mounted() {
    const vmadks = localStorage.getItem('vmadks');
    if (vmadks == null) {
        this.dadangky = true;
    }else{
        this.dadangky = false;
        this.madks = vmadks;
    }
  },
};
</script>