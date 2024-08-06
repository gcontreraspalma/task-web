import axios from 'axios'

export const createCategory = async (category) =>{
    const {data, status} = await axios.post('http://localhost:3000/api/categories', category)
    console.log(data)
}

export const getCategories = async () =>{
    const {data: categories, status} = await axios.get('http://localhost:3000/api/categories')
    return categories
}

export const deleteCategory = async (id) =>{
    const {data, status} = await axios.delete(`http://localhost:3000/api/categories/${id}`)
}