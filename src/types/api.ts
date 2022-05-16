import {AxiosRequestHeaders, Method} from "axios";

export interface Response {
    url: string;
    method: Method;
    data?: any;
    params?: any;
    headers?: AxiosRequestHeaders;
}

export type User = {
    username: string;
    password: string;
}

export type RegisterUser = {
    user_name: string;
    user_password: string;
    email: string;
    phone: string;
}

export type DownloadParams = {
    file_sha1?: string;
    id?: string;
}

export type CreateFileParams = {
    file_sha1: string;
    file_size: string;
    file_addr: string;
    file_type: string;
}

export type CreateUserFile = {
    user_id: string;
    pre_file_id: string;
    now_file_id: string;
    file_permission: string;
    file_name: string;
}

export type GetFileParams = {
    type?: string;
    user_id: string;
    file_name?: string;
}