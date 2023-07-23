const APP_CONSTANTS = {
    APP_NAME: 'RV Project Manager',
    APP_SHORTNAME: 'RVPM',
    APP_DESCRIPTION: 'Simple Kanban CRUD Project Manager'
}

export const { APP_NAME, APP_SHORTNAME, APP_DESCRIPTION } = APP_CONSTANTS;

export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    WARN: 'warn',
    ERROR: 'error',
}

export const REQUEST_HEADERS = {
    CONTENT_TYPE: {
        "Content-Type": 'application/json'
    },
}

export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    OPTIONS = 'OPTIONS',
    DELETE = 'DELETE'
}