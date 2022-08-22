import axios from "axios"
import { getField, updateField } from 'vuex-map-fields';

export default {
    namespaced: true,
    state: () => ({
        employee: {
            name: "",
            description: "",
        },
        employees: [],
        form: {
            department_id: '',
            first_name: '',
            last_name: '',
            email: '',
            mobile: '',
            position: ''
        },
    }),
    getters: {
        getField,
        getEmployees (state) {
            return state.employees
        }
    },
    mutations: {
        updateField,
        setCompany (state, payload) {
            state.company = payload
        },
        setEmployees(state, payload) {
            state.employees =payload
        }
    },
    actions: {
        async fetchAll ({commit}) {

            await axios.get('/employee')
                .then((res) => {
                    commit("setEmployees", res.data)
                }).catch((err) =>{
                    console.log(err)
                })
        },
        async store({commit, state}){
            await axios.post('/employee', state.form)
                .then((res) => {
                    commit("setEmployee", res.data)
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

            await axios.put(`/employee/${id}`, state.form)
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
            await axios.delete(`/employee/${id}`)
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