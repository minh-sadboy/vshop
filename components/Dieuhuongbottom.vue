<template>
  <v-bottom-navigation  color="primary" grow class="d-md-none" position: fixed>
    <v-btn nuxt to="/">
      <span>Trang chủ</span>
      <v-icon>mdi-home-variant-outline</v-icon>
    </v-btn>

    <v-btn nuxt to="/map">
      <span>Bản đồ</span>

      <v-icon>mdi-map-outline</v-icon>
    </v-btn>

    <v-btn  nuxt to="/cart">
      <span>Giỏ hàng</span>

      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

    <v-btn  nuxt to="/customer">
      <span>Cá nhân</span>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

