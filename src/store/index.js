import Vue from "vue";
import Vuex from "vuex";
import EventService from '@/services/EventService.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Patrik Näsström'},
    categories: [
      'sustainability',
     'nature', 
     'animal welfare',
     'housing',
     'education',
     'food',
     'community'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
      commit('ADD_EVENT', event)
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id===id)

    }


    /*
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
     return state.todos.filter(todo => !todo.done).lenght
    }
    you can even pass in a getter  to a getter like this
    activeTodosCount: (state, getters) => {
     return state.todos.lenght - getters.doneTodos.length
     }*/
  },
  modules: {}
});
