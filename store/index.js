export const state = () => ({
    login : 0,
    idkh: null,
    imgdaidien: null,
    khachhangten: null,
    phone: null,
    idfirebase: null,
    trangthaikh: null,    
    token: null,
})

export const mutations = {
    login(state, login){
        state.login = login
    },
    idkh(state, idkh){
        state.idkh = idkh
    },
    imgdaidien(state, imgdaidien){
        state.imgdaidien = imgdaidien
    },
    khachhangten(state, khachhangten){
        state.khachhangten = khachhangten
    },
    phone(state, phone){
        state.phone = phone
    },
    idfirebase(state, idfirebase){
        state.idfirebase = idfirebase
    },
    trangthaikh(state, trangthaikh){
        state.trangthaikh = trangthaikh
    },
    token(state, token){
        state.token = token
    },
}

export const actions = {
    nuxtServerInit({ commit}) {
        return this.$axios
            .post('http://localhost:3000/api/authlogin')
            .then((response) => {
                if (response.data[1] == 2) {
                    commit('idkh', response.data[0][0].idkh)
                    commit('imgdaidien', response.data[0][0].imgdaidien)
                    commit('khachhangten', response.data[0][0].khachhangten)
                    commit('phone', response.data[0][0].phone)
                    commit('trangthaikh', response.data[0][0].trangthaikh)
                    commit('token', response.data[2])
                }
                if (response.data[1] == 1) {
                    commit('idfirebase', response.data[0])
                }
                commit('login', response.data[1])
            })
    },

}

export const getters = {}
