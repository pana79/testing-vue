import Vue from "vue";
import Vuex from "vuex";
import * as User from "@/store/modules/User.js"
import * as event from "@/store/modules/event.js"
import * as notification from "@/store/modules/notification.js"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    event,
    notification
  },
  state: {
    categories: [
                  'sustainability',
                  'nature', 
                  'animal welfare',
                  'housing',
                  'education',
                  'food',
                  'community'
                ],
  } 
});
