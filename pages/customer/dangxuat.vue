<template></template>
<script>
export default {
  middleware: ["auth"],
  async asyncData({ $axios, redirect }) {
    const ip = await $axios.$post("http://localhost:3000/api/dangxuat");
    return redirect("http://localhost:3000/");
  },
};
</script>