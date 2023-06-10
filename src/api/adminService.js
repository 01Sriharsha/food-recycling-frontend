import axios from "axios";

export const BASE_URL = "http://localhost:9191/api/v1"

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const adminLogin = (adminData) => apiClient.post(`/admin/login`, adminData)

export const userLogin = (userData) => apiClient.post(`/user/login`, userData)

export const forgotPassword = (passwordData) => apiClient.post(`/user/forgot-password`, passwordData)


//City API's
export const getAllCities = () => apiClient.get(`/cities`)

export const getSingleCity = (cityId) => apiClient.get(`/cities/${cityId}`)

export const createCity = (cityData) => apiClient.post(`/cities`, cityData)

export const deleteCity = (cityId) => apiClient.delete(`/cities/${cityId}`)

//Area API's
export const getAllArea = () => apiClient.get(`/areas`)

export const getAllAreasByCity = (cityId) => apiClient.get(`/cities/${cityId}/areas`)

export const createArea = (cityId, areaData) => apiClient.post(`/cities/${cityId}/areas`, areaData)

export const deleteArea = (areaId) => apiClient.delete(`/areas/${areaId}`)


//Area API's
export const getAllFoodType = () => apiClient.get(`/food-types`)

export const createfoodType = (foodTypeData) => apiClient.post(`/food-types`, foodTypeData)

export const deletefoodType = (foodTypeId) => apiClient.delete(`/food-types/${foodTypeId}`)

//Shout Out Api's
export const createShoutOut = (shoutOutData) => apiClient.post(`/shoutouts`, shoutOutData);

export const getAllShoutOutsByDonor = (donorId) => apiClient.get(`/donors/${donorId}/shoutouts`);

export const getAllShoutOuts = () => apiClient.get(`/shoutouts`);

export const getSingleShoutOut = (shoutOutId) => apiClient.get(`/shoutouts/${shoutOutId}`)

export const updateShoutOut = (donorId, shoutOutId, shoutOutData) =>
    apiClient.put(`/donors/${donorId}/shoutouts/${shoutOutId}`, shoutOutData);

export const deleteShoutOut = (shoutOutId) => apiClient.delete(`/shoutouts/${shoutOutId}`)