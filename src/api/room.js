import axiosClient from "./axiosClient";

const END_POINT = {
    TOTOS: "ConversationAccount",
}

export const getTodosAPI = (id) => {
    return axiosClient.get(`${END_POINT.TOTOS}/${id}`);
}

export const delTodosAPI = (id) => {
    return axiosClient.delete(`${END_POINT.TOTOS}/${id}`);
}

export const addTodosAPI = (todos) => {
    return axiosClient.post(`${END_POINT.TOTOS}`, todos);
}

export const editTodosAPI = (todos) => {
    return axiosClient.put(`${END_POINT.TOTOS}`, todos);
}