import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
    token = `bearer ${newToken}`
    config = {
        headers: { Authorization: token },
    }
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    return axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = (blog) => {
    const request = axios.post(`${baseUrl}/${blog.id}/comments`, blog)
    return request.then(response => response.data)
}

export default { getAll, create, update, setToken, deleteBlog, addComment }