import Vue from "vue";
import Vuex from "vuex";

import company from "./modules/company"
import department from "./modules/department"
import employee from "./modules/employee"
import sendSms from "./modules/send-sms"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notification: [],
      },
      getters: {
        getNotification(state){
          return state.notification
        }
      },
      mutations: {
        setNotification(state,{ append = false, ...payload}){
          if(append){
            state.notification.push(payload)
          }else{
            state.notification = []
            state.notification.push(payload)
          }
        
        }
      },
    modules: {
        company,
        department,
        employee,
        sendSms
    }
})
