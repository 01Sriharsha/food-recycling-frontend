import axios from "axios";
import { BASE_URL } from "./adminService";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const createNgo = (NgoData) => apiClient.post(`/ngos`, NgoData);

export const getAllNgos = () => apiClient.get(`/ngos`);

export const getSingleNgo = (NgoId) => apiClient.get(`/ngos/${NgoId}`);

export const updateNgo = (NgoData, NgoId) =>
  apiClient.put(`/ngos/${NgoId}`, NgoData);

export const deleteNgo = (NgoId) => apiClient.delete(`/ngos/${NgoId}`);

export const verifyNgo = (NgoId) => apiClient.put(`/ngos/${NgoId}/verify`);

//Assignment Api's
export const createAssignment = (assignmentData, NgoId, requestId, donorId) =>
  apiClient.post(
    `/request/${requestId}/ngos/${NgoId}/donor/${donorId}/assignments`,
    assignmentData
  );

export const getAllAssignments = () => apiClient.get(`/assignments`);

export const getAllAssignmentsByNgo = (NgoId) =>
  apiClient.get(`/ngo/${NgoId}/assignments`);

export const updateAcceptanceStatus = (assignmentData, assignmentId) =>
  apiClient.put(
    `/assignments/${assignmentId}/update/acceptance`,
    assignmentData
  );

export const updateDeliveryStatus = (assignmentId) =>
  apiClient.put(`/assignments/${assignmentId}/update/delivery`);

export const deleteAssignment = (assignmentId) =>
  apiClient.delete(`/assignments/${assignmentId}`);
