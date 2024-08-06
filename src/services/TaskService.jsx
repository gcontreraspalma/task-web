import axios from 'axios'


const baseUrl = 'http://localhost:3000/api/tasks'

export const createTask = async (task) =>{
    console.log(JSON.stringify(task))
    const { data, status} = await axios.post(baseUrl, task)
    console.log(data, status)
    return data
}

export const getTasks = async () => {
    const {data: tasks, status} = await axios.get(baseUrl)
    return tasks
}

export const getTask = async (id) => {
    const { data: task, status} = await axios.get(`${baseUrl}/${id}`)
    return task
}
export const deleteTask = async (id) =>{
    const {data, status } = await axios.delete(`${baseUrl}/${id}`)
    return data
}

export const updateStatusTask = async (id, statusTask) =>{
    const {data, status } = await axios.put(`${baseUrl}/${id}`, { status: statusTask})
    console.log("updateStatusTask", data, status)
    return data
}