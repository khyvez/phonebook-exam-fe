import axios from "axios"
import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state: () => ({
        department: {
            name: "",
            description: "",
        },
        departments: [],
        form: {
            name: ''
        },
    }),
    getters: {
        getField,
        getDepartments (state) {
            return state.departments
        }
    },
    mutations: {
        updateField,
        setCompany (state, payload) {
            state.company = payload
        },
        setDepartments(state, payload) {
            state.departments =payload
        }
    },
    actions: {
        async fetchAll ({commit}) {

            await axios.get('/department')
                .then((res) => {
                    commit("setDepartments", res.data)
                }).catch((err) =>{
                    console.log(err)
                })
        },
        async store({commit, state}){
            let payload = state.form
            payload.company_id = 1
            await axios.post('/department', payload)
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
        },
        async update({commit, state}, id){

            await axios.put(`/department/${id}`, state.form)
                .then((res) => {
                    commit("setCompany", res.data)
                    const notif = {
                        text: 'Succesfully updated!',
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
        },
        async delete({commit}, id){
            await axios.delete(`/department/${id}`)
                .then((res) => {
                    console.log(res) 
                    const notif = {
                        text: 'Succesfully deleted!',
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