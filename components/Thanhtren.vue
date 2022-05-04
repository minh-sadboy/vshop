<template>
  <v-app-bar dense position: fixed>
    <div  :class="[$style.trai]" class="d-none d-md-flex"></div>   
    <NuxtLink to="/" class="thanhtrenmaytinhiconlink">
      <img src="/icona.png" :class="[$style.icon]" class="d-none d-md-flex" v-if="a"/>
    </NuxtLink>
    <div style="width:40px" class="d-none d-md-flex"></div>
    <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <div :class="[$style.danhmuc]" class="d-none d-md-flex" v-bind="attrs"  v-on="on">
        Danh mục
      </div>
    <v-btn
    icon
    v-bind="attrs"
    v-on="on"
    large
    >
    <v-icon>mdi-menu</v-icon>
    </v-btn>   
 
    </template>
    <v-list>
        <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=1" :class="[$style.nuxtlink]"><v-icon>mdi-laptop</v-icon>&nbsp;&nbsp;&nbsp;Điện thoại - Máy tính bảng</NuxtLink></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=2" :class="[$style.nuxtlink]"><v-icon>mdi-headphones</v-icon>&nbsp;&nbsp;&nbsp;Phụ kiện - Thiết bị số</NuxtLink></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=3" :class="[$style.nuxtlink]"><v-icon>mdi-camera-outline</v-icon>&nbsp;&nbsp;&nbsp;Máy ảnh - Quay phim</NuxtLink></v-list-item-title>
        </v-list-item>
         <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=4" :class="[$style.nuxtlink]"><v-icon>mdi-fridge-outline</v-icon>&nbsp;&nbsp;&nbsp;Điện gia dụng</NuxtLink></v-list-item-title>
        </v-list-item>
         <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=5" :class="[$style.nuxtlink]"><v-icon>mdi-silverware-fork-knife</v-icon>&nbsp;&nbsp;&nbsp;Đồ dùng nhà bếp</NuxtLink></v-list-item-title>
        </v-list-item>
         <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=6" :class="[$style.nuxtlink]"><v-icon>mdi-food</v-icon>&nbsp;&nbsp;&nbsp;Đồ ăn - Thực phẩm</NuxtLink></v-list-item-title>
        </v-list-item>
         <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=7" :class="[$style.nuxtlink]"><v-icon>mdi-baby-bottle-outline</v-icon>&nbsp;&nbsp;&nbsp;Đồ chơi, Mẹ & Bé</NuxtLink></v-list-item-title>
        </v-list-item>
         <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=8" :class="[$style.nuxtlink]"><v-icon>mdi-tshirt-crew-outline</v-icon>&nbsp;&nbsp;&nbsp;Thời trang - Phụ kiện</NuxtLink></v-list-item-title>
        </v-list-item>
          <v-list-item>
          <v-list-item-title><NuxtLink to="/search/?q&danhmuc=9" :class="[$style.nuxtlink]"><v-icon>mdi-book-open-blank-variant</v-icon>&nbsp;&nbsp;&nbsp;Sách</NuxtLink></v-list-item-title>
        </v-list-item>
    </v-list>    
    </v-menu>
    
    <div :class="[$style.input]">
      <v-autocomplete
        :items="entries"
        :search-input.sync="search"
        hide-no-data
        hide-selected
        item-text="ten"
        label="Tìm kiếm"
        placeholder="Bạn tìm gì hôm nay?"
        return-object
        dense
        outlined
        no-filter        
        @keyup.enter="onenter" 
      >
      <template v-slot:item="{ item }">
        <v-list-item link :to="'/search/?q=' + item.ten">{{item.ten}}</v-list-item>
      </template>        
    </v-autocomplete> 
      
     
    </div>    
    <div class="d-none d-md-flex" :class="[$style.giohang]">
       <v-btn nuxt to="/cart" large plain>
          <v-icon>mdi-cart-outline</v-icon>
           <span>Giỏ hàng</span>
       </v-btn>
       
    </div>
  </v-app-bar>
</template>

<style module>
.trai {
  width: 100px;
}
.icon {
  height: 30px;
  width: 30px;
}

.danhmuc {
  font-size: 12px;
  width: 50px;
}
.input {
  margin-top: 26px;
  width: 90%;
  margin-left: 10px;
}
.nuxtlink {
  text-decoration: none;
  color: #000 !important;
}
.giohang {
  width: 200px;
  display: flex;
  align-items: center;
  margin-left: 15%;
}
</style>

<style>
.thanhtrenmaytinhiconlink.nuxt-link-exact-active {
  background-color: rgba(255, 255, 255, 0);
}
</style>

<script>
export default {
  data() {
    return {
      entries: [],
      search: null,
      a: false,
    };
  },
  methods: {
    onenter() {
      this.$router.push("/search/?q=" + this.search);
    },
  },
  mounted() {
    var that = this;
    setTimeout(function () {
      that.a = true;
    }, 2000);
  },
  watch: {
    search(val) {
      if (val) {
        this.$axios
          .post("http://localhost:3000/api/autosearch", {
            query: val,
          })
          .then((response) => {
            this.entries = response.data;
          });
      }
    },
  },
};
</script>