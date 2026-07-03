import api from "./axios";

export const registerUser = (data) =>
    api.post("/auth/register", data);

export const loginUser = (formData) =>
    api.post("/auth/login", formData, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });


export const getCurrentUser = () =>
    api.get("/auth/me");