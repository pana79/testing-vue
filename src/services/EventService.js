import axios from "axios"
import NProgress from "nprogress"

const apiClient = axios.create({            //A single axios instance for our entire app
    baseURL: 'http://localhost:3000',       //base url for all calls to use
    withCredentials:false,
    headers: {                              //for authentication and configuration
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})
apiClient.interceptors.request.use(config => {
    NProgress.start()
    return config
})
apiClient.interceptors.response.use(response => {
    NProgress.done()
    return response
})
export default {
    getEvents(perPage, page) {
        return apiClient.get('/events?_limit=' + perPage + "&_page=" + page)
    },
    getEvent(id) {
        return apiClient.get('/events/' + id)
    },
    postEvent(event) {
        return apiClient.post('/events', event)
    }
}