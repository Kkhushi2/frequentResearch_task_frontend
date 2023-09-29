import axios from 'axios';
export const ServerURL = 'http://localhost:5000'

export const postData = async (url, data) => {
    try {
        const response = await axios.post(`${ServerURL}/${url}`, data)
        return response.data
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { status: false }
        }
    }
}

export const getData = async (url) => {
    try {
        const response = await axios.get(`${ServerURL}/${url}`)
        return response.data
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { status: false }
        }
    }
}


export const putData = async (url, data) => {
    try {
        const response = await axios.put(`${ServerURL}/${url}`, data)
        return response.data
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { status: false }
        }
    }
}


export const deleteData = async (url) => {
    try {
        const response = await axios.delete(`${ServerURL}/${url}`)
        return response.data
    } catch (error) {
        if (error.response.data) {
            return error.response.data;
        } else {
            return { status: false }
        }
    }
}