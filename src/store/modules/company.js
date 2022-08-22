import axios from "axios"
import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state: () => ({
        company: {
            name: "",
            departments: [],
        },
        companies: [],
        form: {
            name: ''
        },
       
    }),
    getters: {
        getField,
        getCompany (state) {
            return state.company
        },
        getCompanies (state) {
            return state.companies
        }
    },
    mutations: {
        updateField,
        setCompany (state, payload) {
            state.company = payload
        },
        setCompanies(state, payload) {
            state.companies =payload
        }
    },
    actions: {
        async fetchAll ({commit}) {

            await axios.get('/company')
                .then((res) => {
                    commit("setCompanies", res.data)
                }).catch((err) =>{
                    console.log(err)
                })
        },
        async store({commit, state}){

            await axios.post('/company', state.form)
                .then((res) => {
                    commit("setCompany", res.data)
                    const notif = {
                        text: 'Succesfully saved!',
                        type: 'Success'
                    }
                    commit("setNotification", notif, {root: true})
                }).catch((err) =>{
                    console.log(err)
                    const notif = {
                        text: 'Something went wrong!',
                        type: 'Error'
                    }
                    commit("setNotification", notif, {root: true})
                })
        }
    }
}