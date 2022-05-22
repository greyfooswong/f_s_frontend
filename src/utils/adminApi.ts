import { instance } from "./index";

export const getUserFile = (data: { page: string, page_size: string, id?: string, file_name?: string, file_type?: string }) => {
    return instance({
        url: "/api/v1/getFile",
        method: "POST",
        data: {
            ...data,
        }
    })
}

export const getPermissionList = (data: { page: string, page_size: string, id?: string }) => {
    return instance({
        url: "/api/v1/getPermission",
        method: "POST",
        data: {
            ...data,
        }
    })
}

export const updatePermission = (data: {id: string, permission_name: string}) => {
    return instance({
        url: "/api/v1/updatePermission",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const deletePermission = (id: string) => {
    return instance({
        url: "/api/v1/deletePermission",
        method: "POST",
        data: {
            id
        }
    })
}

export const getRoute = (data: { page: string, page_size: string, parent_api_id?: string, id?: string }) => {
    return instance({
        url: "/api/v1/getApi",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const deleteRoute = (id: string) => {
    return instance({
        url: "/api/v1/deleteApi",
        method: "POST",
        data: {
            id
        }
    })
}

export const getUsers = (data: { page: string, page_size: string, id?: string }) => {
    return instance({
        url: "/api/v1/getUser",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const deleteUser = (id: string) => {
    return instance({
        url: "/api/v1/deleteUser",
        method: "POST",
        data: {
            id
        }
    })
}

export const updateUser = (data: { id: string, user_name: string, user_password: string, email: string, phone: string }) => {
    return instance({
        url: "/api/v1/updateUser",
        method: "POST",
        data: {
            ...data,
            email_validated: "1",
            phone_validated: "1",
        }
    })
}

export const getLogs = (data: { page: string, page_size: string, log_level?: string, id?: string }) => {
    return instance({
        url: "/api/v1/getLog",
        method: "POST",
        data: {
            ...data,
        }
    })
}

export const getTrack = (data: { page: string, page_size: string, span_id?: string, parent_id?: string, id?: string }) => {
    return instance({
        url: "/api/v1/getTrack",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const getAlertRules = (data: { page: string, page_size: string, alarm_level?: string, id?: string }) => {
    return instance({
        url: "/api/v1/getAlarm",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const updateAlertRules = (data: {id: string, alarm_level: string}) => {
    return instance({
        url: "/api/v1/updateAlarm",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const deleteAlertRules = (id: string) => {
    return instance({
        url: "/api/v1/deleteAlarm",
        method: "POST",
        data: {
            id
        }
    })
}

export const getAlertTemplate = (data: { page: string, page_size: string, alarm_level?: string, id?: string }) => {
    return instance({
        url: "/api/v1/getAlarmTemplate",
        method: "POST",
        data: {
            ...data
        }
    })
}

export const deleteAlertTemplate = (id: string) => {
    return instance({
        url: "/api/v1/deleteAlarmTemplate",
        method: "POST",
        data: {
            id
        }
    })
}

export const updateAlertTemplate = (data: {id: string, alarm_level: string, message: string,}) => {
    return instance({
        url: "/api/v1/updateAlarmTemplate",
        method: "POST",
        data: {
            ...data
        }
    })
}
