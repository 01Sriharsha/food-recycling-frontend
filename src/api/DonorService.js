import axios from "axios";
import { BASE_URL } from "./adminService";

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const createDonor = (donorData) => apiClient.post(`/donors`, donorData);

export const getAllDonors = () => apiClient.get(`/donors`);

export const getSingleDonor = (donorId) => apiClient.get(`/donors/${donorId}`);

export const updateDonor = (donorData, donorId) => apiClient.put(`/donors/${donorId}`, donorData)

export const deleteDonor = (donorId) => apiClient.delete(`/donors/${donorId}`)


//Donation Api's
export const addNewDonation = (donorId, donationData) =>
    apiClient.post(`/donors/${donorId}/donations`, donationData);

export const uploadFoodImage = (donationId , image) =>{
    const formData = new FormData();
    formData.append("image" , image)
    return apiClient.post(`/donations/${donationId}/upload/image` , formData , {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
}

export const getSingleDonation = (donationId) =>
    apiClient.get(`/donations/${donationId}`)

export const getAllDonations = () => apiClient.get("/donations")

export const getAllDonationsByDonor = (donorId) => apiClient.get(`/donors/${donorId}/donations`)

export const updateDonation = (donationData, donationId) =>
    apiClient.put(`/donations/${donationId}`, donationData)