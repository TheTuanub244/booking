import axios from "axios"

export const getAllProperty = async () => {
    const respone = await axios.get("http://localhost:8000/property/getAllProperty")
    return respone.data
}
export const getPropertyById = async (id) => {
    const respone = await axios.post(`http://localhost:8000/property/${id}`)
    return respone.data    
    
}
export const getPropertyTypesByPlace = async (place) => {
    const respone = await axios.post('http://localhost:8000/property/getPropertyTypesByPlace', {place})
    
    return respone.data
}
export const getPropertyByTypeAndPlace = async (place, type) => {
    const respone = await axios.post('http://localhost:8000/property/getPropertyByTypeAndPlace', {place, type})
    
    return respone.data
}
export const getPropertyByRates = async () => {
    try{       
        const respone = await axios.get("http://localhost:8000/property/getPropertiesSortedByRate")
        return respone.data
    } catch(error){
        const respone = error.response.data.message 
        
        return respone
        
    }
}
export const getAllTypeOfProperties = async () => {
    const response = await axios.get("http://localhost:8000/property/getAllTypeOfProperties")
    return response.data
}
