import {Response, User, GetFileParams, DownloadParams} from "@/types";
import {http} from "@/plugins";

export * from "./api";

export const instance = (data: Response) => {
    return new Promise<any>(resolve => {
        http({
            url: data.url,
            method: data.method,
            data: data.data,
            params: data.params,
            headers: data.headers,
        }).then(res => resolve(res));
    });
}

export const login = (data: User) => {
    return instance({
        url: "/login",
        method: "POST",
        data: data
    })
}

export const auth = () => {
    return instance({
        url: "/auth",
        method: "POST",
        data: {
            "app_key":"wy",
            "app_secret":"f_s"
        }
    })
}

export const getFiles = (data: GetFileParams) => {
    return instance({
        url: "/api/v1/getFile",
        method: "POST",
        data: {
            file_type: data.type === "0" ? undefined : data.type,
            user_id: data.user_id,
            file_name: data.file_name,
        }
    });
}

export const uploadFile = (name: string, file: DownloadParams) => {
    fetch('http://120.55.102.250:8000/api/v1/download', {
        method: 'POST',
        mode: 'cors',
        headers: {
            "token": window.sessionStorage.getItem("token")!,
        },
        body: JSON.stringify({
            file_sha1: file.file_sha1,
            file_id: String(file.id)
        })
    }).then(res => res.blob().then(blob => {
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blob);
        let filename = name;
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }))
}