import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
import applicant from "./modules/applicant"
import home from "./modules/home"
import admin from "./modules/admin"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    applicant,
    home,
    admin
  },
});
