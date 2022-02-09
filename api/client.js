const axios = require('axios')
const qs = require('qs')

const apiClient = axios.create({
    baseURL: process.env.LAMBDA_API
})

apiClient.defaults.paramsSerializer = params => {
    return qs.stringify(params, {arrayFormat: 'comma'})
}

module.exports = apiClient
