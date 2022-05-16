import type { DownloadParams, RegisterUser, CreateFileParams, CreateUserFile } from "@/types";
import { instance } from "./index";

export const register = (data: RegisterUser) => {
    return instance({
        url: "/register",
        method: "POST",
        data: {
            ...data,
            email_validated: 1,
            phone_validated: 1,
        }
    })
}

export const upload = (file: any) => {
    return instance({
        url: "/api/v1/upload",
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: {
            file
        }
    })
}

export const createFile = (data: CreateFileParams) => {
    return instance({
        url: "/api/v1/createFile",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const createUserFile = (data: CreateUserFile) => {
    console.log(data);
    return instance({
        url: "/api/v1/createUserFile",
        method: "POST",
        data: {
            ...data
        }
    });
}

export const download = (data: DownloadParams) => {
    return instance({
        url: "/api/v1/download",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const deleteFile = (id: string) => {
    return instance({
        url: "/api/v1/deleteUserFile",
        method: "POST",
        data: {
            id
        }
    })
}
