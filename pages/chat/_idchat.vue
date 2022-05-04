<template>
  <v-app>
    <div :class="[$style.fixed]">
      <div style="height: 36px; background-color: #60c0ff"></div>
      <div :class="[$style.top]">
        <img
          loading="lazy"
          src="~/assets/banner/banner2.jpg"
          :class="[$style.imgshop]"
        />
        <div>htfdfhg</div>
        <div style="height: 15px"></div>
      </div>
    </div>
    <div style="height: 150px"></div>
    <div :class="[$style.chat]" v-for="data in datachat" :key="data.datachat">
      <div :class="[$style.chattrai]" v-if="data.trangthai == 1">
        <div :class="[$style.chattieude]">Shop</div>
        <div :class="[$style.chatnoidung]">
          {{ data.text }}
        </div>
      </div>

      <div :class="[$style.chatphai]" v-if="data.trangthai == 0">
        <div :class="[$style.chattieudephai]">Bạn</div>
        <div :class="[$style.chatnoidungphai]">
          {{ data.text }}
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
    <div :class="[$style.inputchat]" v-show="hienchat">
      <div :class="[$style.xoachat]">Cuộc trò chuyện sẽ xóa sau 24 giờ</div>
      <div :class="[$style.chatnd]">
        <input
          type="text"
          :class="[$style.input]"
          placeholder="Nhập vào đây và nhấn enter .."
          @keyup.enter="chat()"
          v-model="noidungchat"
        />
        <v-icon color="blue" @click="chat()">mdi-send</v-icon>
      </div>
    </div>
  </v-app>
</template>

<style module>
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}
.top {
  background-color: #60c0ff;
  color: #fff;
  text-align: center;
  padding-top: 10px;
}
.imgshop {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 3px solid #fff;
}
.chat {
  padding: 16px;
}
.chattrai {
  width: 85%;
}
.chattieude,
.chattieudephai {
  word-break: break-all;
  font-size: 12px;
  color: grey;
  margin-top: 20px;
}
.chatnoidung,
.chatnoidungphai {
  background-color: #60c0ff;
  color: #fff;
  margin-top: 12px;
  border-radius: 6px;
  padding: 8px;
  font-size: 16px;
  word-break: break-all;
}
.chatphai {
  width: 85%;
  float: right;
}
.chattieudephai {
  display: flex;
  justify-content: right;
}
.chatnoidungphai {
  background-color: #e5e5e5;
  color: #333333;
}
.inputchat {
  background-color: #fff;
  border-top: 1px solid rgb(190, 189, 189);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.xoachat {
  font-size: 12px;
  color: grey;
  text-align: center;
  padding: 9px;
}
.chatnd {
  display: flex;
  justify-content: space-between;
  padding: 13px 18px;
  padding-top: 8px;
}
.input {
  outline: none;
  width: 80%;
}
</style>
<script>
export default {
  middleware: ["auth"],
  layout: "Mapshop",
  head() {
    return {
      title: "Nhắn tin | vivishop",
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.3.2/peerjs.min.js",
          type: "text/javascript",
          integrity:
            "sha512-4wTQ8feow93K3qVGVXUGLULDB9eAULiG+xdbaQH8tYZlXxYv9ij+evblXD0EOqmGWT8NBTd1vQGsURvrQzmKeg==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    };
  },
  data() {
    return {
      peer: null,
      id: null,
      conn: null,
      ketnoi: 0,
      noidungchat: "",
      datachat: [],
      hienchat: false,
      idchat: null,
    };
  },
  methods: {
    chat() {
      var conn = this.conn;
      this.datachat;
      conn.send([{ idketnoi: this.id, text: this.noidungchat, id: this.idchat }]);
      this.datachat.push({ trangthai: "0", text: this.noidungchat });

      console.log(this.datachat);
      this.$axios
        .post("http://localhost:3000/api/chat", {
          noidungchat: JSON.stringify(this.datachat),
          idshopchata: this.$route.query.idshop,
        })
        .then((response) => {
          if (response.data == 1) {
            window.scrollTo(
              0,
              document.body.scrollHeight ||
                document.documentElement.scrollHeight
            );
          }
        });
      this.noidungchat = "";
    },
  },
  mounted() {
    this.$axios.post("http://localhost:3000/api/chatnd").then((response) => {
      this.datachat = JSON.parse(response.data[0].noidungchat);
      this.idchat = response.data[0].idchat;
    });
    var peer = new Peer([new Date().getTime()]);
    this.peer = peer;
    var that = this;
    peer.on("open", function (id) {
      that.id = id;
    });
    setTimeout(function () {
      var that1 = that;
      var conn = peer.connect(that.$route.query.idroom);
      that.conn = conn;
      peer.on("error", function (err) {
        that1.ketnoi = 1;
      });
      that1.hienchat = true;
    }, 1000);
    peer.on("connection", function (conn) {
      conn.on("data", function (data) {
        console.log(data);
      });
    });
  },
};
</script>