<template>
  <v-app>
    <v-app-bar fixed app dense>
      <v-btn @click="$router.go(-1)" icon large color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <NuxtLink to="/search" :class="[$style.input]" class="d-none d-md-block">
        <div>
          <v-autocomplete
            hide-no-data
            hide-selected
            label="Tìm kiếm"
            placeholder="Bạn tìm gì hôm nay?"
            return-object
            dense
            outlined
            no-filter
          >
          </v-autocomplete>
        </div>
      </NuxtLink>
      <div :class="[$style.chiase]" class="d-none d-md-block">
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
        <v-icon :class="[$style.a]" @click="coppylink()"> mdi-link </v-icon>
      </div>
      <div :class="[$style.appbarphai]">
        <NuxtLink to="/search" :class="[$style.nuxtlink]" class="d-md-none">
          <v-icon color="blue">mdi-magnify</v-icon>
        </NuxtLink>
        <NuxtLink to="/" :class="[$style.nuxtlink]">
          <v-icon color="blue">mdi-home-variant-outline</v-icon>
        </NuxtLink>
        <NuxtLink to="/cart" :class="[$style.nuxtlink]">
          <v-icon color="blue">mdi-cart-outline</v-icon>
        </NuxtLink>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon color="primary"> mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <NuxtLink to="/" :class="[$style.nuxtlink]" style="margin:0">
              <v-list-item>
                <v-list-item-title :class="[$style.dots]">
                  <v-icon> mdi-home-variant-outline</v-icon>&nbsp;&nbsp;Trở về
                  trang chủ
                </v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <NuxtLink to="/b" :class="[$style.nuxtlink]" style="margin:0">
              <v-list-item>
                <v-list-item-title :class="[$style.dots]">
                  <v-icon>mdi-account-outline</v-icon>&nbsp;&nbsp;Cá nhân
                </v-list-item-title>
              </v-list-item>
            </NuxtLink>
            <v-list-item @click="coppylink()">
              <v-list-item-title>
                <v-icon> mdi-link </v-icon>&nbsp;&nbsp;Sao chép link
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <v-snackbar v-model="snackbar" :timeout="timeout" right>
        {{ text }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Đóng
          </v-btn>
        </template>
      </v-snackbar>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<style module>
.input {
  margin-top: 25px;
  width: 50%;
  margin-left: 30px;
  text-decoration: none;
}
.appbarphai {
  position: absolute;
  right: 16px;
}
.nuxtlink {
  text-decoration: none;
  margin-left: 20px;
}
.chiase {
  margin-left: 50px;
}
.a {
  text-decoration: none;
  margin-left: 10px;
}
.dots {
  display: flex;
  align-items: center;
}
</style>

<script>
export default {
  name: "Layoutproduct",
  data() {
    return {
      snackbar: false,
      text: "Đã sao chép",
      timeout: 2000,
    };
  },
  methods: {
    coppylink() {
      const link = "https://vivi--shop.com" + this.$route.fullPath;
      navigator.clipboard.writeText(link);
      this.snackbar = true;
    },
  },
};
</script>