import EventService from "@/services/EventService.js"

export const namespaced = true  //all mutations, actions and getters will be namespced under event to evojed name collisions regarding they are global..

export const state = {
    eventsTotal: 0,
    events: [],
    event:{}
  }

export const mutations = {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
      //console.log('***SET_EVENT****')
      //console.log(state.events)
    },
    SET_EVENTS_TOTAL(state, eventsTotal){
      state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event){
      state.event = event
    }
      
  }
 export const actions= {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event).then (() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: "Your event has been created!"
        }
        dispatch('notification/add', notification, {root:true})
      }).catch(error => {
        const notification = {
          type: 'error',
          message: 'there was a problem creating your event:' + error.message
        }
        dispatch('notification/add', notification, {root: true})
        throw error
      })
    },
    fetchEvents({ commit, dispatch}, {perPage,page}) {
      EventService.getEvents(perPage, page)
        .then(response => {
         // console.log(response.data)
         //console.log('Total events are ' + response.headers['x-total-count'])
          commit('SET_EVENTS', response.data)
          commit('SET_EVENTS_TOTAL',response.headers['x-total-count'])
        
        })
        .catch(error => {
          // console.log('There was an error:', error.response)
          const notification= {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, {root: true})
        })
      },
    fetchEvent({ commit, getters, dispatch }, id) {
      var event = getters.getEventById(id)

      if(event) {
        commit('SET_EVENT', event)
      }
      else {
        EventService.getEvent(id)
        .then(response => {
            commit('SET_EVENT', response.data)
        })
        .catch(error => {
            // console.log('There was an error:', error.response)
            const notification= {
              type: 'error',
              message: 'There was a problem fetching event: ' + error.message
            }
            dispatch('notification/add', notification, {root: true})
          })
        }}

    } 
  export const getters= {
    getEventById: state => id => {
      return state.events.find(event => event.id===id)

    }
  }
