<template>
  <v-app dark>
    <div>
      <img src="~/assets/img/img404.png" />
      <p>Xin lỗi, trang bạn tìm kiếm không tồn tại</p>
      <NuxtLink to="/"> Quay lại trang chủ</NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  layout: "Mapshop",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
  },
  head() {
    return {
      title: "Không tìm thấy trang",
    };
  },
};
</script>

<style scoped>
p{
  margin-top: 10px;
}
div {
  width: 100%;
  position: absolute;
  text-align: center;
  top: 40%;
  transform: translateY(-40%);
}
img {
  width: 100%;
  max-width: 330px;
}
</style>
