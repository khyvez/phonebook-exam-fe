import axios from "axios"

export default {
    namespaced: true,
    state: () => ({
        errors: {}
    }),
    getters: {

    },
    mutations: {
        setErrors(state, payload){
            state.errors = payload
        }
    },
    actions: {
        async sendSms ({commit}, payload = []) {

            await axios.post('/send-sms', payload )
                .then((res) => {
                    console.log(res.data)
                    const notif = {
                        text: 'Sending and added to queue!',
                        type: 'Success'
                    }
                    commit("setNotification", notif, {root: true})
                }).catch((err) =>{
                    commit('setErrors', err)
                    console.log(err)
                })
        },
    }
}