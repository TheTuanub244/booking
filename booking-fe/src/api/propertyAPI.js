import axios from "axios"

export const getAllProperty = async () => {
    const respone = await axios.get("http://localhost:8000/property/getAllProperty")
    return respone.data
}
export const getPropertyById = async (id) => {
    const respone = await axios.post(`http://localhost:8000/property/${id}`)
    console.log(respone);
    
    
}
export const getLastProperty = async (id) => {
    const respone = await axios.get()
}
export const createProperty = async () => {

}