<template>
  <div :class="[$style.a1]" class="d-none d-md-flex">
    <div :class="[$style.a2]">
      <NuxtLink to="/" :class="[$style.anuxtlink]" class="dieuhuongmaytinhnuxtlink">
        <div :class="[$style.a11]">
          <v-icon>mdi-home-variant-outline</v-icon>
          <div :class="[$style.a111]">Trang chủ</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/map" :class="[$style.anuxtlink]" class="dieuhuongmaytinhnuxtlink">
        <div :class="[$style.a11]">
          <v-icon>mdi-map-outline</v-icon>
          <div :class="[$style.a111]">Bản đồ</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/cart" :class="[$style.anuxtlink]" class="dieuhuongmaytinhnuxtlink">
        <div :class="[$style.a11]">
          <v-icon>mdi-cart-outline</v-icon>
          <div :class="[$style.a111]">Giỏ hàng</div>
        </div>
      </NuxtLink>
      <NuxtLink to="/customer" :class="[$style.anuxtlink]" class="dieuhuongmaytinhnuxtlink">
        <div :class="[$style.a11]">
          <v-icon>mdi-account-outline</v-icon>
          <div :class="[$style.a111]">Cá nhân</div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.dieuhuongmaytinhnuxtlink.nuxt-link-exact-active {
  font-weight: bold;
  background-color: #3881ffbd;
  opacity: 1;
}
</style>
<style module>
.anuxtlink {
  text-decoration: none;
  display: block;
  opacity: 0.7;
}
.a1 {
  background-color: #fff;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  width: 70px;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
}
.a11 {
  color: #000000de;
  padding: 20px 0px;
  text-align: center;
  width: 70px;
  border-bottom: 1px solid gainsboro;
}
.a111 {
  font-size: 12px;
  color: rgb(0, 0, 0, 0.7);
}

.a2 {
  text-align: center;
}
</style>