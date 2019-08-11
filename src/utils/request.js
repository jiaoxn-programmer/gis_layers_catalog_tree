/**
 * @file 封装axios的http请求方法
 * @author JiaoXiangNing(2438822080@qq.com)
 */

import axios from 'axios'

const http = axios.create()

http.defaults.timeout = 3000

// 请求拦截器设置
http.interceptors.request.use(config => {
    return config
}, error => {
    console.log(error)

    return Promise.reject(error)
})

// 相应拦截器设置
http.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error)

    return Promise.reject(error)
})

// 封装post请求
export function fetchPost (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response)
        }, error => {
            reject(error)
        })
    })
}

// 封装get请求
export function fetchGet (url) {
    return new Promise((resolve, reject) => {
        axios.get(url).then(response => {
            resolve(response)
        }, error => {
            reject(error)
        })
    })
}

export default {
    http_post (url, params) {
        return fetchPost(url, params)
    },
    http_get (url) {
        return fetchGet(url)
    }
}
