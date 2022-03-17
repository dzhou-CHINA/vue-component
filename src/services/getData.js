/* eslint-disable no-unused-vars */
import URL from './url'
import request from './request'

const get = request.get
const post = request.post

let API = {
  submitForm: async (data) => {
    let result = await post(URL.submitForm, data)
    return result
  },

  queryFeedBacks: async (params) => {
    let result = await post(URL.queryFeedBacks, params)
    return result
  },

  replayFeedback: async (data) => {
    let result = await post(URL.replayFeedback, data)
    return result
  },

  sendEmail: async (data) => {
    let result = await post(URL.sendEmail, data)
    return result
  },

  signComputer: async (data) => {
    let result = await post('https://jinshuju.net/graphql/f/uEQB9T', JSON.stringify(data), {'Content-Type': 'application/json'})
    return result
  }
}

export default API
