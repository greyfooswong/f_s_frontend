export type Files = {
    created_by: string;
    created_on: number;
    file_addr: string;
    file_name: string;
    file_sha1: string;
    file_size: number;
    file_type: number;
    id: number;
    is_del: number;
    modified_by: string;
    modified_on: number;
    user_file_id: number;
}

export type Permission = {
    created_by: string;
    created_on: number;
    id: number;
    is_del: number;
    modified_by: string;
    modified_on: number;
    permission_name: string;
}

export type Routing = {
    api_path: string;
    created_by: string;
    created_on: number;
    id: number;
    is_del: number;
    modified_by: string;
    modified_on: number;
    parent_api_id: number;
}

export type User = {
    created_by: string;
    created_on: number;
    email: string;
    email_validated: number;
    id: number;
    is_del: number;
    modified_by: string;
    modified_on: number;
    phone: string;
    phone_validated: number;
    user_name: string;
    user_password: string;
}

export type Log = {
    created_by: string;
    created_on: number;
    id: number;
    is_del: number;
    log_from: string;
    log_level: number;
    log_message: string;
    modified_by: string;
    modified_on: number;
}

export type Link = {
    created_by: string;
    created_on: number;
    id: number;
    is_del: number;
    modified_by: string;
    modified_on: number;
    parent_id: number;
    span_id: number;
    time_consuming: number;
    track_request: string;
    track_response: string;
    trasaction_id: number;
}

export type AlertRule = {
    alarm_level: number;
    alarm_per_min_times: number;
    alarm_template_id: number;
    created_by: string;
    created_on: number;
    id: number;
    is_del: number;
    modified_by: string;
    modified_on: number;
}

export type AlertTemplate = {
    alarm_level: number;
    created_by: string;
    created_on: number;
    id: number;
    is_del: number;
    message: string;
    modified_by: string;
    modified_on: number;
    post_url: string;
}