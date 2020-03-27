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
                  'community'
                ],
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
    },
    SET_EVENTS(state, events) {
      state.events=events
      console.log('***SET_EVENT****')
      console.log(state.events)
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then (() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }) {
      EventService.getEvents()
        .then(response => {
          console.log(response.data)
          commit('SET_EVENTS', response.data)
        
        })
        .catch(error => {
          console.log('There was an error:', error.response)
        })
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
